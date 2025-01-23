import { PrismaClient } from "@prisma/client";
import { CookieValueTypes, getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateJWTToken } from "@/utils/validateJWTToken";
import { JWTPayload, jwtVerify } from "jose";
import { parseJWT } from "@/utils/parseJWT";

const prisma: PrismaClient = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
    const jwtToken: string = await getCookie('token', { cookies }) as string;
    const user_uuid: string = (await parseJWT<{uuid: string;}>(jwtToken)).uuid;

    const userInfo = await prisma.users.findUnique({
        where: {
            user_uuid: user_uuid
        },
        include: {
            student: {
                include: {
                    activities_participated: {
                        include: {
                            activity: true
                        }
                    },
                    department: true,
                    qr: true
                }
            },
            user_prefix: true,
            user_roles: true,
            admin: {
                include: {
                    admin_department: true
                }
            }
        }
    });

    if(!userInfo){
        return NextResponse.json({
            status: "FAIL",
            message: "User not found",
        },{
            status: 404
        });
    }

    return NextResponse.json({
        status: "OK",
        message: "User Data",
        data: userInfo
    },{
        status: 200
    });
}