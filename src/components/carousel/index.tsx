import { View, FlatList, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";
import type {
  ListRenderItem,
  ViewToken,
  FlatList as FlatListType,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";
import { CarouselDots } from "./carousel-dots";
import { CarouselDownloadButton } from "./carousel-download-button";
import { CarouselImage } from "./carousel-image";
import { TriangleBackIcon } from "../icons/triangle-back-icon";
import { TriangleGoIcon } from "../icons/triangle-go-icon";

interface CarouselProps {
  links: {
    name: string;
    url: string;
  }[];
}

export function Carousel({ links }: CarouselProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatListType>(null);

  const downloadLink = () => {
    const { url, name } = links[currentIndex];
    setIsDownloading(true);
    FileSystem.downloadAsync(url, FileSystem.documentDirectory + name)
      .then(({ uri }) => {
        MediaLibrary.saveToLibraryAsync(uri).then(() => {
          setIsDownloading(false);
          Toast.show({
            type: "success",
            text1: "Salvo na galeria",
            text2: "O arquivo foi salvo na galeria com sucesso",
          });
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Erro ao baixar",
          text2: "Ocorreu um erro ao baixar o arquivo",
        });
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  const onViewableItemsChanged = (event: { viewableItems: ViewToken[] }) => {
    setCurrentIndex(event.viewableItems[0]?.index || 0);
  };

  const renderItem: ListRenderItem<{
    name: string;
    url: string;
  }> = ({ item }) => (
    <View className="items-center justify-center mt-3 w-96">
      <View className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <TouchableOpacity
          className="h-[18px] w-[18px] bg-primary rounded items-center justify-center"
          onPress={handlePrev}
        >
          <TriangleBackIcon
            width={7.5}
            height={10.5}
            style={{
              transform: [{ translateX: -3.75 }, { translateY: -5.25 }],
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        </TouchableOpacity>
      </View>
      <CarouselImage url={item.url} name={item.name} />
      <View className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <TouchableOpacity
          className="h-[18px] w-[18px] bg-primary rounded items-center justify-center"
          onPress={handleNext}
        >
          <TriangleGoIcon
            width={7.5}
            height={10.5}
            style={{
              transform: [{ translateX: -3.75 }, { translateY: -5.25 }],
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        </TouchableOpacity>
      </View>
      <CarouselDownloadButton
        isDownloading={isDownloading}
        onPress={downloadLink}
        fileName={item.name}
      />
    </View>
  );

  const handleNext = () => {
    if (currentIndex < links.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex });
    }
  };

  return (
    <>
      <FlatList
        data={links}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        ref={flatListRef}
      />

      <CarouselDots total={links.length} currentIndex={currentIndex} />
    </>
  );
}
