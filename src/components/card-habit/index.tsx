import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import type {
  ImageSourcePropType,
  ListRenderItem,
  ViewToken,
} from "react-native";

const images = [
  require("@/assets/images/bancada.png"),
  require("@/assets/images/bancada.png"),
  require("@/assets/images/bancada.png"),
  require("@/assets/images/bancada.png"),
  require("@/assets/images/bancada.png"),
];

export function CardHabit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

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
      {/* Título */}
      <View className="p-6">
        <Text className="text-zinc-100 text-2xl font-zona-semibold max-w-60">
          Organização da bancada e sala
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

      {/* Tracinhos de navegação */}
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
    width: 284,
    backgroundColor: "#4F001D",
    borderRadius: 24,
    overflow: "hidden",
  },
  titleContainer: {
    padding: 16,
    backgroundColor: "#4F001D",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: "#F0F0F0",
    fontSize: 24,
    fontFamily: "zona-semibold",
    textAlign: "center",
  },
  imageContainer: {
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 284,
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
