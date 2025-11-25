import { BorrowingController } from "../controllers/borrow.controller";
import { adminMiddleware, authMiddleware } from "../middlewares/auth.middleware";
import { Hono } from "hono";

export const borrowRoute = new Hono();

borrowRoute.get("/", authMiddleware, adminMiddleware, BorrowingController.getAll);
borrowRoute.post("/:id", authMiddleware, BorrowingController.request);
borrowRoute.post("/:id/approve", authMiddleware, adminMiddleware, BorrowingController.approve);
borrowRoute.post("/:id/reject", authMiddleware, adminMiddleware, BorrowingController.reject);
borrowRoute.post("/:id/return", authMiddleware, BorrowingController.returnBook);