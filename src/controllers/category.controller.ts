import { CategoryService } from "../services/category.service";

export const CategoryController = {
  getAll: async (c: any) => {
    const { page = 1, limit = 10, search = "" } = c.req.query();
    const result = await CategoryService.getAllCategories(
      Number(page),
      Number(limit),
      search
    );
    return c.json(result);
  },

  getById: async (c: any) => {
    const id = Number(c.req.param("id"));
    const result = await CategoryService.getCategoryById(id);
    return c.json(result);
  },

  getBooks: async (c: any) => {
    const id = Number(c.req.param("id"));
    const { page = 1, limit = 10 } = c.req.query();
    const result = await CategoryService.getBooksByCategory(
      id,
      Number(page),
      Number(limit)
    );
    return c.json(result);
  },

  create: async (c: any) => {
    const body = await c.req.json();
    const result = await CategoryService.createCategory(
      body.name,
      body.description
    );
    return c.json(result);
  },

  update: async (c: any) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    const result = await CategoryService.updateCategory(
      id,
      body.name,
      body.description
    );
    return c.json(result);
  },

  delete: async (c: any) => {
    const id = Number(c.req.param("id"));
    const result = await CategoryService.deleteCategory(id);
    return c.json(result);
  },
};
