import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateUserSchema,
  createUserSchema,
} from "@/schema/create-user-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useAdminStore } from "@/store/admin-store";
import { api } from "@/lib/api";
import { DatePickerModal } from "../date-picker-modal";
import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export function AddUserForm() {
  const token = useAdminStore((state) => state.admin?.token);
  const queryClient = useQueryClient();
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: CreateUserSchema) => {
      const expirationDate = new Date(
        new Date(date).setFullYear(new Date(date).getFullYear() + 1),
      );

      return api.post(
        "/admin/create-user",
        {
          ...data,
          purchaseDate: date,
          expirationDate: expirationDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Usuário adicionado com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Erro ao adicionar usuário",
        text2: "Tente novamente",
      });
    },
  });

  const onSubmit = (data: CreateUserSchema) => {
    mutation.mutate(data);
  };

  return (
    <View className="flex-col items-center gap-y-4 w-full">
      <View className="w-full">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              className="w-full p-4 border border-zinc-300 rounded-md mb-2 font-zona-regular"
              placeholder="Nome do Usuário"
              accessibilityLabel="Nome"
              placeholderTextColor="#ccc"
              style={{ color: "#f3f4f6", fontSize: 12 }}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text className="text-red-500">{errors.name.message}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              className="w-full p-4 border border-zinc-300 rounded-md mb-2 font-zona-regular"
              placeholder="Email do Usuário"
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email"
              placeholderTextColor="#ccc"
              style={{ color: "#f3f4f6", fontSize: 12 }}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text className="text-red-500">{errors.email.message}</Text>
        )}
        <View className="w-full gap-y-2">
          <TouchableOpacity
            className="w-full rounded-md p-4 border border-primary"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className="text-center text-zinc-100 font-zona-bold">
              Selecionar a data de compra
            </Text>
            <Text className="text-center text-zinc-100 font-zona-bold">
              {date.toLocaleDateString("pt-br")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-full mb-4 rounded-md gap-y-2 items-center">
        {showDatePicker && (
          <DatePickerModal date={date} onChangeDate={onChangeDate} />
        )}

        <TouchableOpacity
          className="w-full bg-primary rounded-md p-4"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-center text-zinc-100 font-zona-bold">
            Adicionar Usuário
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
