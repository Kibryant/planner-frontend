import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Modal, TouchableOpacity, Text, View, TextInput } from "react-native";
import type { MONTHS } from "@/constants/months";
import { Feather } from "@expo/vector-icons";
import { isValidJson } from "@/lib/utils";
import Toast from "react-native-toast-message";

interface DailyGoalProps {
  MONTH: (typeof MONTHS)[keyof typeof MONTHS];
  monthBr: string;
  selectedMonthEn: (typeof MONTHS)[keyof typeof MONTHS];
}

interface DailyGoalObject {
  dailyGoal: string;
  month: (typeof MONTHS)[keyof typeof MONTHS];
}

export function DailyGoal({ MONTH, monthBr, selectedMonthEn }: DailyGoalProps) {
  const [{ loading, value: dailyGoalString }, setDailyGoalString] =
    useAsyncStorage(`dailyGoal-${selectedMonthEn}`);

  const [dailyGoalText, setDailyGoalText] = useState("");
  const [dailyGoal, setDailyGoal] = useState<DailyGoalObject | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setDailyGoal(null);
    setDailyGoalText("");

    if (dailyGoalString) {
      try {
        const parsedString = JSON.parse(dailyGoalString);

        if (typeof parsedString === "string" && isValidJson(parsedString)) {
          const dailyGoalObject = JSON.parse(parsedString) as DailyGoalObject;
          setDailyGoal(dailyGoalObject);
          setDailyGoalText(dailyGoalObject.dailyGoal);
        } else {
          setDailyGoal(parsedString);
          setDailyGoalText(parsedString.dailyGoal);
        }
      } catch {
        Toast.show({
          type: "error",
          text1: "Erro ao carregar a meta diária",
          text2: "Tente novamente",
        });
      }
    }
  }, [dailyGoalString]);

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

  const handleSaveDailyGoal = () => {
    const dailyGoalTextToNumber = Number(dailyGoalText);

    if (Number.isNaN(dailyGoalTextToNumber)) {
      Toast.show({
        type: "error",
        text1: "Erro ao salvar a meta mensal",
        text2: "Digite um valor válido",
      });

      return;
    }
    const dailyGoalObject: DailyGoalObject = {
      dailyGoal: dailyGoalText,
      month: MONTH,
    };

    const dailyGoalString = JSON.stringify(dailyGoalObject);

    setDailyGoalString(dailyGoalString);
    setModalVisible(false);
  };

  const dailyGoalFormated = dailyGoal?.dailyGoal
    ? Number(dailyGoal.dailyGoal).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "Clique para adicionar uma meta diária";

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
            className={`font-zona-bold text-xs uppercase text-center ${dailyGoal?.dailyGoal ? "text-zinc-100" : "text-[#920036]"}`}
          >
            {dailyGoalFormated}
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
                {dailyGoal?.dailyGoal
                  ? "Edite sua meta diária"
                  : "Adicione sua meta diária"}
              </Text>

              <TextInput
                className="bg-[#47001B] rounded-lg w-full px-8 py-3 mt-4 min-w-80 text-zinc-100 text-center"
                placeholder="Digite sua meta diária"
                placeholderTextColor="#DD0354"
                value={dailyGoalText}
                onChangeText={setDailyGoalText}
              />

              <TouchableOpacity
                className="bg-primary rounded-full items-center justify-center w-20 h-20 absolute bottom-1"
                onPress={handleSaveDailyGoal}
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
