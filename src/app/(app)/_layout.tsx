import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{
        headerShown: false,
      }} />

      <Stack.Screen name="shares-to-sell/index" options={{
        headerShown: false,
      }} />

      <Stack.Screen name="success-habits/index" options={{
        headerShown: false,
      }} />

      <Stack.Screen name="grow-tips/index" options={{
        headerShown: false,
      }} />
    </Stack>
  );
}