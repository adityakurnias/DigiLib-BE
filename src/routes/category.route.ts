import { Hono } from "hono";
import { CategoryController } from "../controllers/category.controller";

export const categoryRouter = new Hono();

categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getById);
categoryRouter.get("/:id/books", CategoryController.getBooks);

categoryRouter.post("/", CategoryController.create);
categoryRouter.put("/:id", CategoryController.update);
categoryRouter.delete("/:id", CategoryController.delete);
