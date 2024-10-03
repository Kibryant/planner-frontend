import { View, TouchableOpacity, Text } from "react-native";
import { Card } from "@/components/card";
import { MainCard } from "@/components/main-card";
import { Title } from "@/components/title";
import { FireIcon } from "@/components/icons/fire-icon";
import { CalendarIcon } from "@/components/icons/calendar-icon";
import { StarIcon } from "@/components/icons/star-icon";
import { RocketIcon } from "@/components/icons/rocket-icon";
import { useAdminStore } from "@/store/admin-store";
import { Link } from "expo-router";
import { MoneyIcon } from "@/components/icons/money-icon";
import { BottomButton } from "@/components/bottom-button";

export default function Home() {
  const admin = useAdminStore((state) => state.admin);

  return (
    <View className="flex-1 px-8 bg-zinc-950">
      <Title title="Menu Principal" />

      <View className="flex-1 justify-center">
        <MainCard
          href="/shares-to-sell"
          text="Ações mensais para aumentar o faturamento"
          IconHeader={MoneyIcon}
        />

        <View className="flex-row justify-between mb-2">
          <Card
            href="/post-planning"
            text="Planejamento das postagens"
            IconHeader={CalendarIcon}
          />

          <Card
            href="/revenue-goal"
            text="Meta de faturamento"
            IconHeader={FireIcon}
          />
        </View>

        <View className="flex-row justify-between mb-4">
          <Card
            href="/success-habits"
            text="Hábitos de sucesso"
            IconHeader={StarIcon}
          />

          <Card
            href="/grow-tips"
            text="Dicas de crescimento"
            IconHeader={RocketIcon}
          />
        </View>
      </View>

      <View className="flex-row justify-center items-center gap-x-2 absolute -bottom-4 left-0 right-0 p-4">
        <BottomButton isHome />

        {admin && (
          <Link href="/admin" asChild>
            <TouchableOpacity
              className="bg-zinc-100 w-20 h-16 rounded-full justify-center items-center border-4 border-primary"
              accessibilityLabel="Botão Sair"
              accessibilityHint="Clique para sair do painel de administração"
              activeOpacity={0.8}
            >
              <Text className="text-[6.5px] font-zona-bold text-primary text-center">
                Voltar ao painel administrativo
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  );
}
