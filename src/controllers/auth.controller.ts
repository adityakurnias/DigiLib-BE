import { AuthService } from "../services/auth.service";

export const AuthController = {
  register: async (c: any) => {
    const body = await c.req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return c.json({ error: "Missing fields" }, 400);
    }

    const result = await AuthService.register(name, email, password);
    return c.json(result);
  },

  login: async (c: any) => {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: "Missing fields" }, 400);
    }

    const result = await AuthService.login(email, password);
    return c.json(result);
  },

  logout: async (c: any) => {
    // Since JWT is stateless, logout is handled on client-side by removing the token
    // This endpoint confirms the logout action
    return c.json({
      success: true,
      message: "User logged out successfully"
    });
  },
};
