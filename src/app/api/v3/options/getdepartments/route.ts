import { parseJWT } from "@/utils/parseJWT";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const findDepartments = await prisma.departments.findMany();
        return NextResponse.json({
            status: "OK",
            message: "OK",
            data: findDepartments
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