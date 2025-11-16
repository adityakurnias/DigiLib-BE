import { mysqlTable, int, varchar, mysqlEnum} from "drizzle-orm/mysql-core";


const ROLES = ['user', 'librarian'] as const;

export const usersTable = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: mysqlEnum("role", ROLES).default("user"),
  password: varchar("password", { length: 255 }).notNull(),
});
