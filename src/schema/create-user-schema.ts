import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome muito curto").max(255, "Nome muito longo"),
  email: z.string().email("Email inválido"),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
