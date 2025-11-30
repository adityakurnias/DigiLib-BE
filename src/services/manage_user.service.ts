import { db } from "../databases";
import { users } from "../databases/schema/users";
import { eq, like } from "drizzle-orm";
import { hashPassword } from "../utils/hash";

export const UserService = {
  getAll: async (search?: string) => {
    if (search) {
      return await db.select().from(users).where(
        like(users.name, `%${search}%`)
      );
    }
    return await db.select().from(users);
  },

  getById: async (id: number) => {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0] || null;
  },

  create: async (data: {
    name: string;
    email: string;
    password: string;
    role?: "user" | "librarian" | "admin";
  }) => {
    const hashed = await hashPassword(data.password);
    const result = await db.insert(users).values({
      name: data.name,
      email: data.email,
      password: hashed,
      role: data.role ?? "user",
    });

    return { id: result[0].insertId };
  },

  update: async (id: number, data: Partial<{name: string; email: string; role: any;}>) => {
    await db.update(users).set(data).where(eq(users.id, id));
    return { message: "User updated" };
  },

  updatePassword: async (id: number, newPassword: string) => {
    const hashed = await hashPassword(newPassword);
    await db.update(users).set({ password: hashed }).where(eq(users.id, id));
    return { message: "Password updated" };
  },

  delete: async (id: number) => {
    await db.delete(users).where(eq(users.id, id));
    return { message: "User deleted" };
  }
}
