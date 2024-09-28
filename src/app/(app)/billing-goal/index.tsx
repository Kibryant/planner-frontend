import React from "react";
import { SafeAreaView, View } from "react-native";
import { BottomButton } from "@/components/bottom-button";
import { Title } from "@/components/title";
import { Back } from "@/components/back";

export default function BillingGoal() {
  return (
    <SafeAreaView className="flex-1 bg-black" style={{ paddingHorizontal: 20 }}>
      <View className="flex-1 px-8">
        <Back />
        <Title title="Meta de fatarumento" />
      </View>

      <BottomButton />
    </SafeAreaView>
  );
}
