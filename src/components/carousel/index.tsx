import { FlatList } from "react-native";
import { useCallback } from "react";
import type { ListRenderItem } from "react-native";
import { CarouselDots } from "./carousel-dots";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselSlide } from "./carousel-slide";

interface CarouselProps {
  links: {
    name: string;
    url: string;
  }[];
}

export function Carousel({ links }: CarouselProps) {
  const {
    handlePrev,
    handleNext,
    downloadLink,
    isDownloading,
    onViewableItemsChanged,
    currentIndex,
    flatListRef,
    onMomentumScrollEnd,
  } = useCarousel({
    links,
  });

  const renderItem: ListRenderItem<{
    name: string;
    url: string;
  }> = useCallback(
    ({ item }) => (
      <CarouselSlide
        item={item}
        handlePrev={handlePrev}
        handleNext={handleNext}
        downloadLink={downloadLink}
        isDownloading={isDownloading}
      />
    ),
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
        ref={flatListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />

      <CarouselDots total={links.length} currentIndex={currentIndex} />
    </>
  );
}
