import { TouchableOpacity, View, Text } from "react-native";

interface MonthSelectorProps {
  selectedMonth: string;
  onPress: () => void;
}

export function MonthSelector({ selectedMonth, onPress }: MonthSelectorProps) {
  return (
    <View className="flex-row justify-center mt-8">
      <View className="bg-[#FF005E4F] rounded-full p-2">
        <TouchableOpacity
          className="bg-primary rounded-full px-6 py-3"
          onPress={onPress}
        >
          <Text className="text-zinc-100 font-zona-bold text-lg uppercase">
            {selectedMonth}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
