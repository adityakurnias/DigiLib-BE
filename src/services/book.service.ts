import { db } from "../databases/index";
import { books } from "../databases/schema/books";
import { categories } from "../databases/schema/categories";
import { eq, like, and, ne, sql } from "drizzle-orm";

const bookSelect = {
  id: books.id,
  title: books.title,
  author: books.author,
  publisher: books.publisher,
  isbn: books.isbn,
  year: books.year,
  stock: books.stock,
  available: books.available,
  description: books.description,
  coverImage: books.coverImage,
  categoryId: books.categoryId,
  categoryName: categories.name,
  uploadedBy: books.uploadedBy,
  createdAt: books.createdAt,
  updatedAt: books.updatedAt,
};

export const BookService = {
  getAllBooks: async (page = 1, limit = 10, search = "") => {
    const offset = (page - 1) * limit;

    const baseQuery = db
      .select(bookSelect)
      .from(books)
      .leftJoin(categories, eq(books.categoryId, categories.id));
    
    const filtered = search
      ? baseQuery.where(like(books.title, `%${search}%`))
      : baseQuery;
    
    const data = await filtered.limit(limit).offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(books);

    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  },

  getBookById: async (id: any) => {
    const data = await db
      .select(bookSelect)
      .from(books)
      .leftJoin(categories, eq(books.categoryId, categories.id))
      .where(eq(books.id, id));

    if (data.length === 0) return { error: "Book not found" };

    return { success: true, data: data[0] };
  },

  createBook: async (bookData: any, uploadedBy: any) => {
    const categoryExists = await db
      .select()
      .from(categories)
      .where(eq(categories.id, bookData.categoryId));

    if (categoryExists.length === 0) return { error: "Category not found" };

    if (bookData.isbn) {
      const exists = await db
        .select()
        .from(books)
        .where(eq(books.isbn, bookData.isbn));

      if (exists.length > 0) return { error: "ISBN already exists" };
    }

    const [inserted] = await db
      .insert(books)
      .values({
        ...bookData,
        available: bookData.available ?? bookData.stock ?? 0,
        uploadedBy,
      })
      .$returningId();

    return {
      success: true,
      message: "Book created successfully",
      data: { id: inserted.id },
    };
  },

  updateBook: async (id: any, bookData: any) => {
    const existing = await db.select().from(books).where(eq(books.id, id));
    if (existing.length === 0) return { error: "Book not found" };

    if (bookData.categoryId) {
      const category = await db
        .select()
        .from(categories)
        .where(eq(categories.id, bookData.categoryId));

      if (category.length === 0) return { error: "Category not found" };
    }

    if (bookData.isbn && bookData.isbn !== existing[0].isbn) {
      const duplicate = await db
        .select()
        .from(books)
        .where(
          and(eq(books.isbn, bookData.isbn), ne(books.id, id))
        );

      if (duplicate.length) return { error: "ISBN already exists" };
    }

    const updateData = Object.fromEntries(
      Object.entries(bookData).filter(([_, v]) => v !== undefined)
    );

    await db.update(books).set(updateData).where(eq(books.id, id));

    return { success: true, message: "Book updated successfully" };
  },

  deleteBook: async (id: any) => {
    const existing = await db.select().from(books).where(eq(books.id, id));
    if (existing.length === 0) return { error: "Book not found" };

    await db.delete(books).where(eq(books.id, id));

    return { success: true, message: "Book deleted successfully" };
  },
};
