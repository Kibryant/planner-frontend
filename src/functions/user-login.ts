import { api } from "@/lib/api";
import type { UserLoginSchema } from "@/schema/user-login-schema";
import { HttpStatusCode } from "axios";

export interface UserLoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    purchaseDate: Date;
    expirationDate: Date;
  };

  token: string;
}

export const userLogin = async ({ email, password }: UserLoginSchema) => {
  const response = await api.post<UserLoginResponse>("/user/login", {
    email,
    password,
  });

  if (response.status !== HttpStatusCode.Ok) {
    throw new Error("Erro ao fazer login");
  }

  return response.data;
};
