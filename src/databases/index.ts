import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";

const db = drizzle(process.env.DB_URL!);

export { db };