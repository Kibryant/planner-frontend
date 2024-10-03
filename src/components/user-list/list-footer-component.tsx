import { ActivityIndicator, View } from "react-native";

interface ListFooterComponentProps {
  isLoading: boolean;
}

export function ListFooterComponent({ isLoading }: ListFooterComponentProps) {
  if (!isLoading) return null;

  return (
    <View className="p-4">
      <ActivityIndicator size="large" color="#fe017f" />
    </View>
  );
}
