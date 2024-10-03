import React from "react";
import { View } from "react-native";
import { CardHabit } from "@/components/card-habit";

export function HabitList() {
  return (
    <View className="flex-1 justify-center mt-10 items-center">
      <CardHabit />
    </View>
  );
}
