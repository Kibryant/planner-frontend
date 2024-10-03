import { z } from "zod";

export const getWeeklyProgessSchema = z.object({
  userId: z.string(),
});

export type GetWeeklyProgessSchema = z.infer<typeof getWeeklyProgessSchema>;
