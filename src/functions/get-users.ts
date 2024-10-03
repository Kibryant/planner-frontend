import { api } from "@/lib/api";
import { User } from "@/store/user-store";
import { HttpStatusCode } from "axios";

interface GetUsersProps {
  token: string;
  page?: number;
  limit?: number;
}

interface GetUsersResponse {
  users: User[];
  totalUsers: number;
  page: number;
  limit: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
}

export async function getUsers({ token, page = 1, limit = 10 }: GetUsersProps) {
  const response = await api.get<GetUsersResponse>(
    `/admin/get-users?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== HttpStatusCode.Ok) {
    throw new Error("Erro ao buscar usuários");
  }

  return response.data;
}
