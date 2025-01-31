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

interface UseCarouselProps {
  links: {
    name: string;
    url: string;
  }[];
}

export const useCarousel = ({ links }: UseCarouselProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatListType>(null);

  const downloadLink = useCallback(() => {
    const { url, name } = links[currentIndex];

    const fileSystem = FileSystem.documentDirectory
    
    setIsDownloading(true);
    
    FileSystem.downloadAsync(url, fileSystem + name)
      .then(({ uri }) => {
        MediaLibrary.saveToLibraryAsync(uri).then(() => {
          Toast.show({
            type: "success",
            text1: "Salvo na galeria",
            text2: "O arquivo foi salvo na galeria com sucesso",
          });
        });
      })
      .catch((error) => {
        console.log(error)

        Toast.show({
          type: "error",
          text1: "Erro ao baixar",
          text2: "Ocorreu um erro ao baixar o arquivo",
        });
      })
      .finally(() => {
        setIsDownloading(false);
      });
  }, [currentIndex, links]);

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
