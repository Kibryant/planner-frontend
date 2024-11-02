import React from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { Title } from "@/components/title";
import { Back } from "@/components/back";
import { MonthSelector } from "@/components/month-selector";
import { MonthModal } from "@/components/month-modal";
import { DailyGoal } from "@/components/daily-goal";
import { MonthlyGoal } from "@/components/monthly-goal";
import { Actions } from "@/components/actions";
import { BottomButton } from "@/components/bottom-button";
import { useRevenueGoal } from "@/hooks/useRevenueGoal";

const MONTHS_BR = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
] as const;

export default function RevenueGoal() {
  const {
    data,
    status,
    selectedMonth,
    setSelectedMonth,
    selectedMonthEn,
    token,
    userId,
    actualMonth,
  } = useRevenueGoal();

  const [modalVisible, setModalVisible] = React.useState(false);

  if (status === "pending") {
    return (
      <View className="px-8 bg-zinc-950 flex-1">
        <Title title="Meta de faturamento" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fb005d" />
        </View>
      </View>
    );
  }

  if (status === "error") {
    return (
      <View>
        <Title title="Meta de faturamento" />
        <Text>Erro ao carregar a meta de faturamento</Text>
      </View>
    );
  }

  return (
    <ScrollView className="px-8 bg-zinc-950 flex-1">
      <Back />
      <Title title="Meta de faturamento" />

      <MonthSelector
        selectedMonth={selectedMonth}
        onPress={() => setModalVisible(true)}
      />

      <View className="mt-8 items-center">
        <MonthlyGoal
          MONTH={actualMonth}
          monthBr={selectedMonth}
          selectedMonthEn={selectedMonthEn}
          monthlyGoal={data?.revenueGoal.monthlyGoal || ""}
          token={token}
          userId={userId}
        />

        <DailyGoal
          MONTH={actualMonth}
          monthBr={selectedMonth}
          selectedMonthEn={selectedMonthEn}
          dailyGoal={data?.revenueGoal.dailyGoal || ""}
          token={token}
          userId={userId}
        />
      </View>

      <View className="mt-4">
        <Actions
          MONTH={actualMonth}
          monthBr={selectedMonth}
          selectedMonthEn={selectedMonthEn}
          actions={data?.revenueGoal.actions || []}
          token={token}
          userId={userId}
        />
      </View>

      <MonthModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSelectMonth={(month) => {
          setSelectedMonth(month);
          setModalVisible(false);
        }}
        months={MONTHS_BR}
      />

      <View className="items-center flex-row justify-center mt-6">
        <BottomButton />
      </View>
    </ScrollView>
  );
}
