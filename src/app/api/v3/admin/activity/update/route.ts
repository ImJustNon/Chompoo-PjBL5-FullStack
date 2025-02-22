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

    const reqBody = await req.json();
    const activity_id: string | null = reqBody.activity_id ?? null;
    const activity_name: string | null = reqBody.activity_name ?? null;
    const activity_description: string | null = reqBody.activity_description ?? null;
    const activity_department: {
        id: string;
        name: string
    } | null = reqBody.activity_department ?? null;
    const activity_date: string | null = reqBody.activity_date ?? null;
    const activity_type: {
        id: number;
        name: string
    } | null = reqBody.activity_type ?? null;
    const activity_role: {
        id: number;
        name: string
    } | null = reqBody.activity_role ?? null;


    if(!activity_id || !activity_name || !activity_description || !activity_department || !activity_date || !activity_type || !activity_role){
        return NextResponse.json({
            status: "FAIL",
            message: "Information Missing"
        }, {
            status: 400
        });
    }

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

        const updatedResult = await prisma.activities.update({
            where: {
                activity_id: activity_id
            },
            data: {
                activity_name: activity_name,
                activity_description: activity_description,
                activity_department_id: activity_department.id,
                activity_date: activity_date,
                activity_type_id: activity_type.id,
                activity_role_admin_id: activity_role.id
            }
        });
        if(!updatedResult){
            return NextResponse.json({
                status: "FAIL",
                message: "Activity not found"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            status: "OK",
            message: "Updated Data",
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