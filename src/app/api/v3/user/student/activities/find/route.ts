import { parseJWT } from "@/utils/parseJWT";
import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
    const jwtToken: string = await getCookie('token', { cookies }) as string;
    const user_uuid: string = (await parseJWT<{uuid: string;}>(jwtToken)).uuid;

    const reqBody = await req.json();
    const activity_id: string | null = reqBody.activity_id ?? null;

    if(!activity_id){
        return NextResponse.json({
            status: "FAIL",
            message: "activity_id missing"
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
                student: {
                    select: {
                        student_id: true
                    }
                }
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

        // search activity Participated
        const findActivity = await prisma.activitiesParticipated.findFirst({
            where: {
                student_id: findUser.student!.student_id,
                activity_id: activity_id
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

        return NextResponse.json({
            status: "OK",
            message: "Activity Data",
            data: findActivity
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