import React, { useState } from "react";
import { View } from "react-native";
import { Title } from "@/components/title";
import { Back } from "@/components/back";
import { MONTHS } from "@/constants/months";
import { MonthSelector } from "@/components/month-selector";
import { GoalSection } from "@/components/goal-section";
import { ActionsSection } from "@/components/actions-section";
import { MonthModal } from "@/components/month-modal";

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

export default function RevenueGoal() {
  const actualMonthInNumber = new Date().getMonth();
  const actualMonthBr = MONTHS_BR[actualMonthInNumber];
  const actualMonth = MONTHS[actualMonthInNumber];

  const [selectedMonth, setSelectedMonth] = useState(actualMonthBr);
  const [modalVisible, setModalVisible] = useState(false);

  const selectedMonthEn = MONTHS_EN[selectedMonth];

  return (
    <View className="px-8 bg-zinc-950 flex-1">
      <Back />
      <Title title="Meta de faturamento" />

      <MonthSelector
        selectedMonth={selectedMonth}
        onPress={() => setModalVisible(true)}
      />

      <GoalSection
        actualMonth={actualMonth}
        selectedMonthBr={selectedMonth}
        selectedMonthEn={selectedMonthEn}
      />

      <ActionsSection
        actualMonth={actualMonth}
        selectedMonthBr={selectedMonth}
        selectedMonthEn={selectedMonthEn}
      />

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
