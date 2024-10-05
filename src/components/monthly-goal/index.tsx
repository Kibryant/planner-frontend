import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Modal, TouchableOpacity, Text, View, TextInput } from "react-native";
import type { MONTHS } from "@/constants/months";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { api } from "@/lib/api";
import Toast from "react-native-toast-message";

interface MonthlyGoalProps {
  MONTH: (typeof MONTHS)[keyof typeof MONTHS];
  monthBr: string;
  selectedMonthEn: (typeof MONTHS)[keyof typeof MONTHS];
  monthlyGoal: string;
  token: string;
  userId: string;
}

export function MonthlyGoal({
  MONTH,
  monthBr,
  selectedMonthEn,
  monthlyGoal,
  token,
  userId,
}: MonthlyGoalProps) {
  const queryClient = useQueryClient();

  const [monthlyGoalText, setMonthlyGoalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const monthlyGoalFormatted =
    monthlyGoal.length > 0
      ? Number(monthlyGoal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : `Clique para adicionar a Meta do mês de ${monthBr}`;

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const mutation = useMutation({
    mutationKey: [`monthly-goal-${selectedMonthEn}`],
    mutationFn: async (monthlyGoal: string) => {
      const response = await api.post(
        "/user/create-or-update-revenue-goal",
        {
          userId,
          monthlyGoal,
          month: selectedMonthEn,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== HttpStatusCode.Ok) {
        throw new Error("Erro ao criar meta mensal");
      }

      return response.data;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Meta mensal atualizada com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: [`revenue-goal-${selectedMonthEn}`],
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar meta mensal",
      });
    },
  });

  const handleSave = () => {
    const sanitizedValue = monthlyGoalText.replace(/[^\d]/g, "");
    const isMonthlyGoalValid = Number(sanitizedValue) > 0;

    if (!isMonthlyGoalValid) {
      Toast.show({
        type: "error",
        text1: "Digite um valor válido",
      });

      return;
    }

    mutation.mutate(sanitizedValue);

    setMonthlyGoalText("");
    closeModal();
  };

  return (
    <>
      <LinearGradient
        colors={["#EF0052", "#4E001D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 1.75,
          borderRadius: 24,
          marginBottom: 8,
        }}
      >
        <TouchableOpacity
          className="bg-[#4F001D] rounded-3xl p-6 text-center"
          onPress={openModal}
        >
          <Text
            className={`font-zona-bold text-[8px] uppercase text-center ${monthlyGoal.length > 0 ? "text-zinc-100" : "text-[#920036]"}`}
          >
            {monthlyGoalFormatted}
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
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
            <View className="bg-[#4F001D] rounded-xl p-6 w-full justify-center items-center h-96">
              <TouchableOpacity
                onPress={closeModal}
                className="absolute top-2 right-2 border border-primary rounded-full p-1"
              >
                <Feather name="x" size={20} color="#fb005d" />
              </TouchableOpacity>

              <Text className="text-zinc-100 text-center font-zona-semibold text-xl">
                {monthlyGoal
                  ? Number(monthlyGoal).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : `Meta do mês de ${monthBr}`}
              </Text>

              <TextInput
                className="bg-[#47001B] rounded-lg w-full px-8 py-3 mt-4 min-w-80 text-zinc-100"
                placeholder="Digite sua meta mensal"
                placeholderTextColor="#DD0354"
                keyboardType="numeric"
                onChangeText={setMonthlyGoalText}
                value={monthlyGoalText}
              />

              <TouchableOpacity
                className="bg-primary rounded-full items-center justify-center w-20 h-20 absolute bottom-2"
                onPress={handleSave}
              >
                <Feather name="check" size={32} color="#f4f4f5" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
}
