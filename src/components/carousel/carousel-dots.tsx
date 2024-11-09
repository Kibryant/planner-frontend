import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useCarouselDots } from "@/hooks/useCarouselDots";

interface CarouselDotsProps {
  total: number;
  currentIndex: number;
}

export function CarouselDots({ total, currentIndex }: CarouselDotsProps) {
  const { animatedStyles } = useCarouselDots({ total, currentIndex });

  return (
    <View className="flex-row items-center gap-x-2 justify-center my-3">
      {Array.from({ length: total }).map((_, index) => (
        <Animated.View
          key={`dot-${index + 1}`}
          style={[animatedStyles[index], { height: 4, borderRadius: 4 }]}
        />
      ))}
    </View>
  );
}
