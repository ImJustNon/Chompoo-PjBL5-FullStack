import { deleteCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(): Promise<NextResponse> {
    
    await deleteCookie('token', { cookies });

    return NextResponse.json({
        status: "OK",
        message: "This User Signed Out",
    }, {
        status: 202
    });
}