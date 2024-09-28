import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

export default function GradientBorderBox() {
  return (
    <LinearGradient
      colors={["#EF0052", "#4E001D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        padding: 1,
        borderRadius: 12,
        height: 160,
        marginBottom: 12,
      }}
    >
      <Link href="/shares-to-sell" asChild>
        <TouchableOpacity
          className="bg-[#4F001D] flex-1 flex-row rounded-xl justify-start items-center p-5"
          accessibilityLabel="Ações mensais para aumentar o faturamento"
          accessibilityHint="Clique para acessar as ações mensais"
          activeOpacity={0.8}
        >
          <View className="bg-[#3D0016] h-[48px] w-[56px] rounded-xl justify-center items-center mr-4 absolute top-2 left-2">
            <Ionicons name="cash" size={24} color="#FF005E" />
          </View>

          <View className="flex-1 flex-row justify-start items-center mt-10">
            <MaterialCommunityIcons
              name="sack-percent"
              size={36}
              color="#FF005E"
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
    </LinearGradient>
  );
}
