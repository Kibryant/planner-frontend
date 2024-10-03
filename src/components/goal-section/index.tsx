import React from "react";
import { View } from "react-native";
import { MonthlyGoal } from "@/components/monthly-goal";
import { DailyGoal } from "@/components/daily-goal";

interface GoalSectionProps {
  actualMonth:
    | "JANUARY"
    | "FEBRUARY"
    | "MARCH"
    | "APRIL"
    | "MAY"
    | "JUNE"
    | "JULY"
    | "AUGUST"
    | "SEPTEMBER"
    | "OCTOBER"
    | "NOVEMBER"
    | "DECEMBER";
  selectedMonthBr: string;
  selectedMonthEn:
    | "JANUARY"
    | "FEBRUARY"
    | "MARCH"
    | "APRIL"
    | "MAY"
    | "JUNE"
    | "JULY"
    | "AUGUST"
    | "SEPTEMBER"
    | "OCTOBER"
    | "NOVEMBER"
    | "DECEMBER";
}

export function GoalSection({
  actualMonth,
  selectedMonthBr,
  selectedMonthEn,
}: GoalSectionProps) {
  return (
    <View className="mt-8">
      <MonthlyGoal
        MONTH={actualMonth}
        monthBr={selectedMonthBr}
        selectedMonthEn={selectedMonthEn}
      />

      <DailyGoal
        MONTH={actualMonth}
        monthBr={selectedMonthBr}
        selectedMonthEn={selectedMonthEn}
      />
    </View>
  );
}
