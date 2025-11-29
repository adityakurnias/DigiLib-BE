import { db } from "../databases/index"
import { eq } from "drizzle-orm";

import { statistics } from "../databases/schema/statistics";
import { users } from "../databases/schema/users"

export const StatisticService = {
  getUserStatistic: async (userId: number) => {
    const data = await db
      .select()
      .from(statistics)
      .where(eq(users.id, userId));

    if (data.length === 0) return { error: "Stats not found" };

    return { success: true, data: data[0] };
  }
}