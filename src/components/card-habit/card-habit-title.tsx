import React from "react";
import { Text, View } from "react-native";

interface CardHabitTitleProps {
  title?: string;
}

export function CardHabitTitle({ title }: CardHabitTitleProps) {
  return (
    <View style={{ padding: 24 }}>
      <Text className="text-zinc-100 text-2xl font-zona-regular max-w-68">
        {title}
      </Text>
    </View>
  );
}
