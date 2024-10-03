import { View, Text, FlatList, Image } from "react-native";
import type { ListRenderItem, ViewToken } from "react-native";
import { DownloadIcon } from "../icons/download-icon";
import { useState } from "react";

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

  const onViewableItemsChanged = (event: { viewableItems: ViewToken[] }) => {
    setCurrentIndex(event.viewableItems[0].index || 0);
  };

  const renderItem: ListRenderItem<{
    name: string;
    url: string;
  }> = ({ item }) => {
    return (
      <View className="items-center justify-center w-64">
        <Image
          source={{ uri: item.url }}
          className="rounded-lg mb-3"
          style={{ width: 160, height: 180 }}
          accessible={true}
          accessibilityLabel={`Imagem do arquivo ${item.name}`}
        />
        <View className="flex-row items-center gap-x-2 mt-4">
          <DownloadIcon />
          <Text className="text-zinc-100 text-base font-zona-semibold">
            {item.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScrollToIndexFailed={() => {}}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <View className="flex-row items-center gap-x-2 justify-center mb-2">
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
