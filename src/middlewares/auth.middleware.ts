import { verifyToken } from "../utils/jwt";

export const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized - No token provided" }, 401);
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = await verifyToken(token);
    c.set("user", decoded);
    await next();
  } catch (error) {
    return c.json({ error: "Unauthorized - Invalid token" }, 401);
  }
};

export const adminMiddleware = async (c: any, next: any) => {
  const user = c.get("user");
  
  if (!user || (user.role !== "admin" && user.role !== "librarian")) {
    return c.json({ error: "Forbidden - Admin access required" }, 403);
  }
  
  await next();
};