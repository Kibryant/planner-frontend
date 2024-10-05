import { View, Text, Dimensions } from "react-native";

interface TitleProps {
  title: string;
}

const { width } = Dimensions.get("window");

export function Title({ title }: TitleProps) {
  return (
    <View className="flex-row items-center max-w-72 mt-10">
      <View className="bg-primary h-full w-[2px] mr-3 rounded-full" />
      <Text
        className="text-zinc-100 text-2xl font-zona-bold"
        style={{ fontSize: width * 0.06 }}
      >
        {title}
      </Text>
    </View>
  );
}
