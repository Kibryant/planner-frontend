import { useState, useRef } from "react";
import { View, Text, Pressable, Animated, Easing } from "react-native";
import { useTranslation } from "react-i18next";
import { Flags } from "../icons/flags";

export default function LanguageSelector() {
  const [isVisible, setIsVisible] = useState(false);
  const { t, i18n } = useTranslation();


  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleLanguageBox = () => {
    if (isVisible) {
    
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => setIsVisible(false));
    } else {
    
      setIsVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    toggleLanguageBox();
  };


  const slideInterpolation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  return (
    <View className="absolute top-16 right-4 size-8">
      <Pressable onPress={toggleLanguageBox}>
        {i18n.language === "pt" && <Flags.Br />}
        {i18n.language === "es" && <Flags.Es />}
        {i18n.language === "en" && <Flags.Br />}
      </Pressable>

      {isVisible && (
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideInterpolation }],
          }}
          className="absolute top-12 right-0 bg-black border border-primary rounded-lg p-4 w-48 z-50"
        >
          <Text className="text-xl font-zona-bold mb-4 text-gray-100">
            {t("Selecione o idioma")}
          </Text>

          <Pressable
            onPress={() => changeLanguage("pt")}
            className={`border border-primary px-3 py-2 rounded-md mb-2 ${
              i18n.language === "pt" ? "bg-primary" : ""
            }`}
          >
            <Text className="font-zona-regular text-gray-100">{t("Português")}</Text>
          </Pressable>

          <Pressable
            onPress={() => changeLanguage("es")}
            className={`border border-primary px-3 py-2 rounded-md mb-2 ${
              i18n.language === "es" ? "bg-primary" : ""
            }`}
          >
            <Text className="font-zona-regular text-gray-100">{t("Espanhol")}</Text>
          </Pressable>

          <Pressable
            onPress={toggleLanguageBox}
            className="mt-4 px-3 py-2 bg-primary rounded-md"
          >
            <Text className="text-center text-gray-100 font-zona-bold">{t("Fechar")}</Text>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}