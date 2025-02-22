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
    const department_id: string | null = reqBody.department_id ?? null;
    const department_fullname_th: string | null = reqBody.department_fullname_th ?? null;
    const department_fullname_en: string | null = reqBody.department_fullname_en ?? null;
    const department_type: string | null = reqBody.department_type ?? null;



    if(!department_id || !department_fullname_th || !department_fullname_en || !department_type){
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

        await prisma.departments.create({
            data: {
                department_id: department_id,
                department_fullname_th: department_fullname_th,
                department_fullname_en: department_fullname_en,
                department_type: department_type
            },
        });
        
        return NextResponse.json({
            status: "OK",
            message: "Created Department Data",
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