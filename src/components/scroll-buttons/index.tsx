import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface ScrollButtonsProps {
  onScrollToTop: () => void;
  onScrollToBottom: () => void;
}

export function ScrollButtons({
  onScrollToTop,
  onScrollToBottom,
}: ScrollButtonsProps) {
  return (
    <>
      <TouchableOpacity
        onPress={onScrollToTop}
        style={{
          position: "absolute",
          top: 130,
          alignSelf: "center",
          backgroundColor: "#FF005E",
          borderRadius: 20,
          padding: 10,
        }}
      >
        <Feather name="arrow-up" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onScrollToBottom}
        style={{
          position: "absolute",
          bottom: 44,
          alignSelf: "center",
          backgroundColor: "#FF005E",
          borderRadius: 20,
          padding: 10,
        }}
      >
        <Feather name="arrow-down" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}
