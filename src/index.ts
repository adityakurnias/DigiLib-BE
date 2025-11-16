import { Hono } from "hono";
import authRoute from "./routes/auth.route";

const app = new Hono();

app.get("/", (c) => c.text("API Ready"));

app.route("/auth", authRoute);

export default app;
