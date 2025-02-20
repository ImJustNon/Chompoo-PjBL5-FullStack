import { parseJWT } from "@/utils/parseJWT";
import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma: PrismaClient = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
    const jwtToken: string = await getCookie('token', { cookies }) as string;
    const user_uuid: string = (await parseJWT<{uuid: string;}>(jwtToken)).uuid;

    try {
        // check user
        const findUser = await prisma.users.findUnique({
            where: {
                user_uuid: user_uuid
            },
            select: {
                user_id: true
            }
        });
        if(!findUser){
            return NextResponse.json({
                status: "FAIL",
                message: "User not found"
            }, {
                status: 404
            });
        }

        // check admin
        const findAdmin = await prisma.admins.findUnique({
            where: {
                admin_id: findUser.user_id
            }
        });
        if(!findAdmin){
            return NextResponse.json({
                status: "FAIL",
                message: "U R Not Admin"
            }, {
                status: 403
            });
        }

        // search activity
        const findActivity = await prisma.activities.findMany({
            include: {
                activity_department: true,
                activity_type: true,
                activity_role: true,
                activity_participated: true,
            },
            where: {
                activity_type_id: 1
            }
        });
        if(!findActivity){
            return NextResponse.json({
                status: "FAIL",
                message: "Activity Not found"
            }, {    
                status: 404
            });
        }

        const activtiesSortByDate = findActivity.sort((act_a, act_b) => (dayjs(act_b.created_at).toDate().getTime()) - (dayjs(act_a.created_at).toDate().getTime()));
        return NextResponse.json({
            status: "OK",
            message: "Activities Data",
            data: activtiesSortByDate
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