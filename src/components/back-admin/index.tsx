import { Link } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export function BackAdmin() {
  return (
    <Link href="/admin" asChild>
      <TouchableOpacity
        className="w-20 h-16 rounded-full justify-center items-center border-2 border-primary absolute right-[92px] bg-[#940037]"
        accessibilityLabel="Botão Sair"
        accessibilityHint="Clique para sair do painel de administração"
        activeOpacity={0.8}
      >
        <Text className="text-[8px] font-zona-bold text-zinc-100 text-center text-wrap w-12">
          Painel Adm
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
