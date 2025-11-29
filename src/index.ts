import { Hono } from "hono";
import { serveStatic } from "hono/bun";

import { authRoute } from "./routes/auth.route";
import { categoryRouter } from "./routes/category.route";
import { bookRoutes } from "./routes/book.route";
import { borrowRoute } from "./routes/borrow.route";
import { statisticsRouter } from "./routes/statistics.route";
import { libraryStatisticsRouter } from "./routes/library_statistics.route";

const app = new Hono();

app.get("/", (c) => c.text("API Ready"));

app.use('/uploads/*', serveStatic({
  root: './'
}));

app.route("/auth", authRoute);
app.route("/category", categoryRouter);
app.route("/book", bookRoutes);
app.route("/borrow", borrowRoute);
app.route("/users", statisticsRouter);
app.route("/library", libraryStatisticsRouter);


export default app;
