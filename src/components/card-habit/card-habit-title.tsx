import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

interface CardHabitTitleProps {
  title: string;
}

export function CardHabitTitle({ title }: CardHabitTitleProps) {
    const { t } = useTranslation();

  return (
    <View style={{ padding: 24 }}>
      <Text className="text-zinc-100 text-2xl font-zona-regular max-w-68">
        {t(title)}
      </Text>
    </View>
  );
}
