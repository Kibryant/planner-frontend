import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { TIPS } from "@/constants/tips";

export function TipList() {
  return (
    <View className="items-center mb-4">
      {TIPS.map((tip, index) => (
        <Link
          key={`${tip.thumbnail}-${index}`}
          href={`/shares-to-sell/${index}`}
          asChild
        >
          <TouchableOpacity key={`${tip.thumbnail}-${index}`} className="mb-4">
            <Image
              source={{ uri: tip.thumbnail }}
              className="w-60 h-36 rounded-lg"
            />
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}
