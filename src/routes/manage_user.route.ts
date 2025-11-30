// src/routes/user.routes.ts

import { Hono } from "hono";
import { UserController } from "../controllers/manage_user.controller";
import { adminMiddleware } from "../middlewares/auth.middleware";

export const userRoute = new Hono();

userRoute.get("/", adminMiddleware, UserController.index);

userRoute.get("/:id", adminMiddleware, UserController.show);

userRoute.post("/", adminMiddleware, UserController.create);
userRoute.put("/:id", adminMiddleware, UserController.update);
userRoute.patch("/:id/password", adminMiddleware, UserController.updatePassword);
userRoute.delete("/:id", adminMiddleware, UserController.delete);
