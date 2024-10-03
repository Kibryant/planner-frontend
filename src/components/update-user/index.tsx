import { api } from "@/lib/api";
import { updateUserSchema } from "@/schema/update-user";
import type { UpdateUserSchema } from "@/schema/update-user";
import { useAdminStore } from "@/store/admin-store";
import type { User } from "@/store/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface UpdateUserProps {
  user: User;
  showModal: boolean;
  closeModal: () => void;
}

export function UpdateUser({ user, showModal, closeModal }: UpdateUserProps) {
  const token = useAdminStore((state) => state.admin?.token);

  const [isPurchaseDatePickerVisible, setPurchaseDatePickerVisibility] =
    useState(false);
  const [isExpirationDatePickerVisible, setExpirationDatePickerVisibility] =
    useState(false);
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(
    new Date(user.purchaseDate),
  );
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(
    new Date(user.expirationDate),
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const updateUser = async ({ name, email }: UpdateUserSchema) => {
    try {
      const response = await api.put(
        `/admin/update-user/${user.id}`,
        {
          name,
          email,
          purchaseDate,
          expirationDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== HttpStatusCode.Ok) {
        throw new Error("Erro ao atualizar o usuário");
      }
    } catch (error) {
      console.log(error);

      throw new Error("Erro ao atualizar o usuário");
    }
  };

  const mutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: updateUser,
    onSuccess: () => {
      closeModal();
      Toast.show({
        type: "success",
        text1: "Usuário atualizado com sucesso",
      });
    },
    onError: () => {
      closeModal();
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar usuário",
        text2: "Tente novamente",
      });
    },
  });

  const editUser: SubmitHandler<UpdateUserSchema> = (data) => {
    mutation.mutate(data);
  };

  const showPurchaseDatePicker = () => {
    setPurchaseDatePickerVisibility(true);
  };

  const hidePurchaseDatePicker = () => {
    setPurchaseDatePickerVisibility(false);
  };

  const handlePurchaseDateConfirm = (date: Date) => {
    setPurchaseDate(date);

    const oneYearLater = new Date(date);
    oneYearLater.setFullYear(date.getFullYear() + 1);

    setExpirationDate(oneYearLater);

    hidePurchaseDatePicker();
  };

  const showExpirationDatePicker = () => {
    setExpirationDatePickerVisibility(true);
  };

  const hideExpirationDatePicker = () => {
    setExpirationDatePickerVisibility(false);
  };

  const handleExpirationDateConfirm = (date: Date) => {
    setExpirationDate(date);
    hideExpirationDatePicker();
  };

  return (
    <View className="absolute top-4 right-4">
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-zinc-900/90">
          <View className="bg-[#4F001D] shadow-lg rounded-3xl w-11/12 max-w-lg p-6">
            <Text className="text-2xl font-bold text-center mb-6 text-zinc-100 font-zona-bold">
              Editar usuário
            </Text>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Nome"
                  className="border border-zinc-300 rounded-xl p-3 w-full mb-4 text-zinc-100 font-zona-regular"
                  placeholderTextColor="#9CA3AF"
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Email"
                  className="border border-zinc-300 rounded-xl p-3 w-full mb-4 text-zinc-100 font-zona-regular placeholder-zinc-400"
                  placeholderTextColor="#9CA3AF"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </Text>
            )}

            {/* Seletor de Data de Compra */}
            <TouchableOpacity
              onPress={showPurchaseDatePicker}
              className="border border-zinc-300 rounded-xl p-3 w-full mb-4"
            >
              <Text className="text-zinc-100 font-zona-regular">
                {purchaseDate
                  ? purchaseDate.toLocaleDateString("pt-br")
                  : "Selecionar Data de Compra"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isPurchaseDatePickerVisible}
              mode="date"
              onConfirm={handlePurchaseDateConfirm}
              onCancel={hidePurchaseDatePicker}
            />

            {/* Seletor de Data de Expiração */}
            <TouchableOpacity
              onPress={showExpirationDatePicker}
              className="border border-zinc-300 rounded-xl p-3 w-full mb-4"
            >
              <Text className="text-zinc-100 font-zona-regular">
                {expirationDate
                  ? expirationDate.toLocaleDateString("pt-br")
                  : "Selecionar Data de Expiração"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isExpirationDatePickerVisible}
              mode="date"
              onConfirm={handleExpirationDateConfirm}
              onCancel={hideExpirationDatePicker}
            />

            <TouchableOpacity
              onPress={handleSubmit(editUser)}
              disabled={isLoading}
              className={`bg-primary rounded-xl p-3 mt-4 ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
            >
              <Text className="text-white text-center text-lg font-zona-regular">
                {isLoading ? "Salvando..." : "Editar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={closeModal}
              className="border border-zinc-300 rounded-xl p-3 mt-2"
            >
              <Text className="text-zinc-100 font-zona-regular text-center text-lg">
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
