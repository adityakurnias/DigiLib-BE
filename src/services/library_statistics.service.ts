import { db } from "../databases";
import { library_statistics } from "../databases/schema/library_statistics";
import { borrowings } from "../databases/schema/borrowings";
import { eq, between, sql, and } from "drizzle-orm";

export class StatisticsService {
  static async getSummary() {
    const borrowed = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(borrowings)
      .where(eq(borrowings.status, "borrowed"));

    const returned = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(borrowings)
      .where(eq(borrowings.status, "returned"));

    return {
      borrowed: borrowed[0].count,
      returned: returned[0].count,
    };
  }

  // 🧮 Generate daily statistics
  static async generateDailyStat() {
    const today = new Date().toISOString().split("T")[0];

    const borrowed = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(borrowings)
      .where(
        and(
          eq(borrowings.status, "borrowed"),
          eq(sql`DATE(${borrowings.borrowDate})`, today),
        ),
      );

    const returned = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(borrowings)
      .where(
        and(
          eq(borrowings.status, "returned"),
          eq(sql`DATE(${borrowings.returnDate})`, today),
        ),
      );

    await db.insert(library_statistics).values({
      statDate: new Date(),
      borrowCount: borrowed[0].count,
      returnCount: returned[0].count,
    });

    return { success: true };
  }

  static async generateReport(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
  
    const rows = await db
      .select()
      .from(library_statistics)
      .where(between(library_statistics.statDate, startDate, endDate));
  
    const totalBorrowed = rows.reduce((a, b) => a + (b.borrowCount || 0), 0);
    const totalReturned = rows.reduce((a, b) => a + (b.returnCount || 0), 0);
  
    return {
      start,
      end,
      totalBorrowed,
      totalReturned,
      daily: rows,
    };
  }

}
