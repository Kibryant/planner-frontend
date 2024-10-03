import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./global.css";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({});

export default function RootLayout() {
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
    <QueryClientProvider client={queryClient}>
      <Slot />

      <Toast />
    </QueryClientProvider>
  );
}
