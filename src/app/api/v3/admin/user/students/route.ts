import { parseJWT } from "@/utils/parseJWT";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
    const jwtToken: string = await getCookie('token', { cookies }) as string;
    const user_uuid: string = (await parseJWT<{uuid: string;}>(jwtToken)).uuid;

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

        const studentResults = await prisma.users.findMany({
            where: {
                NOT: {
                    student: null
                }
            },
            select: { 
                student: true,
                user_email: true,
                user_firstname: true,
                user_lastname: true,
                user_phonenumber: true,
                user_prefix: true,
                user_roles: true,
                user_id: true
            }
        });

        return NextResponse.json({
            status: "OK",
            message: "OK",
            data: studentResults
        }, {
            status: 200
        })
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