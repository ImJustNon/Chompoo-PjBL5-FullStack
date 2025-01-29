import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { validatePass } from "@/utils/validatePass";
import { setCookie } from "cookies-next";
import { createJWTToken } from "@/utils/createJWTToken";
import { serialize } from 'cookie';

const prisma: PrismaClient = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body = await req.json();

    const user_id: string | null = body.user_id ?? null;
    const user_password: string | null = body.user_password ?? null;
    const stay_login: string | null = body.stay_login ?? null;

    if(!user_id || !user_password){
        return NextResponse.json({
            status: "FAIL",
            message: "Missing require informations",
        }, {
            status: 400,
        });
    }

    try {
        const findStudent = await prisma.users.findUnique({
            where: {
                user_id: user_id,
            },
            select: {
                user_password: true,
                user_uuid: true,
            }
        });
        if(!findStudent){
            return NextResponse.json({
                status: "FAIL",
                message: "Can not find student information from this id",
            }, {
                status: 401
            });
        }
        const validatePassResult: boolean = await validatePass(user_password, findStudent.user_password);
        if(!validatePassResult){
            return NextResponse.json({
                status: "FAIL",
                message: "Password Failed"
            }, {
                status: 401
            });
        }

        const signUserToken: string = createJWTToken({
            uuid: findStudent.user_uuid
        }, stay_login ? "7d" : "1d");

        await setCookie("token", signUserToken, { 
            cookies,
            maxAge: stay_login ? (((7 * 24) * 60) * 60) : (((1 * 24) * 60) * 60),
            secure: true,
            httpOnly: true,
            sameSite: "none"
        });

        return NextResponse.json({
            status: "OK",
            message: "Auth Success"
        }, {
            status: 202,
        });

    }
    catch(e){
        return NextResponse.json({
            status: "FAIL",
            message: e
        }, {
            status: 400
        });
    }

}