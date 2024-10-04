import { View, Text, TouchableOpacity, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  data: {
    name?: string;
    email?: string;
    purchaseDate: string;
    expirationDate: string;
  };
}

export function ConfirmationModal({
  visible,
  onCancel,
  onConfirm,
  data,
}: ConfirmationModalProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center bg-zinc-950/80">
        <LinearGradient
          colors={["#EF0052", "#4E001D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            padding: 1,
            borderRadius: 12,
            marginBottom: 8,
            width: "80%",
          }}
        >
          <View className="bg-[#4F001D] p-6 rounded-xl">
            <Text className="text-lg font-zona-bold text-zinc-100 mb-4">
              Confirmação de Dados
            </Text>
            <Text className="text-zinc-100 font-zona-regular">
              Nome: {data.name}
            </Text>
            <Text className="text-zinc-100 font-zona-regular">
              Email: {data.email}
            </Text>
            <Text className="text-zinc-100 font-zona-regular">
              Data de Compra: {data.purchaseDate}
            </Text>
            <Text className="text-zinc-100 font-zona-regular">
              Data de Expiração: {data.expirationDate}
            </Text>

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="bg-red-500 p-3 rounded-md"
                onPress={onCancel}
              >
                <Text className="text-zinc-100 font-zona-regular">
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-green-500 p-3 rounded-md"
                onPress={onConfirm}
              >
                <Text className="text-zinc-100 font-zona-regular">
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}
