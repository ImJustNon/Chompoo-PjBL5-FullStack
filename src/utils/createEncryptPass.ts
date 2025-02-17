import bcrypt from "bcrypt";

const saltRounds: number = 10;

export async function createEncryptPass(originalPass: string): Promise<string> {
    return await bcrypt.genSalt(saltRounds).then(salt => bcrypt.hash(originalPass, salt));
}