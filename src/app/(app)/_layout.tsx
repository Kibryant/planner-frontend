import { useAdminStore } from "@/store/admin-store";
import { useUserStore } from "@/store/user-store";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const user = useUserStore((state) => state.user);

  const admin = useAdminStore((state) => state.admin);

  if (!user && !admin) {
    return <Redirect href="/sign-in" />;
  }

  return (
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

      <Stack.Screen
        name="tutorial/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
