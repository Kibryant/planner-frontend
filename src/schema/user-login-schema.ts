import z from "zod";

export const userLoginSchema = z.object({
  email: z
    .string({ message: "O email é obrigatório" })
    .email("O e-mail é inválido"),
  password: z
    .string({
      message: "A senha é obrigatória",
    })
    .min(4, "A senha deve ter no mínimo 4 caracteres"),
});

export type UserLoginSchema = z.infer<typeof userLoginSchema>;
