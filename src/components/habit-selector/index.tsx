import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface HabitSelectorProps {
  selectedHabit: string;
  onSelectHabit: (habit: string) => void;
}

export function HabitSelector({
  selectedHabit,
  onSelectHabit,
}: HabitSelectorProps) {
  return (
    <View className="flex-row justify-center mt-10">
      <View className="flex-row justify-between w-80 mt-5 bg-[#FF005E4F] rounded-full px-3 py-3">
        {["Diário", "Semanal", "Mensal"].map((habit) => (
          <TouchableOpacity
            key={habit}
            className={`px-4 py-5 ${
              selectedHabit === habit ? "bg-primary" : "bg-[#3D0016]"
            } rounded-full`}
            onPress={() => onSelectHabit(habit)}
          >
            <Text className="text-zinc-100 font-zona-semibold">{habit}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
