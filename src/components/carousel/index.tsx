import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import type {
  ListRenderItem,
  ViewToken,
  FlatList as FlatListType,
} from "react-native";
import { DownloadIcon } from "../icons/download-icon";
import { useState, useRef } from "react";
import { TriangleBackIcon } from "../icons/triangle-back-icon";
import { TriangleGoIcon } from "../icons/triangle-go-icon";

const images = [
  {
    name: "camuflagem-feed.png",
    url: "https://img.youtube.com/vi/yBnZsWGtaqs/hqdefault.jpg",
  },
  {
    name: "camuflagem-feed2.png",
    url: "https://img.youtube.com/vi/yBnZsWGtaqs/hqdefault.jpg",
  },
  {
    name: "camuflagem-feed3.png",
    url: "https://img.youtube.com/vi/yBnZsWGtaqs/hqdefault.jpg",
  },
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatListType>(null);

  const onViewableItemsChanged = (event: { viewableItems: ViewToken[] }) => {
    setCurrentIndex(event.viewableItems[0]?.index || 0);
  };

  const renderItem: ListRenderItem<{
    name: string;
    url: string;
  }> = ({ item }) => {
    return (
      <View className="items-center justify-center mt-3 w-96">
        {/* Botão de navegação para a esquerda */}
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

        {/* Imagem */}
        <Image
          source={{ uri: item.url }}
          className="rounded-lg mb-3"
          style={{ width: 200, height: 180 }}
          accessible={true}
          accessibilityLabel={`Imagem do arquivo ${item.name}`}
        />

        {/* Botão de navegação para a direita */}
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

        <View className="flex-row items-center gap-x-2 mt-4 w-full justify-center">
          <DownloadIcon />
          <Text className="text-zinc-100 text-base font-zona-semibold">
            {item.name}
          </Text>
        </View>
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
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
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        ref={flatListRef}
      />

      <View className="flex-row items-center gap-x-2 justify-center my-3">
        {images.map((image, index) => (
          <View
            key={image.name}
            className={`h-1 rounded-full ${
              currentIndex === index ? "w-2.5 bg-primary" : "w-1.5 bg-zinc-100"
            }`}
          />
        ))}
      </View>
    </>
  );
}
