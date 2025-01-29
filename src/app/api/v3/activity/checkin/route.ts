import { deleteCookie, getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseJWT } from "@/utils/parseJWT";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma: PrismaClient = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
    const jwtToken: string = await getCookie('token', { cookies }) as string;
    const user_uuid: string = (await parseJWT<{uuid: string;}>(jwtToken)).uuid;

    const reqBody = await req.json();
    const qr_uuid: string | null = reqBody.qr_uuid ?? null;

    if(!qr_uuid){
        return NextResponse.json({
            status: "FAIL",
            message: "qr_uuid is missing",
        }, {
            status: 400
        });
    }

    try {
        // find infomation
        const findQrCache = await prisma.qRCache.findUnique({
            where: {
                qrcache_uuid: qr_uuid
            },
            select: {
                qrcache_student_id: true,
                qrcache_activity_id: true,
                expired_at: true,
            }
        });
        if(!findQrCache){
            return NextResponse.json({
                status: "FAIL",
                message: "QR Data Not Found"
            }, {
                status: 404
            });
        }
        // check qr life time
        if((dayjs(findQrCache.expired_at).toDate().getTime() - dayjs().toDate().getTime()) <= 0){
            return NextResponse.json({
                status: "FAIL",
                message: "Qr Lifetime was expired"
            }, {
                status: 410
            });
        }


        // check user permission
        // get activity user permission
        const findActivity = await prisma.activities.findUnique({
            where: {
                activity_id: findQrCache.qrcache_activity_id
            },
            select: {
                activity_role_admin_id: true,
            }
        });
        if(!findActivity){
            return NextResponse.json({
                status: "FAIL",
                message: "Activity Not Found"
            }, {
                status: 404
            });
        }
        // find admin user info
        const findUser = await prisma.users.findUnique({
            where: {
                user_uuid: user_uuid
            },
            select: {
                user_roles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        if(!findUser){
            return NextResponse.json({
                status: "FAIL",
                message: "Admin User Not Found"
            }, {
                status: 404
            });
        }

        // check permission
        if(!((findUser.user_roles.filter((d) => d.userrole_role_id === findActivity.activity_role_admin_id).length > 0 ? true : false) || (findUser.user_roles.filter((d) => d.role.role_name === "Administrator").length > 0 ? true : false))){
            return NextResponse.json({
                status: "FAIL",
                message: "Permission denined"
            }, {
                status: 403
            });
        }

        // if multiple create
        const findActivityParticipate = await prisma.activitiesParticipated.findFirst({
            where: {
                student_id: findQrCache.qrcache_student_id,
                activity_id: findQrCache.qrcache_activity_id
            }
        });
        if(findActivityParticipate){
            return NextResponse.json({
                status: "OK",
                message: "you are already registered"
            }, {
                status: 207
            });
        }

        // check in
        await prisma.activitiesParticipated.create({
            data: {
                student_id: findQrCache.qrcache_student_id,
                activity_id: findQrCache.qrcache_activity_id,
                activity_checked: true,
                activity_checked_late: false,
            }
        });
        return NextResponse.json({
            status: "OK",
            message: "Created Activity Participated"
        }, {
            status: 201
        });
        
    }
    catch(e){
        return NextResponse.json({
            status: "FAIL",
            message: "Internal Server Error : " + e
        }, {
            status: 500
        });
    }
}