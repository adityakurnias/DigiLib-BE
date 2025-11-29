import { db } from "../databases";
import { categories } from "../databases/schema/categories";
import { books } from "../databases/schema/books";
import { eq, like, sql } from "drizzle-orm";

export const CategoryService = {
  getAllCategories: async(page = 1, limit = 10, search = "") => {
    const offset = (page - 1) * limit;

    let query = db
      .select({
        id: categories.id,
        name: categories.name,
        description: categories.description,
        createdAt: categories.createdAt,
        bookCount: sql<number>`COUNT(${books.id})`.as('book_count'),
      })
      .from(categories)
      .leftJoin(books, eq(categories.id, books.categoryId))
      .$dynamic();
    
    if (search) {
      query = query.where(like(categories.name, `%${search}%`));
    }
    
    query = query.groupBy(categories.id);
    
    const data = await query.limit(limit).offset(offset);
    const total = await db.select().from(categories);

    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: total.length,
        totalPages: Math.ceil(total.length / limit),
      },
    };
  },

  getCategoryById: async(id: number) => {
    const result = await db
      .select({
        id: categories.id,
        name: categories.name,
        description: categories.description,
        createdAt: categories.createdAt,
        bookCount: sql<number>`COUNT(${books.id})`.as("book_count"),
      })
      .from(categories)
      .leftJoin(books, eq(categories.id, books.categoryId))
      .where(eq(categories.id, id))
      .groupBy(categories.id);

    if (!result.length) return { error: "Category not found" };
    return { success: true, data: result[0] };
  },

  getBooksByCategory: async (categoryId: number, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId));

    if (!category.length) return { error: "Category not found" };

    const booksData = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        publisher: books.publisher,
        isbn: books.isbn,
        year: books.year,
        stock: books.stock,
        available: books.available,
        coverImage: books.coverImage,
      })
      .from(books)
      .where(eq(books.categoryId, categoryId))
      .limit(limit)
      .offset(offset);

    const total = await db
      .select()
      .from(books)
      .where(eq(books.categoryId, categoryId));

    return {
      success: true,
      category: category[0],
      data: booksData,
      pagination: {
        page,
        limit,
        total: total.length,
        totalPages: Math.ceil(total.length / limit),
      },
    };
  },

  createCategory: async (name: string, description?: string) => {
    const exists = await db
      .select()
      .from(categories)
      .where(eq(categories.name, name));

    if (exists.length > 0) return { error: "Category name already exists" };

    const [newCategory] = await db
      .insert(categories)
      .values({
        name,
        description: description || null,
      })
      .$returningId();

    return {
      success: true,
      message: "Category created successfully",
      data: { id: newCategory.id },
    };
  },

   updateCategory: async (id: number, name?: string, description?: string) => {
    const existing = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    if (!existing.length) return { error: "Category not found" };

    if (name && name !== existing[0].name) {
      const nameUsed = await db
        .select()
        .from(categories)
        .where(eq(categories.name, name));

      if (nameUsed.length > 0)
        return { error: "Category name already exists" };
    }

    await db
      .update(categories)
      .set({
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
      })
      .where(eq(categories.id, id));

    return { success: true, message: "Category updated successfully" };
  },

  deleteCategory: async (id: number) => {
    const existing = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    if (!existing.length) return { error: "Category not found" };

    const relatedBooks = await db
      .select()
      .from(books)
      .where(eq(books.categoryId, id));

    if (relatedBooks.length > 0)
      return {
        error: "Cannot delete category with existing books",
        bookCount: relatedBooks.length,
      };

    await db.delete(categories).where(eq(categories.id, id));

    return { success: true, message: "Category deleted successfully" };
  },
};
