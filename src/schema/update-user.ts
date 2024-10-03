import z from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  purchaseDate: z.date().optional(),
  expirationDate: z.date().optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
