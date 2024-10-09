import {
  Animated,
  Easing,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { MONTHS } from "@/constants/months";
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { api } from "@/lib/api";

interface ActionsProps {
  MONTH: (typeof MONTHS)[keyof typeof MONTHS];
  monthBr: string;
  selectedMonthEn: (typeof MONTHS)[keyof typeof MONTHS];
  token: string;
  userId: string;
  actions: string[];
}

export function Actions({
  MONTH,
  monthBr,
  selectedMonthEn,
  userId,
  token,
  actions,
}: ActionsProps) {
  const queryClient = useQueryClient();

  const [modalVisible, setModalVisible] = useState(false);
  const [actionIndex, setActionIndex] = useState<number | null>(null);
  const [actionText, setActionText] = useState("");

  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -4,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceValue]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const mutation = useMutation({
    mutationKey: [`actions-${selectedMonthEn}`],
    mutationFn: async (action: string) => {
      const response = await api.post(
        "/user/create-or-update-revenue-goal",
        {
          userId,
          action,
          month: selectedMonthEn,
          actionIndex,
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
      queryClient.invalidateQueries({
        queryKey: [`revenue-goal-${selectedMonthEn}`],
      });

      Toast.show({
        type: "success",
        text1: "Meta diária atualizada",
        position: "bottom",
      });

      closeModal();
      setActionIndex(null);
      setActionText("");
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar meta diária",
        position: "bottom",
      });
    },
  });

  const handleAction = (index: number) => {
    setActionIndex(index);
    setActionText(actions[index] || "");
    openModal();
  };

  const handleSaveAction = () => {
    if (!actionText) {
      Toast.show({
        type: "error",
        text1: "Ação não pode ser vazia",
        position: "top",
      });

      return;
    }

    mutation.mutate(actionText);
  };

  return (
    <>
      <View className="justify-center items-center mb-2">
        <Text className="text-zinc-100 text-center font-zona-bold">
          Defina 4 ações que você fará para atingir a meta de pacotes vendidos
        </Text>

        <Animated.View style={{ transform: [{ translateY: bounceValue }] }}>
          <Feather name="chevron-down" size={24} color="#FF005E" />
        </Animated.View>
      </View>

      {actions.length < 4 && (
        <Pressable
          onPress={() => handleAction(actions.length)}
          className="bg-[#4F001D] rounded-xl p-6 mb-2"
        >
          <Text className="text-center font-zona-regular text-xs text-[#920036]">
            Clique para adicionar sua ação {actions.length + 1}
          </Text>
        </Pressable>
      )}

      {actions.length > 0 &&
        actions.map((action, index) => (
          <LinearGradient
            colors={["#EF0052", "#4E001D"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 1,
              borderRadius: 12,
              marginBottom: 8,
            }}
            key={`action-${index + 1}`}
          >
            <Pressable
              className="bg-[#4F001D] rounded-xl p-6"
              onPress={() => handleAction(index)}
            >
              <Text
                className={`text-center font-zona-regular text-xs ${
                  action ? "text-zinc-100" : "text-[#920036]"
                }`}
              >
                {action
                  ? action
                  : `Clique para adicionar sua ação ${index + 1}`}
              </Text>
            </Pressable>
          </LinearGradient>
        ))}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
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

              <Text className="text-zinc-100 text-center font-zona-bold text-lg">
                {`Ação ${actionIndex !== null ? actionIndex + 1 : ""}`}
              </Text>

              <TextInput
                className="bg-[#47001B] rounded-lg w-full px-8 py-3 mt-4 min-w-80 text-zinc-100"
                placeholder="Digite sua ação"
                placeholderTextColor="#DD0354"
                maxLength={50}
                value={actionText}
                onChangeText={setActionText}
              />

              <TouchableOpacity
                className="bg-primary rounded-full items-center justify-center w-20 h-20 absolute bottom-2"
                onPress={handleSaveAction}
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
