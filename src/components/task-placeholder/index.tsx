import { View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface TaskPlaceholderProps {
  placeholder: string;
  onPress: () => void;
}

export function TaskPlaceholder({
  placeholder,
  onPress,
}: TaskPlaceholderProps) {
  return (
    <LinearGradient
      colors={["#EF0052", "#4E001D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        padding: 1,
        borderRadius: 12,
        marginBottom: 18,
      }}
    >
      <View className="flex-row items-center justify-between bg-[#4F001D] rounded-xl p-6">
        <TouchableOpacity className="flex-1" onPress={onPress}>
          <Text className="text-zinc-100 text-xs font-zona-regular">
            Clique aqui para adicionar {placeholder}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
