import { BottomButton } from "@/components/bottom-button";
import { CardHabit } from "@/components/card-habit";
import { Title } from "@/components/title";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

export default function SuccessHabits() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-4">
        <View className="flex-row items-center justify-between py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={28} color="#fb005d" />
          </TouchableOpacity>
        </View>

        <Title title="Hábitos de Sucesso" />

        <View className="flex-row justify-center mt-10">
          <View className="flex-row justify-between w-80 mt-5 bg-[#FF005E4F] rounded-full px-3 py-3">
            <TouchableOpacity className="px-4 py-5 bg-primary rounded-full">
              <Text className="text-zinc-100 font-zona-semibold">Diário</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-5 bg-[#3D0016] rounded-full">
              <Text className="text-zinc-100 font-zona-semibold">Semanal</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-5 bg-[#3D0016] rounded-full">
              <Text className="text-zinc-100 font-zona-semibold">Mensal</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 justify-center mt-10 items-center">
          <CardHabit />
        </View>
      </View>
      <BottomButton />
    </SafeAreaView>
  );
}
