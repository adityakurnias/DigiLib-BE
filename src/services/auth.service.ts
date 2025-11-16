import { db } from "../databases/index";
import { usersTable } from "../databases/schema/user";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const AuthService = {
  register: async (name: string, email: string, password: string) => {
    
    const existing = await db.select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existing.length > 0) {
      return { error: "Email already used" };
    }

    const hashed = await hashPassword(password);

    await db.insert(usersTable).values({
      name,
      email,
      password: hashed,
    });

    return { success: true, message: "User registered successfully" };
  },

  login: async (email: string, password: string) => {
    const user = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .get();

    if (!user) return { error: "Invalid email or password" };

    const valid = await comparePassword(password, user.password);
    if (!valid) return { error: "Invalid email or password" };

    const token = await generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      success: true,
      message: "User login successfully",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  },
};