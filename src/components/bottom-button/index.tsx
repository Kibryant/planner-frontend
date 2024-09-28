import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BottomButtonProps {
  isHome?: boolean;
}

export function BottomButton({ isHome }: BottomButtonProps) {
  return (
    <View className="mt-10 items-center">
      <TouchableOpacity
        className={`bg-primary w-16 h-16 rounded-full justify-center items-center ${isHome && "border border-zinc-100"}`}
        accessibilityLabel="Botão Home"
        accessibilityHint="Clique para voltar para o menu principal"
        activeOpacity={0.8}
      >
        <Ionicons
          name="home"
          size={32}
          color={`${isHome ? "#f4f4f5" : "#940037"}`}
        />
      </TouchableOpacity>
    </View>
  );
}
