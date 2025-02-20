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
    const user_prefix: {user_prefix_id: number; user_prefix_name: string;} | null = reqBody.user_prefix ?? null;
    const user_firstname: string | null = reqBody.user_firstname ?? null;
    const user_lastname: string | null = reqBody.user_lastname ?? null;
    const user_email: string | null = reqBody.user_email ?? null;
    const user_phonenumber: string | null = reqBody.user_phonenumber ?? null;
    const user_password: string | null = reqBody.user_password ?? null;
    const user_roles: {user_role_id: number; user_role_name: string;}[] | null = reqBody.user_roles ?? null;
    const student_admission_year: string | null = reqBody.student_admission_year ?? null;
    const student_department: {student_department_id: string; student_department_name: string;} | null = reqBody.student_department ?? null;

    if(!user_id || !user_prefix || !user_firstname || !user_lastname || !user_email || !user_phonenumber || !student_admission_year || !student_department || !user_password){
        return NextResponse.json({
            status: "FAIL",
            message: "Data missing"
        }, {
            status: 400
        });
    }

    try {

        // find user
        const findUser = await prisma.users.findUnique({
            where: {
                user_uuid: user_uuid
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
        
        // create user
        const createUser = await prisma.users.create({
            data: {
                user_id: user_id,
                user_prefix_id: user_prefix.user_prefix_id,
                user_firstname: user_firstname,
                user_lastname: user_lastname,
                user_email: user_email,
                user_phonenumber: user_phonenumber,
                user_password: user_password,
                is_admin: false,
                is_student: true
            }
        });
        // create student
        await prisma.students.create({
            data: {
                student_id: createUser.user_id,
                student_year_admission: student_admission_year,
                student_department_id: student_department.student_department_id
            },
        }); 
        // create user roles if exit
        if(user_roles){
            await prisma.userRoles.createMany({
                data: user_roles.map((u_r: {user_role_id: number}) => ({
                    userrole_user_id: createUser.user_id,
                    userrole_role_id: u_r.user_role_id
                })),
            });
        }

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