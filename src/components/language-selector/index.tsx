import { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { Flags } from "../icons/flags";

export default function LanguageSelector() {
  const [modalVisible, setModalVisible] = useState(false);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View className="absolute top-16 right-4 size-8">
      <Pressable onPress={() => setModalVisible(true)}>
        {i18n.language === "pt" && <Flags.Br />}
        {i18n.language === "es" && <Flags.Es />}
        {i18n.language === "en" && <Flags.Br />}
      </Pressable>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/90">
          <View className="border border-primary w-3/4 p-4 rounded-lg">
            <Text className="text-xl font-zona-bold mb-4 text-gray-100">
              {t("Selecione o idioma")}
            </Text>

            <Pressable
              onPress={() => {
                changeLanguage("pt");
                setModalVisible(false);
              }}
              className={`border border-primary px-3 py-2 rounded-md mb-2 ${i18n.language === "pt" ? "bg-primary" : ""}`}
            >
              <Text className="font-zona-regular text-gray-100">{t("Português")}</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                changeLanguage("es");
                setModalVisible(false);
              }}
              className={`border border-primary px-3 py-2 rounded-md mb-2 ${i18n.language === "es" ? "bg-primary" : ""}`}
            >
              <Text className="font-zona-regular text-gray-100">{t("Espanhol")}</Text>
            </Pressable>

            <Pressable
              onPress={() => setModalVisible(false)}
              className="mt-4 px-3 py-2 bg-primary rounded-md"
            >
              <Text className="text-center text-gray-100 font-zona-bold">{t("Fechar")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}