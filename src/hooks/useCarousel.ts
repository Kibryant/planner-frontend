import { useState, useRef, useCallback } from "react";
import type {
    ViewToken,
    FlatList as FlatListType,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";
import { SLIDE_WIDTH } from "@/constants/slide-width";
import { useTranslation } from "react-i18next";

interface UseCarouselProps {
  links: {
    name: string;
    url: string;
  }[];
}

export const useCarousel = ({ links }: UseCarouselProps) => {
    const { t } = useTranslation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatListType>(null);

  const downloadLink = useCallback(async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
  
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: t("Permissão negada"),
        text2: t("É necessário permitir o acesso à galeria para salvar o arquivo"),
      });
      return;
    }
  
    const { url, name } = links[currentIndex];
  
    const fileSystem = FileSystem.documentDirectory;
  
    if (!fileSystem) {
      Toast.show({
        type: "error",
        text1: t("Erro de diretório"),
        text2: t("O diretório de documentos não está disponível"),
      });
      return;
    }
  
    setIsDownloading(true);
  
    try {
      const fileUri = fileSystem + name;
  
      const downloadResult = await FileSystem.downloadAsync(url, fileUri);

      console.log(downloadResult.mimeType)
  
      const fileInfo = await FileSystem.getInfoAsync(downloadResult.uri);

      if (!fileInfo.exists || fileInfo.size === 0) {
        Toast.show({
          type: "error",
          text1: t("Erro ao baixar"),
          text2: t("O arquivo está vazio ou não foi baixado corretamente"),
        });
        return;
      }
    
      try {  
        await MediaLibrary.saveToLibraryAsync(downloadResult.uri);
  
        Toast.show({
          type: "success",
          text1: t("Salvo na galeria"),
          text2: t("O arquivo foi salvo na galeria com sucesso")
        });
      } catch (error) {
        console.error("Erro ao criar ativo ou salvar na galeria:", error);
        Toast.show({
          type: "error",
          text1: t("Erro ao salvar"),
          text2: t("O arquivo não é um tipo de mídia suportado"),
        });
      }
    } catch (error) {
      console.error("Erro ao baixar ou salvar o arquivo:", error);
      Toast.show({
        type: "error",
        text1: t("Erro ao salvar"),
        text2: t("Ocorreu um erro ao salvar o arquivo na galeria"),
      });
    } finally {
      setIsDownloading(false);
    }
  }, [currentIndex, links, t]);

  const onViewableItemsChanged = useCallback(
    (event: { viewableItems: ViewToken[] }) => {
      setCurrentIndex(event.viewableItems[0]?.index || 0);
    },
    [],
  );

  const handleNext = useCallback(() => {
    if (currentIndex < links.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex });
    }
  }, [currentIndex, links.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex });
    }
  }, [currentIndex]);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / SLIDE_WIDTH);
    setCurrentIndex(newIndex);
  };

  return {
    isDownloading,
    downloadLink,
    onViewableItemsChanged,
    handleNext,
    handlePrev,
    flatListRef,
    currentIndex,
    onMomentumScrollEnd,
  };
};