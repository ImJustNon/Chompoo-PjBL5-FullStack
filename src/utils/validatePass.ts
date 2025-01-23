import bcrypt from "bcrypt";

export async function validatePass(originalPass: string, encyptPass: string): Promise<boolean> {
    return await bcrypt.compare(originalPass, encyptPass);
}