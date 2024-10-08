import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import type {
  ImageSourcePropType,
  ListRenderItem,
  ViewToken,
} from "react-native";

export type HabitType = "Diário" | "Semanal" | "Mensal";

const habitImages: Record<HabitType, ImageSourcePropType[]> = {
  Diário: [
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
  ],
  Semanal: [
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
  ],
  Mensal: [
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
  ],
};

const habitTitles: Record<HabitType, string> = {
  Diário: "Organização diária da bancada e sala",
  Semanal: "Revisão semanal dos processos",
  Mensal: "Planejamento mensal da equipe",
};

interface CardHabitProps {
  selectedHabit: HabitType;
}

export function CardHabit({ selectedHabit }: CardHabitProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = habitImages[selectedHabit];
  const carouselRef = useRef<FlatList<ImageSourcePropType> | null>(null);
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
    viewAreaCoveragePercentThreshold: 50,
  };

  const renderItem: ListRenderItem<ImageSourcePropType> = ({ item }) => (
    <View style={[styles.imageContainer]}>
      <Image source={item} style={styles.image} />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View className="p-6">
        <Text className="text-zinc-100 text-2xl font-zona-regular max-w-60">
          {habitTitles[selectedHabit] || "Hábito selecionado"}
        </Text>
      </View>

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

      <View style={styles.sliderContainer}>
        {images.map((_, index) => (
          <View
            key={`slider-line-${index + 1}`}
            style={[
              styles.sliderLine,
              index === activeIndex ? styles.activeLine : null,
            ]}
          />
        ))}
      </View>
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
  imageContainer: {
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
  },
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
