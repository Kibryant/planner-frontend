import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams } from "expo-router";
import { Title } from "@/components/title";
import { Back } from "@/components/back";
import { BottomButton } from "@/components/bottom-button";
import { TIPS } from "@/constants/tips";
import YoutubeIframe from "react-native-youtube-iframe";
import * as ScreenOrientation from "expo-screen-orientation";
import * as MediaLibrary from "expo-media-library";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { Carousel } from "@/components/carousel";
import { DownloadIconTurned } from "@/components/icons/download-icon-turned";

export default function Share() {
  const { index } = useLocalSearchParams();

  const [isVideoReady, setIsVideoReady] = useState(false);

  const indexNumber = Number.parseInt(index as string);

  const tip = TIPS[indexNumber];

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  const saveToGallery = async (fileUri: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === "granted") {
      try {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync("Download", asset, false);
        Toast.show({
          type: "success",
          text1: "Salvo na galeria",
          text2: "O arquivo foi salvo na galeria com sucesso",
        });
      } catch {
        Toast.show({
          type: "error",
          text1: "Erro ao salvar na galeria",
          text2: "Ocorreu um erro ao salvar o arquivo na galeria",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Permissão negada",
        text2: "Você precisa permitir o acesso à galeria para salvar o arquivo",
      });
    }
  };

  const downloadLinks = async () => {
    const links = [
      {
        name: "camuflagem-feed.png",
        url: "https://github.com/Kibryant.png",
      },
    ];

    for (const link of links) {
      try {
        await saveToGallery(FileSystem.documentDirectory + link.name);
      } catch {
        Toast.show({
          type: "error",
          text1: "Erro ao baixar",
          text2: "Ocorreu um erro ao baixar o arquivo",
        });
      }
    }
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <ScrollView className="flex-1 px-8">
        <Back />

        <Title title={`Ação ${tip.title.toLowerCase()}`} />

        <View className="justify-center my-2 p-4 items-center w-full">
          <View
            style={{
              borderRadius: 20,
              overflow: "hidden",
              width: 340,
              height: isVideoReady ? 200 : 0,
            }}
          >
            <YoutubeIframe
              videoId={tip.videoId}
              onFullScreenChange={onFullScreenChange}
              height={200}
              width={340}
              onReady={() => setIsVideoReady(true)}
            />
          </View>

          {!isVideoReady && <ActivityIndicator size="large" color="#fe017f" />}
        </View>

        <View className="items-center">
          <View className="bg-[#640025] rounded-xl w-full overflow-hidden max-h-[312px] max-w-[333px]">
            <LinearGradient
              colors={["#B90040", "#EF0052", "B90040", "#EF0052"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{
                borderRadius: 12,
                padding: 1,
                width: "100%",
              }}
            >
              <TouchableOpacity
                className="bg-[#990039] rounded-xl flex-row items-center justify-center gap-x-2 p-4 w-full"
                onPress={downloadLinks}
                accessible={true}
                accessibilityLabel="Baixar todos os links"
              >
                <DownloadIconTurned
                  style={{ position: "absolute", left: 52 }}
                />

                <Text className="text-zinc-100 text-center text-lg font-zona-semibold">
                  Baixar todos os links
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            <Carousel />
          </View>
        </View>

        <View className="items-center flex-row justify-center mt-6">
          <BottomButton />
        </View>
      </ScrollView>
    </View>
  );
}
