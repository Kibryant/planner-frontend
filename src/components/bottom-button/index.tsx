import { TouchableOpacity } from "react-native";
import { HomeIcon } from "../icons/home-icon";

interface BottomButtonProps {
  isHome?: boolean;
}

export function BottomButton({ isHome }: BottomButtonProps) {
  return (
    <TouchableOpacity
      className={`bg-primary w-16 h-16 rounded-full justify-center items-center ${isHome && "border-4 border-primary bg-zinc-100"}`}
      accessibilityLabel="Botão Home"
      accessibilityHint="Clique para voltar para o menu principal"
      activeOpacity={0.8}
    >
      <HomeIcon
        fill={isHome ? "#FF005E" : "#940037"}
        className={`w-8 h-8 ${isHome ? "text-[#FF005E]" : "text-[#940037]"} `}
      />
    </TouchableOpacity>
  );
}
