import { Hono } from "hono";
import { serveStatic } from "hono/bun";

import { authRoute } from "./routes/auth.route";
import { categoryRouter } from "./routes/category.route";
import { bookRoutes } from "./routes/book.route";
import { borrowRoute } from "./routes/borrow.route";

const app = new Hono();

app.get("/", (c) => c.text("API Ready"));

app.use('/uploads/*', serveStatic({
  root: './'
}));

app.route("/auth", authRoute);
app.route("/category", categoryRouter);
app.route("/book", bookRoutes);
app.route("/borrow", borrowRoute);

export default app;
