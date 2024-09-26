import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import { BottomButton } from "@/components/bottom-button";
import { Card } from "@/components/card";

const { width } = Dimensions.get("window");

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-black" style={{ paddingHorizontal: 20 }}>
      <View className="flex-1 px-4">
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
          <Link href="/shares-to-sell" asChild>
            <TouchableOpacity
              className="bg-primary/30 border border-primary w-full flex-row h-44 rounded-xl justify-start items-center mb-2 p-4"
              accessibilityLabel="Ações mensais para aumentar o faturamento"
              accessibilityHint="Clique para acessar as ações mensais"
              activeOpacity={0.8}
            >
              <View className="bg-[#3D0016] h-[48px] w-[56px] rounded-xl justify-center items-center mr-4 absolute top-2 left-2">
                <Ionicons name="cash" size={24} color="#fb005d" />
              </View>

              <View className="flex-1 flex-row justify-start items-center mt-10">
                <MaterialCommunityIcons
                  name="sack-percent"
                  size={36}
                  color="#fb005d"
                />
                <Text
                  className="text-zinc-100 font-zona-semibold text-left max-w-72"
                  style={{ fontSize: width * 0.045 }}
                >
                  Ações mensais para Aumentar o Faturamento
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

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

        <BottomButton />
      </View>
    </SafeAreaView>
  );
}
