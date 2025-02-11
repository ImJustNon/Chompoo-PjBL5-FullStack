import { parseJWT } from "@/utils/parseJWT";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
    const jwtToken: string = await getCookie('token', { cookies }) as string;
    const user_uuid: string = (await parseJWT<{uuid: string;}>(jwtToken)).uuid;

    const reqBody = await req.json();
    const user_id: string | null = reqBody.user_id ?? null;
    const user_prefix_id: number | null = reqBody.user_prefix_id ?? null;
    const user_firstname: string | null = reqBody.user_firstname ?? null;
    const user_lastname: string | null = reqBody.user_lastname ?? null;
    const user_email: string | null = reqBody.user_email ?? null;
    const user_phonenumber: string | null = reqBody.user_phonenumber ?? null;
    const user_password: string | null = reqBody.user_password ?? null;
    const admin_department_id: string | null = reqBody.admin_department_id ?? null;

    if(!user_id || !user_prefix_id || !user_firstname || !user_lastname || !user_email || !user_phonenumber || !user_password || !admin_department_id){
        return NextResponse.json({
            status: "FAIL",
            message: "Information missing"
        }, {
            status: 400
        });
    }

    try {

        // find user
        const findUser = await prisma.users.findUnique({
            where: {
                user_uuid: user_uuid,
            },
            select: {
                user_id: true,
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
                message: "Admin not found"
            }, {
                status: 404
            });
        }
        
        const createUser = await prisma.users.create({
            data: {
                user_id: user_id,
                user_prefix_id: user_prefix_id,
                user_firstname: user_firstname,
                user_lastname: user_lastname,
                user_email: user_email,
                user_phonenumber: user_phonenumber,
                user_password: user_password,
                is_admin: true,
                is_student: false
            }
        });
        const createAdmin = await prisma.admins.create({
            data: {
                admin_id: createUser.user_id,
                admin_department_id: admin_department_id,
            },
        }); 

        return NextResponse.json({
            status: "OK",
            message: "Created Success",
            data: {
                user_uuid: createUser.user_uuid,
                created_at: createUser.created_at
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