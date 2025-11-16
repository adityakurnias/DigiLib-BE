import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 255 }).notNull(),
  email: text({ length: 255 }).notNull().unique(),
  password: text({ length: 255 }).notNull(),
});
