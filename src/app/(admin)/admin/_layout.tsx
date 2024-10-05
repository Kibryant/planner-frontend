import { useAdminStore } from "@/store/admin-store";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const admin = useAdminStore((state) => state.admin);

  if (!admin) {
    return <Redirect href="/sign-in-admin" />;
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
  );
}
