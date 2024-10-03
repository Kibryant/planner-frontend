import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Modal, TouchableOpacity, Text, View, TextInput } from "react-native";
import type { MONTHS } from "@/constants/months";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { isValidJson } from "@/lib/utils";

interface MonthlyGoalProps {
  MONTH: (typeof MONTHS)[keyof typeof MONTHS];
  monthBr: string;
  selectedMonthEn: (typeof MONTHS)[keyof typeof MONTHS];
}

interface MonthlyGoalObject {
  monthlyGoal: string;
  month: (typeof MONTHS)[keyof typeof MONTHS];
}

export function MonthlyGoal({
  MONTH,
  monthBr,
  selectedMonthEn,
}: MonthlyGoalProps) {
  const [{ loading, value: monthlyGoalString }, setMonthlyGoalString] =
    useAsyncStorage(`monthlyGoal-${selectedMonthEn}`);
  const [monthlyGoalText, setMonthlyGoalText] = useState("");
  const [monthlyGoal, setMonthlyGoal] = useState<MonthlyGoalObject | null>(
    null,
  );

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setMonthlyGoal(null);
    setMonthlyGoalText("");

    if (monthlyGoalString) {
      try {
        const parsedString = JSON.parse(monthlyGoalString);

        if (typeof parsedString === "string" && isValidJson(parsedString)) {
          const monthlyGoalObject = JSON.parse(
            parsedString,
          ) as MonthlyGoalObject;
          setMonthlyGoal(monthlyGoalObject);
          setMonthlyGoalText(monthlyGoalObject.monthlyGoal);
        } else {
          setMonthlyGoal(parsedString);
          setMonthlyGoalText(parsedString.monthlyGoal);
        }
      } catch {
        Toast.show({
          type: "error",
          text1: "Erro ao carregar a meta mensal",
          text2: "Tente novamente",
        });
      }
    }
  }, [monthlyGoalString]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-zinc-100">Carregando...</Text>
      </View>
    );
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSaveMonthlyGoal = () => {
    const monthlyGoalTextToNumber = Number(monthlyGoalText);

    if (Number.isNaN(monthlyGoalTextToNumber)) {
      Toast.show({
        type: "error",
        text1: "Erro ao salvar a meta mensal",
        text2: "Digite um valor válido",
      });

      return;
    }

    const monthlyGoalObject: MonthlyGoalObject = {
      monthlyGoal: monthlyGoalText,
      month: selectedMonthEn,
    };

    const monthlyGoalString = JSON.stringify(monthlyGoalObject);

    setMonthlyGoalString(monthlyGoalString);
    setModalVisible(false);
  };

  const monthlyGoalFormatted = monthlyGoal?.monthlyGoal
    ? Number(monthlyGoal.monthlyGoal).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "Clique para adicionar uma meta mensal";

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
            className={`font-zona-bold text-xs uppercase text-center ${monthlyGoal?.monthlyGoal ? "text-zinc-100" : "text-[#920036]"}`}
          >
            {monthlyGoalFormatted}
          </Text>
        </TouchableOpacity>
      </LinearGradient>

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

              <Text className="text-zinc-100 text-center font-zona-semibold text-xl">
                {monthlyGoal?.monthlyGoal
                  ? Number(monthlyGoal.monthlyGoal).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : `Meta do mês de ${monthBr}`}
              </Text>

              <TextInput
                className="bg-[#47001B] rounded-lg w-full px-8 py-3 mt-4 min-w-80 text-zinc-100"
                placeholder="Digite sua meta mensal"
                placeholderTextColor="#DD0354"
                onChangeText={setMonthlyGoalText}
                value={monthlyGoalText}
              />

              <TouchableOpacity
                className="bg-primary rounded-full items-center justify-center w-20 h-20 absolute bottom-1"
                onPress={handleSaveMonthlyGoal}
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
