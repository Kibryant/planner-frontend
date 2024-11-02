import { View, FlatList, TouchableOpacity } from "react-native";
import { useCallback } from "react";
import type { ListRenderItem } from "react-native";
import { CarouselDots } from "./carousel-dots";
import { CarouselDownloadButton } from "./carousel-download-button";
import { CarouselImage } from "./carousel-image";
import { TriangleBackIcon } from "../icons/triangle-back-icon";
import { TriangleGoIcon } from "../icons/triangle-go-icon";
import { Video, ResizeMode } from "expo-av";
import { useCarousel } from "@/hooks/useCarousel";

interface CarouselProps {
  links: {
    name: string;
    url: string;
  }[];
}

export function Carousel({ links }: CarouselProps) {
  const {
    handleNext,
    handlePrev,
    downloadLink,
    isDownloading,
    flatListRef,
    onViewableItemsChanged,
    currentIndex,
  } = useCarousel({ links });

  const renderItem: ListRenderItem<{
    name: string;
    url: string;
  }> = useCallback(
    ({ item }) => {
      const isVideo = item.url.includes(".mp4");
      return (
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

          {isVideo ? (
            <Video
              source={{ uri: item.url }}
              resizeMode={ResizeMode.CONTAIN}
              style={{ width: 200, height: 180, borderRadius: 8 }}
              useNativeControls
            />
          ) : (
            <CarouselImage url={item.url} name={item.name} />
          )}
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
    },
    [handlePrev, handleNext, downloadLink, isDownloading],
  );

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
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        ref={flatListRef}
      />
      <CarouselDots total={links.length} currentIndex={currentIndex} />
    </>
  );
}
