import { Hono } from "hono";
import { CategoryController } from "../controllers/category.controller";
import {
  adminMiddleware,
  authMiddleware,
} from "../middlewares/auth.middleware";

export const categoryRouter = new Hono();

categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getById);
categoryRouter.get("/:id/books", CategoryController.getBooks);

categoryRouter.post(
  "/",
  authMiddleware,
  adminMiddleware,
  CategoryController.create,
);
categoryRouter.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  CategoryController.update,
);
categoryRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  CategoryController.delete,
);
