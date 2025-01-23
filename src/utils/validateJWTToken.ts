import { config } from "../config/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "jose";

export function validateJWTToken(token: string): boolean | JwtPayload{
    try {
        const encoder = new TextEncoder();
        return jwtVerify(token, encoder.encode(config.jwtSecret)) as JwtPayload;
    }
    catch(e){
        console.log(e)
        return false;
    }
}