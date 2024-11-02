import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { HttpStatusCode } from "axios";
import { MONTHS } from "@/constants/months";
import { useUserStore } from "@/store/user-store";
import { useAdminStore } from "@/store/admin-store";

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

export interface RevenueGoalResponse {
  revenueGoal: {
    actions: string[];
    month: typeof MONTHS;
    dailyGoal: string;
    monthlyGoal: string;
  };
}

export function useRevenueGoal() {
  const { user, token: tokenUser } = useUserStore();
  const admin = useAdminStore((state) => state.admin);

  const token = tokenUser || admin?.token || "";
  const userId = user?.id || admin?.admin.id || "";

  const actualMonthInNumber = new Date().getMonth();
  const actualMonthBr = MONTHS_BR[actualMonthInNumber];
  const [selectedMonth, setSelectedMonth] = useState(actualMonthBr);
  const actualMonth = MONTHS[actualMonthInNumber];

  const selectedMonthEn = MONTHS_EN[selectedMonth];

  const { data, status, error } = useQuery<RevenueGoalResponse>({
    queryKey: [`revenue-goal-${selectedMonthEn}`],
    queryFn: async () => {
      const response = await api.get<RevenueGoalResponse>(
        `/user/get-revenue-goals-by-month?userId=${userId}&month=${selectedMonthEn}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== HttpStatusCode.Ok) {
        throw new Error("Erro ao buscar meta de faturamento");
      }

      return response.data;
    },
    enabled: !!userId && !!token,
  });

  return {
    data,
    status,
    error,
    selectedMonth,
    setSelectedMonth,
    actualMonthInNumber,
    actualMonthBr,
    selectedMonthEn,
    token,
    userId,
    actualMonth,
  };
}
