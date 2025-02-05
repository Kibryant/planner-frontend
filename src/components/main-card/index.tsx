import React, { type ElementType } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { type Href, Link } from "expo-router";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

interface MainCardProps {
  href: Href;
  IconHeader: ElementType;
  text: string;
}

export function MainCard({ href, IconHeader, text }: MainCardProps) {
    const { t } = useTranslation();

  return (
    <LinearGradient
      colors={["#EF0052", "#4E001D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        padding: 1,
        borderRadius: 12,
        height: 160,
      }}
    >
      <Link href={href} asChild>
        <TouchableOpacity
          className="bg-[#4F001D] flex-1 flex-row rounded-xl justify-start items-center p-5 w-full"
          accessibilityLabel="Ações mensais para aumentar o faturamento"
          accessibilityHint="Clique para acessar as ações mensais"
          activeOpacity={0.8}
        >
          <View className="bg-[#3D0016] h-[48px] w-[49px] rounded-xl justify-center items-center mr-4 absolute top-2 left-2">
            <IconHeader />
          </View>

          <View className="flex-1 flex-row justify-start items-center mt-10">
            <Text
              className="text-zinc-100 font-zona-semibold text-left max-w-72"
              style={{ fontSize: width * 0.045 }}
            >
              {t(text)}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    </LinearGradient>
  );
}
