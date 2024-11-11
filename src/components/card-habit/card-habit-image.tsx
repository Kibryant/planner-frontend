import React from "react";
import {
  View,
  Image,
  StyleSheet,
  type ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CarouselImageProps {
  source: ImageSourcePropType;
}

export function CardHabitImage({ source }: CarouselImageProps) {
  return (
    <View style={styles.imageContainer}>
      <Image source={source} style={styles.image} />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
