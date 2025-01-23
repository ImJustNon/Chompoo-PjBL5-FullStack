import { config } from "../config/config";
import jwt from "jsonwebtoken";

export function createJWTToken(data: object, expiresIn: string): string {
    return jwt.sign(data, config.jwtSecret, { expiresIn: expiresIn });
}