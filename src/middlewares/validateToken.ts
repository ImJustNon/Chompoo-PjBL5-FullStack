import { validateJWTToken } from "@/utils/validateJWTToken";
import { JwtPayload } from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { type NextRequest, NextResponse } from "next/server";


export function validateToken(req: NextRequest): {status: "FAIL" | "OK"; code: number; message: string;} {
    const tokenCookie: RequestCookie | undefined = req.cookies.get('token');
    if(!tokenCookie){
        return {
            status: "FAIL",
            code: 401,
            message: "Token Cookie not found"
        }
    }

    const tokenValue: string = tokenCookie.value;

    const validToken: boolean | JwtPayload = validateJWTToken(tokenValue);
    if(!validToken){    
        return {
            status: "FAIL",
            code: 403,
            message: "Invalid Token or Expired Token"
        }
    }

    return {
        status: "OK",
        code: 200,
        message: "OK"
    }
}