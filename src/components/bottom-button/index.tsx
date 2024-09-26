import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function BottomButton() {
  return (
    <View className="mt-10 items-center">
      <TouchableOpacity
        className="bg-primary border-2 border-zinc-100 w-16 h-16 rounded-full justify-center items-center"
        accessibilityLabel="Botão Home"
        accessibilityHint="Clique para voltar para o menu principal"
        activeOpacity={0.8}
      >
        <Ionicons name="home" size={32} color="#f4f4f5" />
      </TouchableOpacity>
    </View>
  );
}
