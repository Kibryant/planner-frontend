import { useRef, useState, useEffect, useCallback } from "react";
import type { FlatList, ImageSourcePropType, ViewToken } from "react-native";

export const useCardHabit = (imagesLength: number) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef<FlatList<ImageSourcePropType> | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % imagesLength);
  }, [imagesLength]);

  useEffect(() => {
    carouselRef.current?.scrollToIndex({
      index: activeIndex,
      animated: true,
    });
  }, [activeIndex]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);

    return () => clearInterval(intervalId);
  }, [nextSlide]);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 99.5,
  };

  return {
    activeIndex,
    carouselRef,
    onViewableItemsChanged,
    viewabilityConfig,
  };
};
