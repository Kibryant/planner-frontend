import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, TouchableOpacity } from "react-native";

export function Back() {
  return (
    <View className="flex-row items-center justify-between py-4">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-sharp" size={28} color="#fb005d" />
      </TouchableOpacity>
    </View>
  );
}
