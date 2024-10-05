import { z } from "zod";

export const adminLoginSchema = z.object({
  accessCode: z.coerce
    .string()
    .min(3, "Código de acesso muito curto")
    .max(100, "Código de acesso muito longo"),
  email: z.string().email("Email inválido"),
  password: z.string().min(3, "Senha muito curta"),
});

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;
