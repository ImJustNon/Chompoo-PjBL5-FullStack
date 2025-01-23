import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma: PrismaClient = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
    const prismaRes = await prisma.students.findUnique({
        where: {
            student_id: "65202910002",
        },
        include: {
            user: {
                include: {
                    user_prefix: true,
                    user_roles: {
                        include: {
                            role: true
                        }
                    },
                    
                },
            },
            department: true
        }
    });

    return NextResponse.json(prismaRes);
}