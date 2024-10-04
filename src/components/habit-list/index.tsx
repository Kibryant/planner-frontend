import React from "react";
import { View } from "react-native";
import { CardHabit, type HabitType } from "@/components/card-habit";

interface HabitListProps {
  selectedHabit: HabitType;
}

export function HabitList({ selectedHabit }: HabitListProps) {
  return (
    <View className="flex-1 justify-center mt-10 items-center">
      <CardHabit selectedHabit={selectedHabit} />
    </View>
  );
}
