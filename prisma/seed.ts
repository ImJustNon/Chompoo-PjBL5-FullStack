import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma: PrismaClient = new PrismaClient();

(async() =>{
    await createRoles((e): void =>{
        if(!e){
            console.log("[Create Role] : " + "✅ : SUCCESS");
        }
        else {
            console.log("[Create Role] : " + "❌ : " + e);
        }
    });
    await createUserPrefix((e): void =>{
        if(!e){
            console.log("[Create UserPrefix] : " + "✅ : SUCCESS");
        }
        else {
            console.log("[Create UserPrefix] : " + "❌ : " + e);
        }
    });
    await createDepartments((e): void =>{
        if(!e){
            console.log("[Create Departments] : " + "✅ : SUCCESS");
        }
        else {
            console.log("[Create Departments] : " + "❌ : " + e);
        }
    });
    await createActivityType((e): void =>{
        if(!e){
            console.log("[Create ActivityType] : " + "✅ : SUCCESS");
        }
        else {
            console.log("[Create ActivityType] : " + "❌ : " + e);
        }
    });
    await createUsers((e): void =>{
        if(!e){
            console.log("[Create User] : " + "✅ : SUCCESS");
        }
        else {
            console.log("[Create User] : " + "❌ : " + e);
        }
    });
    await createStudent((e): void =>{
        if(!e){
            console.log("[Create Student] : " + "✅ : SUCCESS");
        }
        else {
            console.log("[Create Student] : " + "❌ : " + e);
        }
    });
    await createActivity((e): void =>{
        if(!e){
            console.log("[Create Actvity] : " + "✅ : SUCCESS");
        }
        else {
            console.log("[Create Actvity] : " + "❌ : " + e);
        }
    });
    await createQRCache((e): void =>{
        if(!e){
            console.log("[Create QRCache] : " + "✅ : SUCCESS");
        }
        else {
            console.log("[Create QRCache] : " + "❌ : " + e);
        }
    });
})();


async function createRoles(callback: (err: any) => void): Promise<void> {
    try {
        await prisma.roles.createMany({
            data: [
                {
                    role_name: "Administrator",
                    role_description: "ผู้ดูเเล",
                },
                {
                    role_name: "Student",
                    role_description: "นักเรียน",
                },
                {
                    role_name: "IT_Admin",
                    role_description: "ผู้ดูเเลกิจกรรม IT",
                }
            ]
        });
        callback(null);
    }
    catch(e){
        callback(e);
    }
}

async function createUserPrefix(callback: (err: any) => void): Promise<void> {
    try {
        await prisma.userPrefix.createMany({
            data: [
                {
                    prefix_name: "นาย",
                    prefix_name_short: "น.",
                    gender: "Male"
                },
                {
                    prefix_name: "นางสาว",
                    prefix_name_short: "นส.",
                    gender: "Female"
                },
                {
                    prefix_name: "นาง",
                    prefix_name_short: "นาง",
                    gender: "Female"
                },
            ]
        });
        callback(null);
    }
    catch(e){
        callback(e);
    }
}

async function createDepartments(callback: (err: any) => void): Promise<void> {
    try {
        await prisma.departments.createMany({
            data: [
                {
                    department_id: "INFORMATION_TECHNOLOGY",
                    department_fullname_en: "Information Technology",
                    department_fullname_th: "เทคโนโลยีสารสนเทศ",
                    department_type: "พาณิชยกรรมเเละบริการฐานวิทยาศาสตร์"
                },
                {
                    department_id: "ELECTRICAL_TECHNOLOGY",
                    department_fullname_en: "Electrical Technology",
                    department_fullname_th: "เทคโนโลยีไฟฟ้า",
                    department_type: "ช่างอุตสาหกรรมฐานวิทยาศาสตร์"
                },
                {
                    department_id: "ELECTRONIC_TECHNOLOGY",
                    department_fullname_en: "Electronic Technology",
                    department_fullname_th: "เทคโนโลยีอิเล็กทรอนิกส์",
                    department_type: "ช่างอุตสาหกรรมฐานวิทยาศาสตร์"
                },
                {
                    department_id: "MECHATRONIC_TECHNOLOGY",
                    department_fullname_en: "Mechatronic Technology",
                    department_fullname_th: "เทคโนโลยีเมคคาทรอนิกส์",
                    department_type: "ช่างอุตสาหกรรมฐานวิทยาศาสตร์"
                },
            ]
        });
        callback(null);
    }
    catch(e){
        callback(e);
    }
}

async function createActivityType(callback: (err: any) => void): Promise<void> {
    try {
        await prisma.activityType.createMany({
            data: [
                {
                    activitytype_id: 1,
                    activitytype_name: "กิจกรรมชมรมวิชาชีพ"
                },
                {
                    activitytype_id: 2,
                    activitytype_name: "กิจกรรมหน้าเสาธง"
                },
            ]
        });
        callback(null);
    }
    catch(e){
        callback(e);
    }
}

async function createUsers(callback: (err: any) => void): Promise<void> {
    const getPrefixId = await prisma.userPrefix.findFirst({
        where: {
            prefix_name: "นาย"
        },
        select: {
            prefix_id: true
        }
    });
    try {
        await prisma.users.createMany({
            data: [
                {
                    user_id: "65202910002",
                    user_prefix_id: getPrefixId!.prefix_id,
                    user_firstname: "คณกร",
                    user_lastname: "ไทยประโคน",
                    user_email: "non.kanakorn@gmail.com",
                    user_phonenumber: "0885924071",
                    user_password: "$2b$10$Wb/REFC2sdagWkGxyiKXbOee0AX92x1C9ZXvHEXKm9v2WkpWaIPWy",
                    is_student: true,
                    is_admin: false
                },
            ]
        });
        callback(null);
    }
    catch(e){
        callback(e);
    }
}

async function createStudent(callback: (err: any) => void): Promise<void> {
    try {
        await prisma.students.createMany({
            data: [
                {
                    student_id: "65202910002",
                    student_department_id: "INFORMATION_TECHNOLOGY",
                    student_year_admission: "2565",
                }
            ]
        });
        callback(null);
    }
    catch(e){
        callback(e);
    }
}

async function createActivity(callback: (err: any) => void): Promise<void> {
    const getAdminId = await prisma.roles.findFirst({
        where: {
            role_name: "IT_Admin"
        },
        select: {
            role_id: true
        }
    });
    try {
        await prisma.activities.createMany({
            data: [
                {
                    activity_name: "ตลาดนัดฐานวิทย์",
                    activity_description: "กิจกรรมชมรมวิชาชีพ IT",
                    activity_department_id: "INFORMATION_TECHNOLOGY",
                    activity_date: dayjs("2025-01-30").toISOString(),
                    activity_type_id: 1,
                    activity_role_admin_id: getAdminId!.role_id
                }
            ]
        });
        callback(null);
    }
    catch(e){
        callback(e);
    }
}

async function createQRCache(callback: (err: any) => void): Promise<void> {
    const getActivityId = await prisma.activities.findFirst({
        where: {
            activity_name: "ตลาดนัดฐานวิทย์",
        },
        select: {
            activity_id: true
        }
    });
    try {
        await prisma.qRCache.createMany({
            data: [
                {
                    qrcache_student_id: "65202910002",
                    qrcache_activity_id: getActivityId!.activity_id,
                    expired_at: dayjs().add(1, "minute").toISOString()
                }
            ]
        });
        callback(null);
    }
    catch(e){
        callback(e);
    }
}