import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams } from "expo-router";
import { Title } from "@/components/title";
import { Back } from "@/components/back";
import { BottomButton } from "@/components/bottom-button";
import { Ionicons } from "@expo/vector-icons";

export default function Share() {
  const { share } = useLocalSearchParams();
  const { width } = Dimensions.get("window"); // Responsividade com base na largura da tela

  console.log("Share:", share);

  const downloadLinks = async () => {
    const links = [
      {
        name: "Camuflagem-1feed.png",
        url: "https://example.com/Camuflagem-1feed.png",
      },
    ];

    for (const link of links) {
      const uri = link.url;
      const fileUri = FileSystem.documentDirectory + link.name;

      try {
        await FileSystem.downloadAsync(uri, fileUri);
        console.log(`Downloaded: ${link.name}`);
      } catch (error) {
        console.error(`Error downloading ${link.name}:`, error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 p-5">
        <Back />

        <Title title="Ação Cloro Off" />

        {/* Aula 03 */}
        <View className="flex-row rounded-lg mb-5 p-4">
          <Image
            source={{ uri: "https://example.com/aula03.png" }} // Substitua com o link real
            className="rounded-lg"
            style={{ width: width * 0.3, height: width * 0.3 }} // Responsivo com base na largura da tela
            accessible={true}
            accessibilityLabel="Imagem da Aula 03"
          />
          <View className="ml-4 justify-center">
            <Text className="text-white text-lg">Aula 03</Text>
            <Text className="text-white text-lg">11/09 às 20:09</Text>
            <TouchableOpacity
              className="bg-pink-600 py-2 px-4 rounded-lg mt-2"
              accessible={true}
              accessibilityLabel="Clique para assistir"
            >
              <Text className="text-white">Clique para assistir</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Baixar todos os links */}
        <TouchableOpacity
          className="bg-primary p-4 rounded-lg mb-5 flex-row items-center justify-center gap-x-4"
          onPress={downloadLinks}
          accessible={true}
          accessibilityLabel="Baixar todos os links"
        >
          <Ionicons name="download" size={24} color="#A6003D" />
          <Text className="text-zinc-100 text-center text-base font-zona-semibold">
            Baixar todos os links
          </Text>
        </TouchableOpacity>

        <View className="bg-neutral-800 rounded-lg p-4">
          <Image
            source={{ uri: "https://example.com/video_thumbnail.png" }} // Substitua com o link real
            className="rounded-lg mb-3"
            style={{ width: "100%", height: width * 0.5 }} // Responsivo
            accessible={true}
            accessibilityLabel="Imagem do vídeo Thiago Finch fala do Ruyter"
          />
          <Text
            className="text-white text-lg text-center"
            accessible={true}
            accessibilityLabel="Thiago Finch fala do Ruyter"
          >
            Thiago Finch fala do Ruyter
          </Text>
        </View>
      </ScrollView>
      <BottomButton />
    </SafeAreaView>
  );
}
