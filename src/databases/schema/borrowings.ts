import { date, timestamp, int, mysqlEnum, mysqlTable, text } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { books } from "./books";
import { relations } from "drizzle-orm";

const STATUS = ['borrowed', 'returned', 'overdue'] as const

export const borrowings = mysqlTable('borrowings', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  bookId: int('book_id').notNull(),
  borrowDate: date('borrow_date').notNull(),
  dueDate: date('due_date').notNull(),
  returnDate: date('return_date'),
  status: mysqlEnum('status', STATUS).notNull().default('borrowed'),
  processedBy: int('processed_by').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const borrowingsRelations = relations(borrowings, ({ one }) => ({
  user: one(users, {
    fields: [borrowings.userId],
    references: [users.id],
  }),
  book: one(books, {
    fields: [borrowings.bookId],
    references: [books.id],
  }),
  processor: one(users, {
    fields: [borrowings.processedBy],
    references: [users.id],
  }),
}));