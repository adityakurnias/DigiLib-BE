import { timestamp, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { books } from "./books";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const bookUploads = mysqlTable('book_uploads', {
  id: int('id').primaryKey().autoincrement(),
  bookId: int('book_id').notNull(),
  uploadedBy: int('uploaded_by').notNull(),
  fileType: varchar('file_type', { length: 50 }),
  uploadDate: timestamp('upload_date').notNull().defaultNow(),
});

export const bookUploadsRelations = relations(bookUploads, ({ one }) => ({
  book: one(books, {
    fields: [bookUploads.bookId],
    references: [books.id],
  }),
  uploader: one(users, {
    fields: [bookUploads.uploadedBy],
    references: [users.id],
  }),
}));