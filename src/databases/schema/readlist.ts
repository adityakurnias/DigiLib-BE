import { mysqlTable, int, date, timestamp} from "drizzle-orm/mysql-core";
import { users } from "./users";
import { books } from "./books";
import { relations } from "drizzle-orm";

export const readlist = mysqlTable('readlist', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  bookId: int('book_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const readlistRelations = relations(readlist, ({ one }) => ({
  user: one(users, {
    fields: [readlist.userId],
    references: [users.id],
  }),
  book: one(books, {
    fields: [readlist.userId],
    references: [books.id]
  })
}));