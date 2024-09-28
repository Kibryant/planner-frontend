import { BottomButton } from "@/components/bottom-button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function GrowTips() {
  // Dados da lista
  const dicas = [
    { id: 1, texto: "Planejar com pelo menos 15 dias de antecedência" },
    { id: 2, texto: "Aproveitar essas datas para liquidar o estoque" },
    { id: 3, texto: "Buscar parcerias com sua marca" },
    { id: 4, texto: "Decorar o salão para entrar no clima da data" },
    { id: 5, texto: "Se preparar para criar e divulgar as ações" },
    { id: 6, texto: "Evitar baixar preços unitários" },
    { id: 7, texto: "Oferecer combos e pacotes" },
    { id: 8, texto: "Fazer promoções relâmpago" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-8">
        <View className="flex-row items-center justify-between py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={28} color="#fb005d" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center mt-10 mb max-w-64">
          <View className="bg-primary h-10 w-1.5 mr-4 rounded-full" />
          <Text
            className="text-zinc-100 text-2xl font-zona-bold"
            style={{ fontSize: width * 0.06 }}
          >
            Dicas para crescer seu salão
          </Text>
        </View>

        {/* Lista de dicas */}
        <ScrollView className="mt-5 px-5">
          {dicas.map((dica) => (
            <View
              key={dica.id}
              className="flex-row items-center gap-x-3 bg-[#4F001D] rounded-lg p-4 mb-2"
            >
              <View className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center">
                <Text className="text-zinc-100 text-4xl font-zona-bold">
                  {dica.id}
                </Text>
              </View>
              <Text className="text-zinc-100 flex-1 font-zona-semibold">
                {dica.texto}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <BottomButton />
    </SafeAreaView>
  );
}
