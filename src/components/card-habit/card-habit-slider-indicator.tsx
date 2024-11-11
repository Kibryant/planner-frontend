import React from "react";
import { View, StyleSheet } from "react-native";

interface SliderIndicatorProps {
  itemCount: number;
  activeIndex: number;
}

export function CardHabitSliderIndicator({
  itemCount,
  activeIndex,
}: SliderIndicatorProps) {
  return (
    <View style={styles.sliderContainer}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <View
          key={`slider-line-${index + 1}`}
          style={[
            styles.sliderLine,
            index === activeIndex ? styles.activeLine : null,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
  },
  sliderLine: {
    width: 20,
    height: 1,
    zIndex: 999,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
    borderRadius: 999,
  },
  activeLine: {
    backgroundColor: "#FFFFFF",
    width: 40,
  },
});
