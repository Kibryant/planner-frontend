import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";

interface ProgessBarProps {
  value: number;
}

export function ProgessBar({ value }: ProgessBarProps) {
  return (
    <LinearGradient
      colors={["#EF0052", "#4E001D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        padding: 1,
        borderRadius: 999,
        height: 96,
        width: 200,
      }}
    >
      <View className="flex-1 items-center justify-center rounded-full bg-[#46001A] p-4">
        <Text className="text-zinc-100 font-zona-semibold mb-2 text-sm">
          Progresso da semana
        </Text>
        <View className="w-full flex-row items-center justify-between">
          <View className="h-2.5 bg-[#3C0016] rounded-full w-full flex-row items-center justify-between">
            <View
              className="h-2.5 bg-primary rounded-full"
              style={{ width: `${value}%` }}
            />
            <Text className="text-zinc-100 text-center font-zona-semibold text-[8px] absolute right-2">
              {value.toFixed(0)}%
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
