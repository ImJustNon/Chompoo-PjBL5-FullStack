import { parseJWT } from "@/utils/parseJWT";
import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import qrcode from "qrcode";

const prisma: PrismaClient = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse| void> {
    const jwtToken: string = await getCookie('token', { cookies }) as string;
    const user_uuid: string = (await parseJWT<{uuid: string;}>(jwtToken)).uuid;

    const searchParams = req.nextUrl.searchParams;
    const activity_id: string | null = searchParams.get('activity_id');

    if(!activity_id){
        return NextResponse.json({
            status: "FAIL",
            message: "activity_id missing"
        }, {
            status: 400
        });
    }

    try {
        const findUser = await prisma.users.findUnique({
            include: {
                student: true
            },
            where: {
                user_uuid: user_uuid
            },
        });
        
        if(!findUser){
            return NextResponse.json({
                status: "FAIL",
                message: "Cannot find user"
            }, {
                status: 401
            });
        }

        const findQrCache = await prisma.qRCache.findUnique({
            where: {
                qrcache_student_id: findUser.student?.student_id,
                qrcache_activity_id: activity_id
            },
        });

        let qr_uuid: string = "";
        // found
        if(findQrCache){
            qr_uuid = findQrCache.qrcache_uuid;
        }
        // not found
        else {
            const createQrCache = await prisma.qRCache.create({
                data: {
                    qrcache_activity_id: activity_id,
                    qrcache_student_id: findUser.user_id
                },
                select: {
                    qrcache_uuid: true
                }
            });

            
            qr_uuid = createQrCache.qrcache_uuid;
        }

        const QRBase64: string = await qrcode.toDataURL(qr_uuid);
        return NextResponse.json({
            status: "OK",
            message: "Created qr code and stored caches",
            data: {
                qr: QRBase64
            }
        }, {
            status: 200
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