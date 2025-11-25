import { mysqlTable, int, date, timestamp} from "drizzle-orm/mysql-core";
import { users } from "./users";
import { books } from "./books";
import { relations } from "drizzle-orm";

export const statistics = mysqlTable('statistics', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  bookId: int('book_id').notNull(),
  totalBorrowed: int('total_borrowed').notNull().default(0),
  totalReturned: int('total_returned').notNull().default(0),
  totalOverdue: int('total_overdue').notNull().default(0),
  lastBorrowDate: date('last_borrow_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const statisticsRelations = relations(statistics, ({ one }) => ({
  user: one(users, {
    fields: [statistics.userId],
    references: [users.id],
  }),
  book: one(books, {
    fields: [statistics.bookId],
    references: [books.id],
  }),
}));