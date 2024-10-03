import { View } from "react-native";
import { Back } from "@/components/back";
import { BottomButton } from "@/components/bottom-button";
import { Title } from "@/components/title";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <View className="flex-1 bg-zinc-950">
      <View className="flex-1 px-6">
        <Back />
        <Title title={title} />
        {children}
      </View>

      <View className="mt-10 items-center flex-row justify-center">
        <BottomButton />
      </View>
    </View>
  );
}
