import { Hono } from "hono";
import { StatisticController } from "../controllers/statistic.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const statisticsRouter = new Hono();

statisticsRouter.get("/stats", authMiddleware, StatisticController.getAll);
