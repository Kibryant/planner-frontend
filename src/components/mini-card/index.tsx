import { type Href, Link } from "expo-router";
import type { ElementType } from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface MiniCardProps {
  action?: () => void;
  href?: Href;
  text: string;
  IconHeader: ElementType;
}

export function MiniCard({ href, text, IconHeader, action }: MiniCardProps) {
  if (action) {
    return (
      <TouchableOpacity
        className="flex flex-row bg-[#4F001D] w-[49%] p-4 rounded-xl justify-center items-center"
        accessibilityLabel="Planejamento das postagens"
        accessibilityHint="Clique para acessar o planejamento das postagens"
        activeOpacity={0.8}
        onPress={action}
      >
        <View className="bg-[#3D0016] h-[32px] w-[32px] rounded-xl justify-center items-center mr-4">
          <IconHeader />
        </View>

        <View className="flex-1 max-w-32 flex-row justify-start items-center">
          <Text className="text-zinc-100 font-zona-semibold text-left text-[14px] ">
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Link href={href || "/"} asChild>
      <TouchableOpacity
        className="flex flex-row bg-[#4F001D] w-[49%] p-4 rounded-xl justify-center items-center"
        accessibilityLabel="Planejamento das postagens"
        accessibilityHint="Clique para acessar o planejamento das postagens"
        activeOpacity={0.8}
      >
        <View className="bg-[#3D0016] h-[32px] w-[32px] rounded-xl justify-center items-center mr-4">
          <IconHeader />
        </View>

        <View className="flex-1 max-w-32 flex-row justify-start items-center">
          <Text className="text-zinc-100 font-zona-semibold text-left text-[14px] ">
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
