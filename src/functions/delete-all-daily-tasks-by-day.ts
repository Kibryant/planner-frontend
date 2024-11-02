import { api } from "@/lib/api";
import { HttpStatusCode } from "axios";
import { DAYS_TYPE } from "@/constants/days";

interface DeleteAllDailyTasksProps {
  userId: string;
  token: string;
  day: DAYS_TYPE;
}

export async function deleteAllDailyTasks({
  userId,
  token,
  day,
}: DeleteAllDailyTasksProps): Promise<void> {
  const response = await api.delete(
    `/user/delete-all-daily-tasks-by-day?userId=${userId}&day=${day}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== HttpStatusCode.Ok) {
    throw new Error("Erro ao deletar todas as tarefas diárias");
  }
}
