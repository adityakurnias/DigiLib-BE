import { UserService } from "../services/manage_user.service";

export const UserController = {
  index: async (c: any) => {
    const search = c.req.query("search");
    const data = await UserService.getAll(search);
    return c.json(data);
  },

  show: async (c: any) => {
    const id = Number(c.req.param("id"));
    const user = await UserService.getById(id);

    if (!user) return c.json({ error: "User not found" }, 404);
    return c.json(user);
  },

  create: async (c: any) => {
    const body = await c.req.json();
    const result = await UserService.create(body);
    return c.json(result, 201);
  },

  update: async (c: any) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();

    const result = await UserService.update(id, body);
    return c.json(result);
  },

  updatePassword: async (c: any) => {
    const id = Number(c.req.param("id"));
    const { password } = await c.req.json();

    if (!password) return c.json({ error: "Password required" }, 400);

    const result = await UserService.updatePassword(id, password);
    return c.json(result);
  },

  delete: async (c: any) => {
    const id = Number(c.req.param("id"));
    const result = await UserService.delete(id);
    return c.json(result);
  },
}
