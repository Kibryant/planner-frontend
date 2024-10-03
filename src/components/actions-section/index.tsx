import React from "react";
import { View } from "react-native";
import { Actions } from "@/components/actions";

interface ActionsSectionProps {
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

export function ActionsSection({
  actualMonth,
  selectedMonthBr,
  selectedMonthEn,
}: ActionsSectionProps) {
  return (
    <View className="mt-4">
      <Actions
        MONTH={actualMonth}
        monthBr={selectedMonthBr}
        selectedMonthEn={selectedMonthEn}
      />
    </View>
  );
}
