import { timestamp, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { books } from "./books";
import { relations } from "drizzle-orm";

export const categories = mysqlTable('categories', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 500 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  books: many(books),
}));