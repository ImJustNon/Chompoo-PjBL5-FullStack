import { parseJWT } from "@/utils/parseJWT";
import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import qrcode from "qrcode";
import dayjs from "dayjs";

const prisma: PrismaClient = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse| void> {
    const jwtToken: string = await getCookie('token', { cookies }) as string;
    const user_uuid: string = (await parseJWT<{uuid: string;}>(jwtToken)).uuid;

    const searchParams = req.nextUrl.searchParams;
    const activity_id: string | null = searchParams.get('activity_id');

    if(!activity_id){
        return NextResponse.json({
            status: "FAIL",
            message: "activity_id missing"
        }, {
            status: 400
        });
    }

    try {
        const findUser = await prisma.users.findUnique({
            include: {
                student: true
            },
            where: {
                user_uuid: user_uuid
            },
        });
        
        if(!findUser){
            return NextResponse.json({
                status: "FAIL",
                message: "Cannot find user"
            }, {
                status: 401
            });
        }

        const findQrCache = await prisma.qRCache.findFirst({
            where: {
                qrcache_student_id: findUser.student?.student_id,
                qrcache_activity_id: activity_id
            },
            select: {
                qrcache_uuid: true,
                expired_at: true
            }
        });

        let qr_uuid: string = "";
        let expired_at: string = "";
        // found
        if(findQrCache){
            qr_uuid = findQrCache.qrcache_uuid;
            expired_at = dayjs(findQrCache.expired_at).toISOString();
            // if expired it will delete and make a new one.
            if(dayjs().toDate().getTime() >= dayjs(findQrCache.expired_at).toDate().getTime()){
                await prisma.qRCache.delete({
                    where: {
                        qrcache_uuid: findQrCache.qrcache_uuid
                    }
                });
                const newQRCache = await prisma.qRCache.create({
                    data: {
                        qrcache_activity_id: activity_id,
                        qrcache_student_id: findUser.user_id,
                        expired_at: dayjs().add(1, "minute").toISOString(),
                    },
                    select: {
                        qrcache_uuid: true,
                        expired_at: true
                    }
                });
                qr_uuid = newQRCache.qrcache_uuid;
                expired_at = dayjs(newQRCache.expired_at).toISOString();
            }
        }
        // not found
        else {
            const createQrCache = await prisma.qRCache.create({
                data: {
                    qrcache_activity_id: activity_id,
                    qrcache_student_id: findUser.user_id,
                    expired_at: dayjs().add(1, "minute").toISOString(),
                },
                select: {
                    qrcache_uuid: true,
                    expired_at: true
                }
            });
            qr_uuid = createQrCache.qrcache_uuid;
            expired_at = dayjs(createQrCache.expired_at).toISOString();
        }

        const QRBase64: string = await qrcode.toDataURL(qr_uuid);
        return NextResponse.json({
            status: "OK",
            message: "Created qr code and stored caches",
            data: {
                timeleft: (dayjs(expired_at).toDate().getTime() - dayjs().toDate().getTime()) / 1000,
                expired_at: expired_at,
                qr: QRBase64,
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