import { Hono } from "hono";
import { UserController } from "../controllers/manage_user.controller";
import { adminMiddleware, authMiddleware } from "../middlewares/auth.middleware";

export const userRoute = new Hono();

userRoute.get("/", authMiddleware, UserController.index);

userRoute.get("/:id", authMiddleware, UserController.show);

userRoute.post("/", authMiddleware, adminMiddleware, UserController.create);
userRoute.put("/:id", authMiddleware, adminMiddleware, UserController.update);
userRoute.patch("/:id/password", authMiddleware, adminMiddleware, UserController.updatePassword);
userRoute.delete("/:id", authMiddleware, adminMiddleware, UserController.delete);
