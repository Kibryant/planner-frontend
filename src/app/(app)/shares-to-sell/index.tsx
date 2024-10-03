import React, { useRef } from "react";
import { ScrollView } from "react-native";
import { TipList } from "@/components/tips-list";
import { ScrollButtons } from "@/components/scroll-buttons";
import { Layout } from "@/components/layout";

export default function SharesToSell() {
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <Layout title="Ações para Vender">
      <ScrollView className="flex-1 my-20" ref={scrollViewRef}>
        <TipList />
      </ScrollView>
      <ScrollButtons
        onScrollToTop={scrollToTop}
        onScrollToBottom={scrollToBottom}
      />
    </Layout>
  );
}
