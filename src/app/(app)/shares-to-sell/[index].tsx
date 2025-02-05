import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	Dimensions,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Title } from "@/components/title";
import { Back } from "@/components/back";
import { type Tip, TIPS } from "@/constants/tips";
import YoutubeIframe from "react-native-youtube-iframe";
import { LinearGradient } from "expo-linear-gradient";
import { Carousel } from "@/components/carousel";
import { DownloadIconTurned } from "@/components/icons/download-icon-turned";
import { HomeIcon } from "@/components/icons/home-icon";
import { useShare } from "@/hooks/useShare";
import { useTranslation } from "react-i18next";

const screenHeight = Dimensions.get("screen").height;

export default function Share() {
	const { t } = useTranslation();
	const { index } = useLocalSearchParams();

	const indexString = Array.isArray(index) ? index[0] : index;

	const indexNumber = Number.parseInt(indexString, 10);

	const {
		isVideoReady,
		isStepByStepVideoReady,
		isDownloading,
		setIsVideoReady,
		setIsStepByStepVideoReady,
		onFullScreenChange,
		downloadLinks,
	} = useShare({ index: indexString });

	const tip: Tip = TIPS[indexNumber];

	return (
		<View className="flex-1 bg-zinc-950 relative px-8">
			<Back />

			<Title title={`Ação ${tip.title.toLowerCase()}`} />

			<ScrollView
				style={{ height: screenHeight }}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 160 }}
                showsVerticalScrollIndicator={false}
			>
				<View className="items-center w-full mt-10 gap-y-2 h-full">
					<View
						style={{
							borderRadius: 20,
							overflow: "hidden",
							width: 340,
							height: isVideoReady ? 200 : 0,
						}}
					>
						<YoutubeIframe
							videoId={tip.videoId}
							onFullScreenChange={onFullScreenChange}
							height={200}
							width={340}
							onReady={() => setIsVideoReady(true)}
						/>
					</View>

					{!isVideoReady && <ActivityIndicator size="large" color="#fe017f" />}

					<View className="bg-[#640025] rounded-xl w-full overflow-hidden max-w-[333px] h-full max-h-[360px]">
						<LinearGradient
							colors={["#B90040", "#EF0052", "B90040", "#EF0052"]}
							start={[0, 0]}
							end={[1, 1]}
							style={{
								borderRadius: 12,
								padding: 1,
								width: "100%",
							}}
						>
							<TouchableOpacity
								className="bg-[#990039] rounded-xl flex-row items-center justify-center gap-x-2 p-4 w-full"
								onPress={downloadLinks}
								accessible={true}
								accessibilityLabel="Baixar todos os links"
								disabled={isDownloading}
							>
								{isDownloading ? (
									<ActivityIndicator size="small" color="#fe017f" />
								) : (
									<>
										<DownloadIconTurned
											style={{ position: "absolute", left: 20 }}
										/>

										<Text className="text-zinc-100 text-center text-lg font-zona-semibold">
											{t("Baixar todos os links")}
										</Text>
									</>
								)}
							</TouchableOpacity>
						</LinearGradient>

						<Carousel links={tip.links} />
					</View>

					{tip.stepByStepVideoId && (
						<View className="w-full mt-10 gap-4">
							<Text className="text-primary text-center text-xl font-zona-semibold">
								{t("Passo a passo")}
							</Text>

							<View
								style={{
									borderRadius: 20,
									overflow: "hidden",
									width: 340,
									height: isStepByStepVideoReady ? 200 : 0,
								}}
							>
								<YoutubeIframe
									videoId={tip.stepByStepVideoId}
									onFullScreenChange={onFullScreenChange}
									height={200}
									width={340}
									onReady={() => setIsStepByStepVideoReady(true)}
								/>
							</View>

							{!isStepByStepVideoReady && (
								<ActivityIndicator size="large" color="#fe017f" />
							)}
						</View>
					)}
				</View>
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
