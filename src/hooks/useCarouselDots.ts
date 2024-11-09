/* eslint-disable react-hooks/rules-of-hooks */
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import { useEffect } from "react";

interface UseCarouselDotsProps {
  total: number;
  currentIndex: number;
}

export const useCarouselDots = ({
  total,
  currentIndex,
}: UseCarouselDotsProps) => {
  const widthValues = Array.from({ length: total }, () => useSharedValue(6));
  const colorValues = Array.from({ length: total }, () => useSharedValue(0));

  useEffect(() => {
    widthValues.forEach((width, index) => {
      width.value = withTiming(currentIndex === index ? 10 : 6, {
        duration: 300,
      });
    });

    colorValues.forEach((color, index) => {
      color.value = withTiming(currentIndex === index ? 1 : 0, {
        duration: 300,
      });
    });
  }, [currentIndex, widthValues, colorValues]);

  const animatedStyles = widthValues.map((_, index) =>
    useAnimatedStyle(() => ({
      width: widthValues[index].value,
      backgroundColor: interpolateColor(
        colorValues[index].value,
        [0, 1],
        ["#fff", "#FB005D"],
      ),
    })),
  );

  return { animatedStyles };
};
