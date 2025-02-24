import { useCallback, useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { type Tip, TIPS } from "@/constants/tips";
import * as ScreenOrientation from "expo-screen-orientation";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

interface UseShareProps {
  index: string;
}

export const useShare = ({ index }: UseShareProps) => {
        const { t, i18n } = useTranslation();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isStepByStepVideoReady, setIsStepByStepVideoReady] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const indexNumber = Number.parseInt(index);
  const tip: Tip = TIPS[indexNumber];

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    const orientationLock = isFullScreen
      ? ScreenOrientation.OrientationLock.LANDSCAPE
      : ScreenOrientation.OrientationLock.PORTRAIT;
    ScreenOrientation.lockAsync(orientationLock);
  }, []);

  useEffect(() => {
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const saveToGallery = async (fileUrl: string, fileName: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: t("Permissão negada"),
        text2: t("É necessário permitir o acesso à galeria para salvar o arquivo"),
      });
      return;
    }

    setIsDownloading(true);

    try {
      const documentDirectory = FileSystem.documentDirectory;

      if (!documentDirectory) {
        Toast.show({
          type: "error",
          text1: "Erro de diretório",
          text2: "O diretório de documentos não está disponível",
        });
        return;
      }

      const fileUri = `${documentDirectory}${fileName}`;
      
      const downloadResult = await FileSystem.downloadAsync(fileUrl, fileUri);

      if (!downloadResult.uri) {
        Toast.show({
          type: "error",
          text1: "Erro ao baixar o arquivo",
          text2: "O arquivo não foi baixado corretamente",
        });
        return;
      }

      await MediaLibrary.saveToLibraryAsync(downloadResult.uri);

      Toast.show({
        type: "success",
        text1: t("Salvo na galeria"),
        text2: t("O arquivo foi salvo na galeria com sucesso"),
      });
    } catch (error) {
      console.error("Erro ao salvar na galeria:", error);
      Toast.show({
        type: "error",
        text1: t("Erro ao salvar"),
        text2: t("Ocorreu um erro ao salvar o arquivo na galeria"),
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadLinks = async () => {
    for (const link of tip.links) {
      await saveToGallery(link.url, link.name);
    }
  };

  return {
    t,
    i18n,
    isVideoReady,
    isStepByStepVideoReady,
    isDownloading,
    onFullScreenChange,
    downloadLinks,
    setIsVideoReady,
    setIsStepByStepVideoReady,
  };
};