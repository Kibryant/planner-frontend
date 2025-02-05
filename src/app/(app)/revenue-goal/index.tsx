import React, { useState } from "react";
import {
	View,
	Text,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { Title } from "@/components/title";
import { Back } from "@/components/back";
import { MonthSelector } from "@/components/month-selector";
import { MonthModal } from "@/components/month-modal";
import { DailyGoal } from "@/components/daily-goal";
import { MonthlyGoal } from "@/components/monthly-goal";
import { Actions } from "@/components/actions";
import { useRevenueGoal } from "@/hooks/useRevenueGoal";
import { MONTHS_BR } from "@/constants/monts-br";
import { Link } from "expo-router";
import { HomeIcon } from "@/components/icons/home-icon";

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

	const [modalVisible, setModalVisible] = useState(false);

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
		<View className="flex-1 bg-zinc-950 px-8">
			<Back />
			<Title title="Meta de faturamento" />

			<ScrollView
				className="bg-zinc-950 flex-1"
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
				showsVerticalScrollIndicator={false}
			>
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
			</ScrollView>

			<View
				style={{
					position: "absolute",
					bottom: 20,
					left: 0,
					right: 0,
					alignItems: "center",
				}}
			>
				<Link href="/" asChild>
					<TouchableOpacity
						className="bg-primary w-16 h-16 rounded-full justify-center items-center"
						accessibilityLabel="Botão Home"
						accessibilityHint="Clique para voltar para o menu principal"
						activeOpacity={0.8}
					>
						<HomeIcon fill={"#940037"} className={`w-8 h-8 "ext-[#940037] `} />
					</TouchableOpacity>
				</Link>
			</View>
		</View>
	);
}
