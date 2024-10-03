import { api } from "@/lib/api";
import type {
  DAYS,
  GetDailyTasksByDaySchema,
} from "@/schema/get-daily-tasks-by-day-schema";
import { HttpStatusCode } from "axios";

export type GetDailyTasksByDayParams = GetDailyTasksByDaySchema & {
  token: string;
};

export type GetDailyTasksByDayResponse = {
  userId: string;
  day: (typeof DAYS)[keyof typeof DAYS];
  title: string;
  description: string;
  id: number;
  completed: boolean;
}[];

export type GetDailyTasksByDayResponseAxios = {
  dailyTasks: GetDailyTasksByDayResponse;
};

export async function getDailyTasksByDay({
  token,
  day,
  userId,
}: GetDailyTasksByDayParams): Promise<GetDailyTasksByDayResponse> {
  const response = await api.get<GetDailyTasksByDayResponseAxios>(
    `/user/get-daily-tasks-by-day?userId=${userId}&day=${day}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== HttpStatusCode.Ok) {
    throw new Error("Erro ao buscar tarefas diárias");
  }

  const { dailyTasks } = response.data;

  return dailyTasks;
}
