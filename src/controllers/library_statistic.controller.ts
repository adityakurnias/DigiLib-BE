import { StatisticsService } from "../services/library_statistics.service";

export const StatisticsController = {
  summary: async (c: any) => {
    const summary = await StatisticsService.getSummary();
    return c.json({ success: true, data: summary });
  },

  generateDaily: async (c: any) => {
    await StatisticsService.generateDailyStat();
    return c.json({ success: true, message: "Daily statistics generated" });
  },

  report: async (c: any) => {
    const start = c.req.query("start");
    const end = c.req.query("end");

    if (!start || !end) {
      return c.json({ error: "start and end query required" }, 400);
    }

    const report = await StatisticsService.generateReport(start, end);
    return c.json({ success: true, data: report });
  },
  
  exportPDF: async (c: any) => {
    const start = c.req.query("start");
    const end = c.req.query("end");

    if (!start || !end) {
      return c.json({ error: "start & end required" }, 400);
    }

    const pdf = await StatisticsService.exportReportPDF(start, end);

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=report_${start}_${end}.pdf`,
      },
    });
  },
}
