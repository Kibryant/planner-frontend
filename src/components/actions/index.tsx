import {
  Animated,
  Easing,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { MONTHS } from "@/constants/months";
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import Toast from "react-native-toast-message";
import { isValidJson } from "@/lib/utils";

interface ActionsProps {
  MONTH: (typeof MONTHS)[keyof typeof MONTHS];
  monthBr: string;
  selectedMonthEn: (typeof MONTHS)[keyof typeof MONTHS];
}

interface ActionObject {
  action: string;
  month: (typeof MONTHS)[keyof typeof MONTHS] | null;
}

export function Actions({ MONTH, monthBr, selectedMonthEn }: ActionsProps) {
  const [{ loading, value: actionsString }, setActionsString] = useAsyncStorage(
    `actions-${selectedMonthEn}`,
  );

  const [actions, setActions] = useState<
    [ActionObject, ActionObject, ActionObject, ActionObject]
  >([
    { action: "", month: null },
    { action: "", month: null },
    { action: "", month: null },
    { action: "", month: null },
  ]);

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

  useEffect(() => {
    setActions([
      { action: "", month: null },
      { action: "", month: null },
      { action: "", month: null },
      { action: "", month: null },
    ]);

    setActionText("");
    setActionIndex(null);

    if (actionsString) {
      try {
        const parsedString = JSON.parse(actionsString);

        if (typeof parsedString === "string" && isValidJson(parsedString)) {
          const actionsObject = JSON.parse(parsedString) as [
            ActionObject,
            ActionObject,
            ActionObject,
            ActionObject,
          ];
          setActions(actionsObject);
        } else {
          setActions(parsedString);
        }
      } catch {
        Toast.show({
          type: "error",
          text1: "Erro ao carregar as ações",
          text2: "Tente novamente",
        });
      }
    }
  }, [actionsString]);

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

  const handleAction = (index: number) => {
    setActionIndex(index);
    setActionText(actions[index].action);
    openModal();
  };

  const handleSaveAction = () => {
    if (actionIndex !== null) {
      const newActions: [
        ActionObject,
        ActionObject,
        ActionObject,
        ActionObject,
      ] = [...actions];

      newActions[actionIndex] = { action: actionText, month: MONTH };

      setActions(newActions);

      const actionsString = JSON.stringify(newActions);

      setActionsString(actionsString);

      setModalVisible(false);
    }
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

      <ScrollView>
        {actions.map((action, index) => {
          const hasAction = action.action.length > 0;

          return (
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
              <TouchableOpacity
                key={action.action}
                className="bg-[#4F001D] rounded-xl p-6"
                onPress={() => handleAction(index)}
              >
                <Text
                  className={`text-center font-zona-regular text-xs ${hasAction ? "text-zinc-100" : "text-[#920036]"}`}
                >
                  {hasAction
                    ? action.action
                    : `Clique para adicionar sua ação ${index + 1}`}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          );
        })}
      </ScrollView>

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
                className="bg-primary rounded-full items-center justify-center w-20 h-20 absolute bottom-1"
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
