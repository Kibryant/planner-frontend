import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Title } from "@/components/title";
import { Back } from "@/components/back";
import { MONTHS } from "@/constants/months";
import { MonthSelector } from "@/components/month-selector";
import { MonthModal } from "@/components/month-modal";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useUserStore } from "@/store/user-store";
import { useAdminStore } from "@/store/admin-store";
import { HttpStatusCode } from "axios";
import { DailyGoal } from "@/components/daily-goal";
import { MonthlyGoal } from "@/components/monthly-goal";
import { Actions } from "@/components/actions";

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

const MONTHS_EN = {
  janeiro: "JANUARY",
  fevereiro: "FEBRUARY",
  março: "MARCH",
  abril: "APRIL",
  maio: "MAY",
  junho: "JUNE",
  julho: "JULY",
  agosto: "AUGUST",
  setembro: "SEPTEMBER",
  outubro: "OCTOBER",
  novembro: "NOVEMBER",
  dezembro: "DECEMBER",
} as const;

interface RevenueGoalResponse {
  revenueGoal: {
    actions: string[];
    month: typeof MONTHS;
    dailyGoal: string;
    monthlyGoal: string;
  };
}

export default function RevenueGoal() {
  const { user, token: tokenUser } = useUserStore();

  const admin = useAdminStore((state) => state.admin);
  const token = tokenUser || admin?.token || "";
  const userId = user?.id || admin?.admin.id || "";
  const actualMonthInNumber = new Date().getMonth();
  const actualMonthBr = MONTHS_BR[actualMonthInNumber];
  const actualMonth = MONTHS[actualMonthInNumber];

  const [selectedMonth, setSelectedMonth] = useState(actualMonthBr);
  const [modalVisible, setModalVisible] = useState(false);

  const selectedMonthEn = MONTHS_EN[selectedMonth];

  const { data, status } = useQuery({
    queryKey: [`revenue-goal-${selectedMonthEn}`],
    queryFn: async () => {
      const response = await api.get<RevenueGoalResponse>(
        `/user/get-revenue-goals-by-month?userId=${userId}&month=${selectedMonthEn}`,
        {
          headers: {
            Authorization: `Bearer ${token || admin?.token || ""}`,
          },
        },
      );

      if (response.status !== HttpStatusCode.Ok) {
        throw new Error("Erro ao buscar meta de faturamento");
      }

      return response.data;
    },
  });

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
    <View className="px-8 bg-zinc-950 flex-1">
      <Back />
      <Title title="Meta de faturamento" />

      <MonthSelector
        selectedMonth={selectedMonth}
        onPress={() => setModalVisible(true)}
      />
      <View className="mt-8">
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
    </View>
  );
}
