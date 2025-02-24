import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { TIPS } from "@/constants/tips";
import { useTranslation } from "react-i18next";

export function TipList() {
        const { i18n } = useTranslation();
  return (
    <View className="items-center mb-4">
      {TIPS.map((tip, index) => {
        if (i18n.language === "es" && tip.title === "ARRAIAÁ BEAUTY") {
            return null;
        }

        return (
            <Link
            key={`${tip.thumbnail}-${index}`}
            href={`/shares-to-sell/${index}`}
            asChild
          >
            <TouchableOpacity key={`${tip.thumbnail}-${index}`} className="mb-4">
              <Image
                source={{ uri: i18n.language === "es" ? tip.thumbnailSpanish : tip.thumbnail }}
                className="w-60 h-36 rounded-lg"
              />
            </TouchableOpacity>
          </Link>
        )
      }
        )}
    </View>
  );
}
