import z from "zod";

export const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

export const getDailyTasksByDaySchema = z.object({
  userId: z.string(),
  day: z.enum(DAYS),
});

export type GetDailyTasksByDaySchema = z.infer<typeof getDailyTasksByDaySchema>;
