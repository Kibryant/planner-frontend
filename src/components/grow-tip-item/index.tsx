import React from "react";
import { View, Text } from "react-native";

interface TipItemProps {
  id: number;
  text: string;
}

export function TipItem({ id, text }: TipItemProps) {
  return (
    <View className="flex-row items-center gap-x-3 bg-[#4F001D] rounded-lg p-4 mb-2">
      <View className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center">
        <Text className="text-zinc-100 text-4xl font-zona-bold">{id}</Text>
      </View>
      <Text className="text-zinc-100 flex-1 font-zona-semibold text-left">
        {text}
      </Text>
    </View>
  );
}
