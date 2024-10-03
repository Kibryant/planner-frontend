import { useAdminStore } from "@/store/admin-store";
import { useUserStore } from "@/store/user-store";
import { Redirect, Stack } from "expo-router";
import { Platform } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Layout() {
  const insets = useSafeAreaInsets();

  const paddingBottom = Platform.OS === "android" ? insets.bottom : 0;

  const user = useUserStore((state) => state.user);

  const admin = useAdminStore((state) => state.admin);

  if (!user && !admin) {
    return <Redirect href="/sign-in" />;
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
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="shares-to-sell/index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="shares-to-sell/[index]"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="success-habits/index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="grow-tips/index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="post-planning/index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="post-planning/[day]"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="revenue-goal/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
