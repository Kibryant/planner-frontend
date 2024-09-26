import { View, Text } from "react-native";

interface ProgessBarProps {
  value: number;
}

export function ProgessBar({ value }: ProgessBarProps) {
  return (
    <View className="p-5 flex items-center border border-primary rounded-full max-w-[178px] bg-primary/30">
      <Text className="text-zinc-100 font-zona-semibold mb-2 text-sm">
        Progresso da semana
      </Text>
      <View className="w-full flex-row items-center justify-between">
        <View
          className="h-2 bg-primary rounded-full"
          style={{ width: `${value}%` }}
        />
        <Text className="text-zinc-100 text-center font-zona-semibold">
          {value}%
        </Text>
      </View>
    </View>
  );
}
