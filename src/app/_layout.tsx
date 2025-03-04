import "@/lib/i18n/i18n.config";
import "./global.css";

import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";

const hideNavigationBar = async () => {
	if (Platform.OS === "android") {
		NavigationBar.setVisibilityAsync("hidden");
	}
};

hideNavigationBar();

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({});

export default function RootLayout() {
	const insets = useSafeAreaInsets();

	const paddingBottom = Platform.OS === "android" ? insets.bottom : 0;

	const [loaded, error] = useFonts({
		"ZonaPro-Regular": require("../assets/fonts/ZonaPro-Regular.ttf"),
		"ZonaPro-SemiBold": require("../assets/fonts/ZonaPro-SemiBold.ttf"),
		"ZonaPro-Bold": require("../assets/fonts/ZonaPro-Bold.ttf"),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#09090b",
				paddingTop: insets.top,
				paddingBottom,
			}}
		>
			<StatusBar translucent backgroundColor="transparent" />
			<QueryClientProvider client={queryClient}>
				<Slot />

				<Toast />
			</QueryClientProvider>
		</SafeAreaView>
	);
}
