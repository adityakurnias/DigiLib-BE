import { Hono } from "hono";
import { StatisticsController } from "../controllers/library_statistic.controller";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

export const libraryStatisticsRouter = new Hono();

libraryStatisticsRouter.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  StatisticsController.summary,
);
libraryStatisticsRouter.post(
  "/stats/generate-daily",
  authMiddleware,
  adminMiddleware,
  StatisticsController.generateDaily,
);
libraryStatisticsRouter.get(
  "/stats/report",
  authMiddleware,
  adminMiddleware,
  StatisticsController.report,
);
