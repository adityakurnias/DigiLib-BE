import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";

import { authRoute } from "./routes/auth.route";
import { categoryRouter } from "./routes/category.route";
import { bookRoutes } from "./routes/book.route";
import { borrowRoute } from "./routes/borrow.route";
import { statisticsRouter } from "./routes/statistics.route";
import { libraryStatisticsRouter } from "./routes/library_statistics.route";
import { userRoute } from "./routes/manage_user.route";

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.get("/", (c) => c.text("API Ready"));

app.use('/uploads/*', serveStatic({
  root: './'
}));

app.route("/auth", authRoute);
app.route("/category", categoryRouter);
app.route("/book", bookRoutes);
app.route("/borrow", borrowRoute);
app.route("/users", statisticsRouter);
app.route("/library-statistics", libraryStatisticsRouter);
app.route("/manage-user", userRoute);


export default app;
