import { mysqlTable, int, varchar, text, mysqlEnum, timestamp} from "drizzle-orm/mysql-core";
import { categories } from "./categories";
import { users } from "./users";
import { borrowings } from "./borrowings";
import { statistics } from "./statistics";
import { bookUploads } from "./book_uploads";
import { relations } from "drizzle-orm";


export const books = mysqlTable('books', {
  id: int('id').primaryKey().autoincrement(),
  categoryId: int('category_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  publisher: varchar('publisher', { length: 255 }),
  isbn: varchar('isbn', { length: 20 }).unique(),
  year: int('year'),
  stock: int('stock').notNull().default(0),
  available: int('available').notNull().default(0),
  description: text('description'),
  coverImage: varchar('cover_image', { length: 255 }),
  uploadedBy: int('uploaded_by').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const booksRelations = relations(books, ({ one, many }) => ({
  category: one(categories, {
    fields: [books.categoryId],
    references: [categories.id],
  }),
  uploader: one(users, {
    fields: [books.uploadedBy],
    references: [users.id],
  }),
  borrowings: many(borrowings),
  statistics: many(statistics),
  uploads: many(bookUploads),
}));