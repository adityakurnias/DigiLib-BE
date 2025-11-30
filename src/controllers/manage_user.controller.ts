import { UserService } from "../services/manage_user.service";

export class UserController {
  static async index(c: any) {
    const search = c.req.query("search");
    const data = await UserService.getAll(search);
    return c.json(data);
  }

  static async show(c: any) {
    const id = Number(c.req.param("id"));
    const user = await UserService.getById(id);

    if (!user) return c.json({ error: "User not found" }, 404);
    return c.json(user);
  }

  static async create(c: any) {
    const body = await c.req.json();
    const result = await UserService.create(body);
    return c.json(result, 201);
  }

  static async update(c: any) {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();

    const result = await UserService.update(id, body);
    return c.json(result);
  }

  static async updatePassword(c: any) {
    const id = Number(c.req.param("id"));
    const { password } = await c.req.json();

    if (!password) return c.json({ error: "Password required" }, 400);

    const result = await UserService.updatePassword(id, password);
    return c.json(result);
  }

  static async delete(c: any) {
    const id = Number(c.req.param("id"));
    const result = await UserService.delete(id);
    return c.json(result);
  }
}
