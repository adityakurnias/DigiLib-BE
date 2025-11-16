import { sign, verify } from "hono/jwt";

const SECRET = process.env.JWT_SECRET!;

export async function generateToken(payload: any) {
  return await sign(payload, SECRET);
}

export async function verifyToken(token: string) {
  return await verify(token, SECRET);
}
