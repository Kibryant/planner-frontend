import React from "react";
import { ScrollView } from "react-native";
import { TipItem } from "../grow-tip-item";
import { tipsToGrow } from "@/constants/tips-to-grow";

export function TipsList() {
  return (
    <ScrollView className="mt-5 px-2 py-4" persistentScrollbar>
      {tipsToGrow.map((tip) => (
        <TipItem key={tip.id} text={tip.text} id={tip.id} />
      ))}
    </ScrollView>
  );
}
