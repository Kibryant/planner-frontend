import React from "react";
import { View } from "react-native";
import { CardHabit } from "@/components/card-habit";
import type { HabitType } from "@/types/habit-type";

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
