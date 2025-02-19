import { Link, Redirect } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useUserStore } from "@/store/user-store";
import { useAdminStore } from "@/store/admin-store";
import { LoginForm } from "@/components/login-form";
import { logo } from "@/constants/logo";
import LanguageSelector from "@/components/language-selector";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const isTablet = width >= 768;

export default function Index() {
  const user = useUserStore((state) => state.user);
  const admin = useAdminStore((state) => state.admin);

  const { t } = useTranslation();

  if (admin) {
    return <Redirect href="/admin" />;
  }

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 bg-zinc-950 justify-center items-center px-8">
          <LanguageSelector />
          <View className={isTablet ? "mb-16" : "mb-12"}>
            <Image
              source={logo}
              style={{
                width: isTablet ? width * 0.4 : width * 0.5,
                height: isTablet ? width * 0.4 : width * 0.5,
              }}
              resizeMode="contain"
              accessibilityLabel="Logo da Mecha Turbo"
            />
          </View>

          <Text
            className="text-white font-zona-bold mb-2"
            style={{ fontSize: isTablet ? width * 0.08 : width * 0.06 }}
          >
            {t("Boas vindas")}!
          </Text>
          <Text
            className="text-gray-400 mb-6 font-zona-regular text-center"
            style={{ fontSize: isTablet ? width * 0.045 : width * 0.035 }}
          >
            {t("Faça seu login para acessar o planner")}
          </Text>

          <LoginForm />

          <Link href="/sign-in-admin" asChild>
            <TouchableOpacity
              className="mt-4"
              accessibilityRole="link"
              accessibilityLabel="Acesse como administrador"
              accessibilityHint="Clique para acessar como administrador"
              activeOpacity={0.8}
            >
              <Text
                className="text-gray-400 font-zona-regular"
                style={{ fontSize: isTablet ? width * 0.04 : width * 0.035 }}
              >
                {t("Acesse como administrador")}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}