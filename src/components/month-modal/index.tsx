import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";

interface MonthModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onSelectMonth: (
    month:
      | "janeiro"
      | "fevereiro"
      | "março"
      | "abril"
      | "maio"
      | "junho"
      | "julho"
      | "agosto"
      | "setembro"
      | "outubro"
      | "novembro"
      | "dezembro",
  ) => void;
  months: readonly [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
}

export function MonthModal({
  modalVisible,
  setModalVisible,
  onSelectMonth,
  months,
}: MonthModalProps) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/80">
        <View className="bg-[#4F001D] rounded-2xl p-6 w-4/5">
          <Text className="text-zinc-100 text-lg font-zona-semibold mb-4">
            Selecione o Mês
          </Text>

          <ScrollView>
            {months.map((month) => (
              <TouchableOpacity
                key={month}
                className="p-4 border-b border-zinc-300"
                onPress={() => onSelectMonth(month)}
              >
                <Text className="text-zinc-100 text-lg capitalize font-zona-regular">
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            className="mt-4 bg-primary rounded-full py-3"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-zinc-100 text-center font-zona-regular">
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
