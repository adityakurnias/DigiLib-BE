import { db } from "../databases";
import { library_statistics } from "../databases/schema/library_statistics";
import { borrowings } from "../databases/schema/borrowings";
import { eq, between, sql, and } from "drizzle-orm";
import { PDFDocument, StandardFonts } from "pdf-lib";

export const StatisticsService = {
    getOrCreateToday: async () => {
    const today = new Date().toISOString().split("T")[0];

    const existing = await db
      .select()
      .from(library_statistics)
      .where(eq(library_statistics.statDate, today))
      .limit(1);

    if (existing.length > 0) return existing[0];

    const inserted = await db.insert(library_statistics).values({
      statDate: today,
      borrowCount: 0,
      returnCount: 0,
    });

    const [created] = await db
      .select()
      .from(library_statistics)
      .where(eq(library_statistics.statDate, today));

    return created;
  },

   incrementBorrow: async () => {
    const today = await StatisticsService.getOrCreateToday();

    await db.update(library_statistics)
      .set({
        borrowCount: sql`${library_statistics.borrowCount} + 1`
      })
      .where(eq(library_statistics.id, today.id));
  },

  incrementReturn: async () => {
    const today = await StatisticsService.getOrCreateToday();

    await db.update(library_statistics)
      .set({
        returnCount: sql`${library_statistics.returnCount} + 1`
      })
      .where(eq(library_statistics.id, today.id));
  },
  getSummary: async () => {
    const borrowed = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(borrowings)
      .where(eq(borrowings.status, "borrowed"));

    const returned = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(borrowings)
      .where(eq(borrowings.status, "returned"));

    return {
      borrowed: borrowed[0].count,
      returned: returned[0].count,
    };
  },

  generateDailyStat: async () => {
    const today = new Date().toISOString().split("T")[0];

    const borrowed = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(borrowings)
      .where(
        and(
          eq(borrowings.status, "borrowed"),
          eq(sql`DATE(${borrowings.borrowDate})`, today),
        ),
      );

    const returned = await db
      .select({ count: sql<number>`COUNT(*)` })
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
  },

  generateReport: async (start: string, end: string) => {
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
  },

  /** -----------------------------
   *   EXPORT PDF Laporan Statistik
   * ----------------------------- */
  exportReportPDF: async (start: string, end: string) => {
    const report = await StatisticsService.generateReport(start, end);

    const pdf = await PDFDocument.create();
    const page = pdf.addPage([600, 800]);
    const font = await pdf.embedFont(StandardFonts.Helvetica);

    let y = 760;

    // Judul
    page.drawText("Laporan Statistik Perpustakaan", {
      x: 50,
      y,
      size: 20,
      font,
    });

    y -= 40;

    // Periode
    page.drawText(`Periode: ${start} s/d ${end}`, {
      x: 50,
      y,
      size: 12,
      font,
    });

    y -= 20;

    // Ringkasan
    page.drawText(`Total Peminjaman  : ${report.totalBorrowed}`, {
      x: 50,
      y,
      size: 12,
      font,
    });
    y -= 20;

    page.drawText(`Total Pengembalian: ${report.totalReturned}`, {
      x: 50,
      y,
      size: 12,
      font,
    });

    y -= 35;

    page.drawText("Rincian Harian:", {
      x: 50,
      y,
      size: 14,
      font,
    });

    y -= 25;

    // Tabel Harian
    for (const row of report.daily) {
      if (y < 40) {
        const newPage = pdf.addPage([600, 800]);
        y = 760;
      }

      const line = `${row.statDate.toISOString().split("T")[0]}  |  Borrowed: ${
        row.borrowCount
      }  |  Returned: ${row.returnCount}`;

      page.drawText(line, {
        x: 50,
        y,
        size: 12,
        font,
      });

      y -= 18;
    }

    const pdfBytes = await pdf.save();
    return pdfBytes;
  },
};
