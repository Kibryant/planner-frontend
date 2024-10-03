import { api } from "@/lib/api";
import type { GetWeeklyProgessSchema } from "@/schema/get-weekly-progess-schema";
import { HttpStatusCode } from "axios";

type GetWeeklyProgessSchemaWithToken = GetWeeklyProgessSchema & {
  token: string;
};

interface GetWeeklyProgessResponse {
  completedPlans: number;
  progress: number;
  totalPlans: number;
}

export async function getWeeklyProgess({
  userId,
  token,
}: GetWeeklyProgessSchemaWithToken) {
  const response = await api.get<GetWeeklyProgessResponse>(
    `/user/get-weekly-progress/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== HttpStatusCode.Ok) {
    throw new Error("Erro ao buscar progresso semanal");
  }

  return response.data;
}
