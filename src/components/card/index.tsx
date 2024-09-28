import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { type Href, Link } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

interface CardProps {
  href: Href;
  text: string;
  iconHeader: string;
  iconFooter: string;
}

export function Card({ href, text, iconHeader, iconFooter }: CardProps) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity
        className="bg-[#4F001D] w-[49%] h-44 p-4 rounded-xl"
        accessibilityLabel="Planejamento das postagens"
        accessibilityHint="Clique para acessar o planejamento das postagens"
        activeOpacity={0.8}
      >
        <View className="bg-[#3D0016] h-[48px] w-[56px] rounded-xl justify-center items-center mr-4 absolute top-2 left-2">
          <Feather name={iconHeader} size={24} color="#FF005E" />
        </View>
        <View className="flex-1 max-w-32 flex-row justify-start items-center gap-x-2 mt-10">
          <FontAwesome5 name={iconFooter} size={24} color="#FF005E" />
          <Text className="text-zinc-100 font-zona-semibold text-left text-[14px] ">
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
