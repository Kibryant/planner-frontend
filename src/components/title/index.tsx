import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

interface TitleProps {
  title: string;
}

export function Title({ title }: TitleProps) {
    const  { t } = useTranslation();

  return (
    <View className="flex-row items-center max-w-72 mt-10">
      <View className="bg-primary h-full w-[2px] mr-3 rounded-full" />
      <Text className="text-zinc-100 text-[25px] font-zona-bold capitalize">
        {t(title)}
      </Text>
    </View>
  );
}
