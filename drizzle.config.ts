import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/databases/migrations',
  schema: './src/databases/schema',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
