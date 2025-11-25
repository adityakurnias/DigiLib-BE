import { mysqlTable, int, varchar, mysqlEnum, timestamp} from "drizzle-orm/mysql-core";
import { borrowings } from "./borrowings";
import { statistics } from "./statistics";
import { books } from "./books";
import { relations } from "drizzle-orm";


const ROLES = ['user', 'librarian', 'admin'] as const;

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['user', 'librarian', 'admin']).notNull().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  borrowings: many(borrowings),
  statistics: many(statistics),
  uploadedBooks: many(books),
  processedBorrowings: many(borrowings),
}));