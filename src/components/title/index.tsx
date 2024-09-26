import { View, Text, Dimensions } from "react-native";

interface TitleProps {
  title: string;
}

const { width } = Dimensions.get("window");

export function Title({ title }: TitleProps) {
  return (
    <View className="flex-row items-center mt-10 mb max-w-64">
      <View className="bg-primary h-10 w-1.5 mr-4 rounded-full" />
      <Text
        className="text-zinc-100 text-2xl font-zona-bold"
        style={{ fontSize: width * 0.06 }}
      >
        {title}
      </Text>
    </View>
  );
}
