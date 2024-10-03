import { api } from "@/lib/api";
import type { CompleteDailyTaskSchema } from "@/schema/complete-daily-task-schema";
import { HttpStatusCode } from "axios";

type CompleteDailyTaskSchemaWithToken = CompleteDailyTaskSchema & {
  token: string;
  userId: string;
};

export async function completeDailyTask({
  userId,
  token,
  taskId,
}: CompleteDailyTaskSchemaWithToken): Promise<void> {
  const response = await api.post(
    "/user/complete-daily-task",
    {
      userId,
      taskId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== HttpStatusCode.Ok) {
    throw new Error("Erro ao completar tarefa diária");
  }
}
