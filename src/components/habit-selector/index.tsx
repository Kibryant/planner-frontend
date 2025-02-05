import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { HabitType } from "@/types/habit-type";
import { useTranslation } from "react-i18next";

interface HabitSelectorProps {
  selectedHabit: string;
  onSelectHabit: (habit: HabitType) => void;
}

const HABIT_TYPES = ["Diário", "Semanal", "Mensal"] as const;

export function HabitSelector({
  selectedHabit,
  onSelectHabit,
}: HabitSelectorProps) {
    const { t } = useTranslation();
  return (
    <View className="flex-row justify-center mt-10">
      <View className="flex-row justify-between items-center w-[300px] mt-5 bg-[#FF005E4F] rounded-full px-2 py-1.5">
        {HABIT_TYPES.map((habit) => (
          <TouchableOpacity
            key={habit}
            className={`${habit === "Semanal" ? "flex-1 mx-[3px]" : "px-4"} py-[16px] ${
              selectedHabit === habit ? "bg-primary" : "bg-[#3D0016]"
            } rounded-full`}
            onPress={() => onSelectHabit(habit)}
          >
            <Text className="text-zinc-100 font-zona-semibold text-center">
              {t(habit)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
