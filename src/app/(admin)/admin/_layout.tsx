import { useAdminStore } from "@/store/admin-store";
import { Redirect, Stack } from "expo-router";
import { Platform } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Layout() {
  const insets = useSafeAreaInsets();

  const paddingBottom = Platform.OS === "android" ? insets.bottom : 0;

  const admin = useAdminStore((state) => state.admin);

  if (!admin) {
    return <Redirect href="/sign-in-admin" />;
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
          name="users"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="add-user"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
