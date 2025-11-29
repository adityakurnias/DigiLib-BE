import { Hono } from "hono";
import { BookController } from "../controllers/book.controller";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

export const bookRoutes = new Hono();

bookRoutes.get("/", BookController.getAll);
bookRoutes.get("/:id", BookController.getById);

bookRoutes.post("/", authMiddleware, adminMiddleware, BookController.create);
bookRoutes.put("/:id", authMiddleware, adminMiddleware, BookController.update);
bookRoutes.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  BookController.delete,
);
