import z from "zod";

export const createDailyTaskSchema = z.object({
  title: z.string().min(2, "O título deve ter no mínimo 2 caracteres"),
  description: z.string(),
});

export type CreateDailyTaskSchema = z.infer<typeof createDailyTaskSchema>;
