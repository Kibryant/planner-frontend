import { useState } from "react";
import { DAYS } from "@/constants/days";
import {
  type CreateDailyTaskSchema,
  createDailyTaskSchema,
} from "@/schema/create-daily-task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDailyTask } from "@/functions/create-daily-task";
import Toast from "react-native-toast-message";
import { getDailyTasksByDay } from "@/functions/get-daily-tasks-by-day";
import type { CompleteDailyTaskSchema } from "@/schema/complete-daily-task-schema";
import { completeDailyTask as completeDailyTaskFunction } from "@/functions/complete-daily-task";
import { useAdminStore } from "@/store/admin-store";
import { deleteAllDailyTasks } from "@/functions/delete-all-daily-tasks-by-day";
import { MAX_TASKS } from "@/constants/max-tasks";

interface UsePostPlannerProps {
  day: string;
}

export const usePostPlanner = ({ day }: UsePostPlannerProps) => {
  const queryClient = useQueryClient();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{
    id?: number;
    title: string;
    description: string;
  } | null>(null);

  const { user, token } = useUserStore();

  const admin = useAdminStore((state) => state.admin);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateDailyTaskSchema>({
    resolver: zodResolver(createDailyTaskSchema),
    defaultValues: {
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
    },
  });

  const DAY = DAYS[day as keyof typeof DAYS];

  const openModal = (task: {
    id?: number;
    title: string;
    description: string;
  }) => {
    setModalVisible(true);
    setSelectedTask(task);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const { data: tasks = [] } = useQuery({
    queryKey: [`get-daily-tasks-by-day-${DAY}`],
    queryFn: () =>
      getDailyTasksByDay({
        day: DAY,
        userId: user?.id || admin?.admin.id || "",
        token: token || admin?.token || "",
      }),
  });

  const mutation = useMutation({
    mutationKey: ["create-daily-task"],
    mutationFn: createDailyTask,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Tarefa criada com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-daily-tasks-by-day-${DAY}`],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-weekly-progress"],
      });
    },
    onError: (error) => {
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Erro ao criar tarefa",
        text2: "Tente novamente",
      });
    },
  });

  const mutationComplete = useMutation({
    mutationKey: ["complete-daily-task"],
    mutationFn: completeDailyTaskFunction,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Tarefa atualizada com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-daily-tasks-by-day-${DAY}`],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-weekly-progress"],
      });
    },
    onError: (error) => {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Erro ao completar tarefa",
        text2: "Tente novamente",
      });
    },
  });

  const mutationDelete = useMutation({
    mutationKey: ["delete-all-daily-tasks"],
    mutationFn: deleteAllDailyTasks,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Tarefas deletadas com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: [`get-daily-tasks-by-day-${DAY}`],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-weekly-progress"],
      });
    },
    onError: (error) => {
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Erro ao deletar tarefas",
        text2: "Tente novamente",
      });
    },
  });

  const placeholders = Array.from(
    { length: MAX_TASKS - tasks.length },
    (_, index) => `Tarefa ${index + tasks.length + 1}`,
  );

  const onSubmit = (data: CreateDailyTaskSchema) => {
    mutation.mutate({
      ...data,
      day: DAY,
      userId: user?.id || admin?.admin.id || "",
      token: token ?? admin?.token ?? "",
      id: selectedTask?.id,
    });

    reset();
    closeModal();
  };

  const completeDailyTask = ({ taskId }: CompleteDailyTaskSchema) => {
    if (mutationComplete.isPending) {
      Toast.show({
        type: "info",
        text1: "Aguarde a conclusão da tarefa anterior",
      });
    }

    mutationComplete.mutate({
      taskId,
      userId: user?.id || admin?.admin.id || "",
      token: token || admin?.token || "",
    });
  };

  const handleDeleteAllDailyTasks = () => {
    mutationDelete.mutate({
      userId: user?.id || admin?.admin.id || "",
      token: token || admin?.token || "",
      day: DAY,
    });
  };

  return {
    control,
    handleSubmit,
    errors,
    modalVisible,
    selectedTask,
    openModal,
    closeModal,
    mutation,
    mutationComplete,
    mutationDelete,
    placeholders,
    tasks,
    onSubmit,
    completeDailyTask,
    handleDeleteAllDailyTasks,
  };
};
