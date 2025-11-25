import { BookService } from "../services/book.service";

export const BookController = {
  // GET /books - Get all books
  getAll: async (c: any) => {
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "10");
    const search = c.req.query("search") || "";

    const result = await BookService.getAllBooks(page, limit, search);
    return c.json(result);
  },

  // GET /books/:id - Get book by ID
  getById: async (c: any) => {
    const id = parseInt(c.req.param("id"));
    
    if (isNaN(id)) {
      return c.json({ error: "Invalid book ID" }, 400);
    }

    const result = await BookService.getBookById(id);
    
    if (result.error) {
      return c.json(result, 404);
    }

    return c.json(result);
  },

  // POST /books - Create new book (Admin only)
  create: async (c: any) => {
    const fields = await c.req.parseBody();
    const user = c.get("user");
  
    let cover: File | undefined = fields['coverImage'];
    if (Array.isArray(cover)) cover = cover[0];
  
    let coverName: string | null = null;
  
    if (cover instanceof File) {
      const ext = cover.name.split(".").pop();
      coverName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  
      const buffer = Buffer.from(await cover.arrayBuffer());
      await Bun.write(`./uploads/${coverName}`, buffer);
    }
  
    const bookData = {
      title: fields.title,
      author: fields.author,
      publisher: fields.publisher,
      isbn: fields.isbn,
      year: fields.year ? Number(fields.year) : null,
      stock: fields.stock ? Number(fields.stock) : null,
      available: fields.available ? Number(fields.available) : null,
      description: fields.description,
      categoryId: Number(fields.categoryId),
      coverImage: coverName, // now safe!
    };
  
    const result = await BookService.createBook(bookData, user.id);
    return c.json(result);
  },
  
  
  // PUT /books/:id - Update book (Admin only)
  update: async (c: any) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid book ID" }, 400);
  
    const fields = await c.req.parseBody();
  
    let cover: File | undefined = fields['coverImage'];
    if (Array.isArray(cover)) cover = cover[0];
  
    const bookData: any = {
      title: fields.title,
      author: fields.author,
      publisher: fields.publisher,
      isbn: fields.isbn,
      year: fields.year ? Number(fields.year) : undefined,
      stock: fields.stock ? Number(fields.stock) : undefined,
      available: fields.available ? Number(fields.available) : undefined,
      description: fields.description,
      categoryId: fields.categoryId ? Number(fields.categoryId) : undefined,
    };
  
    if (cover instanceof File) {
      const ext = cover.name.split(".").pop();
      const newName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  
      const buffer = Buffer.from(await cover.arrayBuffer());
      await Bun.write(`./uploads/${newName}`, buffer);
  
      bookData.coverImage = newName;
    }
  
    const result = await BookService.updateBook(id, bookData);
    return c.json(result);
  },

  // DELETE /books/:id - Delete book (Admin only)
  delete: async (c: any) => {
    const id = parseInt(c.req.param("id"));

    if (isNaN(id)) {
      return c.json({ error: "Invalid book ID" }, 400);
    }

    const result = await BookService.deleteBook(id);

    if (result.error) {
      return c.json(result, 404);
    }

    return c.json(result);
  },
};