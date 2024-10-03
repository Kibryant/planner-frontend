import { router } from "expo-router";
import { View, TouchableOpacity, Image } from "react-native";

export function Back() {
  return (
    <View className="flex-row items-center justify-between">
      <TouchableOpacity onPress={() => router.back()}>
        <Image source={require("@/assets/images/back.png")} />
      </TouchableOpacity>
    </View>
  );
}
