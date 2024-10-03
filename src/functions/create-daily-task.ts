import { api } from "@/lib/api";
import type { CreateDailyTaskSchema } from "@/schema/create-daily-task-schema";
import type { DAYS } from "@/constants/days";
import { HttpStatusCode } from "axios";

type CreateDailyTaskSchemaBody = CreateDailyTaskSchema & {
  id: number | undefined;
  day: (typeof DAYS)[keyof typeof DAYS];
  userId: string;
  token: string;
};

export async function createDailyTask(
  data: CreateDailyTaskSchemaBody,
): Promise<void> {
  const response = await api.post("/user/create-daily-task", data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  if (response.status !== HttpStatusCode.Created) {
    throw new Error("Erro ao criar tarefa diária");
  }
}
