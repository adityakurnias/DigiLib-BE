import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller";

export const authRoute = new Hono();

authRoute.post("/register", AuthController.register);
authRoute.post("/login", AuthController.login);
