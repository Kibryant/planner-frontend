import { type Href, Link } from "expo-router";
import type { ElementType } from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface CardProps {
  href: Href;
  text: string;
  IconHeader: ElementType;
}

export function Card({ href, text, IconHeader }: CardProps) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity
        className="bg-[#4F001D] w-[49%] h-44 p-4 rounded-xl"
        accessibilityLabel="Planejamento das postagens"
        accessibilityHint="Clique para acessar o planejamento das postagens"
        activeOpacity={0.8}
      >
        <View className="bg-[#3D0016] h-[48px] w-[49px] rounded-xl justify-center items-center mr-4 absolute top-2 left-2">
          <IconHeader />
        </View>
        <View className="flex-1 max-w-32 flex-row justify-start items-center gap-x-2 mt-10">
          <Text className="text-zinc-100 font-zona-semibold text-left text-[14px] ">
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
