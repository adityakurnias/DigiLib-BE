import { mysqlTable, int, date, timestamp } from "drizzle-orm/mysql-core";

export const library_statistics = mysqlTable("library_statistics", {
  id: int("id").primaryKey().autoincrement(),
  statDate: date("stat_date").notNull(),
  borrowCount: int("borrow_count").default(0),
  returnCount: int("return_count").default(0),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});
