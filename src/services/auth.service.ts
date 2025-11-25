import { db } from "../databases/index";
import { users } from "../databases/schema/users";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const AuthService = {
  register: async (name: string, email: string, password: string) => {
    
    const existing = await db.select()
      .from(users)
      .where(eq(users.email, email));

    if (existing.length > 0) {
      return { error: "Email already used" };
    }

    const hashed = await hashPassword(password);

    await db.insert(users).values({
      name,
      email,
      password: hashed,
    });

    return { success: true, message: "User registered successfully" };
  },

  login: async (email: string, password: string) => {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const user = result[0];

    if (!user) return { error: "Invalid email or password" };

    const valid = await comparePassword(password, user.password);
    if (!valid) return { error: "Invalid email or password" };

    const token = await generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return {
      success: true,
      message: "User login successfully",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  },
};
