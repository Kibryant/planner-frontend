import { habitImages } from "@/constants/habit-images";
import { habitTitles } from "@/constants/habit-titles";
import { useCardHabit } from "@/hooks/useCardHabit";
import type { HabitType } from "@/types/habit-type";
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import type { ImageSourcePropType, ListRenderItem } from "react-native";
import { CardHabitImage } from "./card-habit-image";
import { CardHabitTitle } from "./card-habit-title";
import { CardHabitSliderIndicator } from "./card-habit-slider-indicator";

interface CardHabitProps {
  selectedHabit: HabitType;
}

export function CardHabit({ selectedHabit }: CardHabitProps) {
  const images = habitImages[selectedHabit];

  const imagesLength = images.length;

  const {
    activeIndex,
    onViewableItemsChanged,
    viewabilityConfig,
    carouselRef,
  } = useCardHabit(imagesLength);

  const renderItem: ListRenderItem<ImageSourcePropType> = ({ item }) => (
    <CardHabitImage source={item} />
  );

  return (
    <View style={styles.container}>
      <CardHabitTitle title={habitTitles[selectedHabit][activeIndex]} />

      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal
        keyExtractor={(_, index) => `image-${index}`}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ref={carouselRef}
      />

      <CardHabitSliderIndicator
        itemCount={imagesLength}
        activeIndex={activeIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    backgroundColor: "#4F001D",
    borderRadius: 24,
    overflow: "hidden",
  },
});
