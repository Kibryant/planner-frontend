import z from "zod";

export const completeDailyTaskSchema = z.object({
  taskId: z.coerce.number(),
});

export type CompleteDailyTaskSchema = z.infer<typeof completeDailyTaskSchema>;
