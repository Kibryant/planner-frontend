import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { useWindowDimensions } from "react-native";
import { ProgessBar } from "@/components/progess-bar";
import { BottomButton } from "@/components/bottom-button";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Title } from "@/components/title";
import { GradientBorderCircle } from "@/components/gradient-border-circle";

const PlanejamentoPostagens = () => {
  const { width } = useWindowDimensions(); // Responsividade para ajustar o tamanho da imagem
  const imageHeight = width * 0.38;

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-6">
        <View className="flex-row items-center justify-between py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={28} color="#fb005d" />
          </TouchableOpacity>
        </View>

        <Title title="Planejamento de Postagens" />

        {/* Dias da semana */}
        <View className="mt-10 flex flex-row flex-wrap justify-center gap-x-3 gap-y-4 px-5">
          {[
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
            "Domingo",
          ].map((dia) => (
            <>
              <GradientBorderCircle key={dia} day={dia} />
              {dia === "Domingo" && <ProgessBar value={50} />}
            </>
          ))}
        </View>

        <View className="mt-10 px-5">
          <View className="flex overflow-hidden flex-row items-center justify-end border border-primary bg-[#46001A] rounded-[32px] p-4 space-x-3 h-44">
            <Image
              source={require("@/assets/images/hairstyle.png")}
              style={{
                width: imageHeight,
                height: imageHeight,
              }}
              className="absolute bottom-0 left-2"
              accessibilityLabel="Imagem de um penteado de cabelo."
            />
            <Text className="text-zinc-100 max-w-52 text-base font-zona-semibold">
              Especialistas que planejam têm 78% mais chances de crescer
            </Text>
          </View>
        </View>
        <BottomButton />
      </View>
    </SafeAreaView>
  );
};

export default PlanejamentoPostagens;
