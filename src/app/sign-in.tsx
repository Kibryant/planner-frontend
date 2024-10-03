import { logoHorizontal } from "@/constants/logo-horizontal";
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

const { width } = Dimensions.get("window");

export default function Index() {
  const user = useUserStore((state) => state.user);
  const admin = useAdminStore((state) => state.admin);

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
          <View className="mb-12">
            <Image
              source={logoHorizontal} // Substitua pela logo correta
              className="w-[265.54px] h-[111.38px]"
              resizeMode="contain"
              accessibilityLabel="Logo da Mecha Turbo"
            />
          </View>

          <Text
            className="text-white text-2xl font-zona-bold mb-2"
            style={{ fontSize: width * 0.06 }}
          >
            Boas vindas!
          </Text>
          <Text
            className="text-gray-400 mb-6"
            style={{ fontSize: width * 0.04 }}
          >
            Faca seu login para acessar o planner
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
                className="text-gray-400 text-sm font-zona-regular"
                style={{ fontSize: width * 0.035 }}
              >
                Acesse como administrador
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
