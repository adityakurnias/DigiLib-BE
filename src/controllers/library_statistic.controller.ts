import { StatisticsService } from "../services/library_statistics.service";

export const StatisticsController = {
  async summary(c: any) {
    const summary = await StatisticsService.getSummary();
    return c.json({ success: true, data: summary });
  },

  async generateDaily(c: any) {
    await StatisticsService.generateDailyStat();
    return c.json({ success: true, message: "Daily statistics generated" });
  },

  async report(c: any) {
    const start = c.req.query("start");
    const end = c.req.query("end");

    if (!start || !end) {
      return c.json({ error: "start and end query required" }, 400);
    }

    const report = await StatisticsService.generateReport(start, end);
    return c.json({ success: true, data: report });
  },
};
