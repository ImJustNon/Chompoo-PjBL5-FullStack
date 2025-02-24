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
    const date: {
        day: string;
        month: string;
        year: string;
    } | null = reqBody?.date ?? null;


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
        const findStudent = await prisma.students.findUnique({
            where: {
                student_id: findUser.user_id
            }
        });
        if(!findStudent){
            return NextResponse.json({
                status: "FAIL",
                message: "U R Not Student"
            }, {
                status: 403
            });
        }

        if(date){
            const findByDateResult = await prisma.morningCheckinData.findMany({
                where: {
                    employee_number: findStudent.student_id.split("00").join(),
                    date: dayjs(`${date.year}-${date.month}-${date.day}`).toISOString()
                }
            });
            const sortedByDate = findByDateResult.sort((a, b) => dayjs(a.date).toDate().getTime() - dayjs(b.date).toDate().getTime());
            return NextResponse.json({
                status: "OK",
                message: "morningCheckinData",
                data: sortedByDate
            }, {
                status: 200
            });
        }
        else {
            const findById = await prisma.morningCheckinData.findMany({
                where: {
                    employee_number: findStudent.student_id.split("00").join() // "652029101"// 
                }
            });
            const sortedByDate = findById.sort((a, b) => dayjs(a.date).toDate().getTime() - dayjs(b.date).toDate().getTime());
            return NextResponse.json({
                status: "OK",
                message: "morningCheckinData",
                data: sortedByDate
            }, {
                status: 200
            });
        }
        
        
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