import { StatisticService } from "../services/statistic.service"

export const StatisticController = {
  getAll: async (c: any) => {
    const user = c.get("user")
    
    const result = await StatisticService.getUserStatistic(user.id)
    
    return c.json(result)
  }
}