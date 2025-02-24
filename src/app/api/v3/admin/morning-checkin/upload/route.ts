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

    const reqFormData = await req.formData();
    const xlsxFile: File | null = reqFormData.get("xlsx") as File ?? null;

    // console.log(xlsxFile);

    if(!xlsxFile){
        return NextResponse.json({
            status: "FAIL",
            message: "File Missing"
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

        // xlsx data
        const arrayBuffer = await xlsxFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const xlsxJsonData = excelToJson({
            source: buffer,
            includeEmptyLines: false,
            header: {
                rows: 1,
            },
            columnToKey: {
                "A": "space",
                "B": "order",
                "C": "employee_number_at_machine",
                "D": "employee_name",
                "E": "date",
                "F": "time_1",
                "G": "time_2",
                "H": "note",
                "I": "machine_number",
                "J": "employee_number"
            }
        });
        interface XLSXJsonData {
            space: string | null;
            order: number | null;
            employee_number_at_machine: string | null;
            employee_name: string | null;
            date: Date | null;
            time_1: Date | null;
            time_2: Date | null;
            note: string | null;
            machine_number: string | null;
            employee_number: string | null;
        }

        const createResult = await prisma.morningCheckinData.createMany({
            data: (xlsxJsonData["Sheet1"]).map((d: XLSXJsonData) => ({
                employee_number_at_machine: d.employee_number_at_machine ? String(d.employee_number_at_machine) : null,
                employee_name: d.employee_name ? String(d.employee_name) : null,
                employee_number: d.employee_number ? String(d.employee_number) : null,
                date: dayjs((String(d.date)).split("-").reverse().join("-")).toISOString() as unknown as Date ?? null,
                time_1: d.time_1 ?? null,
                time_2: d.time_2 ?? null,
                machine_number: d.machine_number ? String(d.machine_number) : null,
                note: d.note ?? null
            })),
        });

        // await prisma.morningCheckinData.deleteMany();
        
        return NextResponse.json({
            status: "OK",
            message: "Added Data",
            data: createResult
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