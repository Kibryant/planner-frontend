import { View } from "react-native";

interface CarouselDotsProps {
  total: number;
  currentIndex: number;
}

export function CarouselDots({ total, currentIndex }: CarouselDotsProps) {
  return (
    <View className="flex-row items-center gap-x-2 justify-center my-3">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={`dot-${index + 1}`}
          className={`h-1 rounded-full ${
            currentIndex === index ? "w-2.5 bg-primary" : "w-1.5 bg-zinc-100"
          }`}
        />
      ))}
    </View>
  );
}
