import { api } from "@/lib/api";
import type { AdminLoginSchema } from "@/schema/admin-login-schema";
import { HttpStatusCode } from "axios";

export interface AdminLoginResponse {
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
  };
}

export const adminLogin = async ({
  accessCode,
  email,
  password,
}: AdminLoginSchema) => {
  const response = await api.post<AdminLoginResponse>("/admin/login", {
    accessCode,
    email,
    password,
  });

  if (response.status !== HttpStatusCode.Ok) {
    throw new Error("Erro ao fazer login");
  }

  return response.data;
};
