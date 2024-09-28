import React from "react";
import { View, Text, Dimensions, SafeAreaView } from "react-native";
import { BottomButton } from "@/components/bottom-button";
import { Card } from "@/components/card";
import GradientBorderBox from "@/components/gradient-border-box";

const { width } = Dimensions.get("window");

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-black" style={{ paddingHorizontal: 20 }}>
      <View className="flex-1 px-8">
        <View className="flex-row items-center mt-10 mb-6">
          <View className="bg-primary h-10 w-1.5 mr-4 rounded-full" />
          <Text
            className="text-zinc-100 text-2xl font-zona-bold"
            style={{ fontSize: width * 0.06 }}
          >
            Menu Principal
          </Text>
        </View>

        <View className="flex-1 justify-center">
          <GradientBorderBox />

          <View className="flex-row justify-between mb-2">
            <Card
              href="/post-planning"
              text="Planejamento das postagens"
              iconHeader="calendar"
              iconFooter="calendar-alt"
            />

            <Card
              href="/billing-goal"
              text="Meta de faturamento"
              iconHeader="activity"
              iconFooter="fire"
            />
          </View>

          <View className="flex-row justify-between mb-4">
            <Card
              href="/success-habits"
              text="Hábitos de sucesso"
              iconHeader="star"
              iconFooter="star"
            />

            <Card
              href="/grow-tips"
              text="Dicas de crescimento"
              iconHeader="info"
              iconFooter="lightbulb"
            />
          </View>
        </View>

        <BottomButton isHome />
      </View>
    </SafeAreaView>
  );
}
