import { config } from "../config/config";
import { JWTPayload, jwtVerify } from "jose";

export async function parseJWT<T extends JWTPayload>(token: string): Promise<T> {
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(config.jwtSecret);

    try {
        const { payload } = await jwtVerify(token, secretKey);
        return payload as T;
    } catch (error) {
        console.error("JWT verification failed:", error);
        throw new Error("Invalid or expired token");
    }
}
