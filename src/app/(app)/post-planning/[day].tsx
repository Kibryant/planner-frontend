import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Title } from "@/components/title";
import { Back } from "@/components/back";
import { BottomButton } from "@/components/bottom-button";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { DAYS } from "@/constants/days";
import {
  type CreateDailyTaskSchema,
  createDailyTaskSchema,
} from "@/schema/create-daily-task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDailyTask } from "@/functions/create-daily-task";
import Toast from "react-native-toast-message";
import { getDailyTasksByDay } from "@/functions/get-daily-tasks-by-day";
import type { CompleteDailyTaskSchema } from "@/schema/complete-daily-task-schema";
import { completeDailyTask as completeDailyTaskFunction } from "@/functions/complete-daily-task";
import { useAdminStore } from "@/store/admin-store";
import { TaskCard } from "@/components/task-card";
import { TaskPlaceholder } from "@/components/task-placeholder";

const MAX_TASKS = 5;

export default function PostPlanner() {
  const { day } = useLocalSearchParams();

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
      title: selectedTask?.title ?? "",
      description: selectedTask?.description ?? "",
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

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="flex-1 px-8">
        <Back />

        <Title title={day as string} />

        <View className="flex-1 mt-20">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={() => completeDailyTask({ taskId: task.id })}
              onPress={() =>
                openModal({
                  id: task.id,
                  title: task.title,
                  description: task.description,
                })
              }
            />
          ))}

          {placeholders.map((placeholder, index) => (
            <TaskPlaceholder
              key={`placeholder-${index + 1}`}
              placeholder={placeholder}
              onPress={() => openModal({ title: placeholder, description: "" })}
            />
          ))}
        </View>

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-center items-center bg-black/80">
              <LinearGradient
                colors={["#EF0052", "#4E001D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  padding: 1,
                  borderRadius: 12,
                  marginBottom: 18,
                }}
              >
                <View className="bg-[#4F001D] rounded-xl p-6 w-11/12 justify-center items-center h-96">
                  <TouchableOpacity
                    onPress={closeModal}
                    className="absolute top-2 right-2 border border-primary rounded-full p-1"
                  >
                    <Feather name="x" size={20} color="#fb005d" />
                  </TouchableOpacity>

                  <Text className="text-zinc-100 text-2xl mb-4 font-zona-semibold">
                    {selectedTask?.title}
                  </Text>

                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder={selectedTask?.title || "Título"}
                        placeholderTextColor="#AC0040"
                        className="min-w-full h-12 bg-[#47001B] text-zinc-100 rounded-3xl px-20 mb-3 text-center"
                        accessibilityLabel="Campo de título da tarefa"
                        accessibilityHint="Digite o título da tarefa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        maxLength={50}
                      />
                    )}
                    name="title"
                  />
                  {errors.title && (
                    <Text className="text-red-500 text-sm font-zona-regular">
                      {errors.title.message}
                    </Text>
                  )}

                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder={selectedTask?.description || "Descrição"}
                        placeholderTextColor="#AC0040"
                        className="w-full h-40 bg-[#47001B] text-zinc-100 rounded-3xl px-16 mb-3 min-w-96 max-w-96 text-center"
                        accessibilityLabel="Campo de descrição da tarefa"
                        accessibilityHint="Digite a descrição da tarefa"
                        maxLength={100}
                        multiline
                        textAlignVertical="auto"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="description"
                  />

                  <TouchableOpacity
                    className="bg-primary rounded-full items-center justify-center w-20 h-20"
                    onPress={handleSubmit(onSubmit)}
                  >
                    <Feather name="check" size={32} color="#f4f4f5" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      <View className="mt-10 items-center flex-row justify-center">
        <BottomButton />
      </View>
    </View>
  );
}
