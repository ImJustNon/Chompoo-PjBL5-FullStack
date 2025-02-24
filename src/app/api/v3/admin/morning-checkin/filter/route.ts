import { parseJWT } from "@/utils/parseJWT";
import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import excelToJson from "convert-excel-to-json";

const prisma: PrismaClient = new PrismaClient();


export async function POST(req: NextRequest): Promise<NextResponse> {
    const jwtToken: string = await getCookie('token', { cookies }) as string;
    const user_uuid: string = (await parseJWT<{uuid: string;}>(jwtToken)).uuid;

    const reqBody = await req.json();
    const date: {
        year: string;
        month: string;
        day: string;
    } | null = reqBody.date ?? null;
    const u_id: string | null = reqBody.user_id ?? null;

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


        // filter each option
        if(date && u_id){
            if(!date.day || !date.month || !date.year){
                return NextResponse.json({
                    status: "FAIL",
                    message: "Date property missing"
                }, {
                    status: 400
                });
            }
            const findResult = await prisma.morningCheckinData.findMany({
                where: {
                    date: dayjs(`${date.year}-${date.month}-${date.day}`).toISOString(),
                    employee_number: u_id
                }
            });
            return NextResponse.json({
                status: "OK",
                message: "Filtered Data",
                data: findResult
            }, {
                status: 200
            });
        }
        else if(date && !u_id){
            if(!date.day || !date.month || !date.year){
                return NextResponse.json({
                    status: "FAIL",
                    message: "Date property missing"
                }, {
                    status: 400
                });
            }
            const findResult = await prisma.morningCheckinData.findMany({
                where: {
                    date: dayjs(`${date.year}-${date.month}-${date.day}`).toISOString(),
                }
            });
            return NextResponse.json({
                status: "OK",
                message: "Filtered Data",
                data: findResult
            }, {
                status: 200
            });
        }
        else if(!date && u_id) {
            if(!u_id){
                return NextResponse.json({
                    status: "FAIL",
                    message: "User ID missing"
                }, {
                    status: 400
                });
            }
            const findResult = await prisma.morningCheckinData.findMany({
                where: {
                    employee_number: u_id
                }
            });
            return NextResponse.json({
                status: "OK",
                message: "Filtered Data",
                data: findResult
            }, {
                status: 200
            });
        }
        else {
            return NextResponse.json({
                status: "FAIL",
                message: "Bad Request",
            }, {
                status: 400
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