import LanguageSelector from "@/components/language-selector";
import { logo } from "@/constants/logo";
import { useLoginAdmin } from "@/hooks/useLoginAdmin";
import { useAdminStore } from "@/store/admin-store";
import { Link, Redirect } from "expo-router";
import React from "react";
import { Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const { width, height } = Dimensions.get("window");

const isTablet = width >= 768;

export default function Index() {
  const admin = useAdminStore((state) => state.admin);

  const { mutation, handleLogin, handleSubmit, control, errors } =
    useLoginAdmin();

  if (admin) {
    return <Redirect href="/admin" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          className="flex-1 bg-zinc-950 justify-center items-center px-8"
          style={{ paddingHorizontal: isTablet ? width * 0.1 : width * 0.05 }}
        >
          <LanguageSelector />
          <View
            className="mb-12"
            style={{ marginBottom: isTablet ? height * 0.08 : height * 0.05 }}
          >
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
            className="text-zinc-100 text-2xl font-zona-bold mb-2"
            style={{ fontSize: isTablet ? width * 0.08 : width * 0.06 }}
          >
            Boas vindas!
          </Text>
          <Text
            className="text-zinc-400 mb-6 text-center"
            style={{ fontSize: isTablet ? width * 0.045 : width * 0.04 }}
          >
            Faça seu login para acessar o painel administrativo
          </Text>

          <View className="w-full mb-4">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  className="w-full bg-zinc-800 text-white rounded-lg px-4"
                  style={{
                    height: isTablet ? 60 : 48,
                    fontSize: isTablet ? width * 0.04 : width * 0.035,
                  }}
                  placeholder="Código de acesso"
                  keyboardType="number-pad"
                  accessibilityLabel="Código de acesso"
                  placeholderTextColor="#ccc"
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="accessCode"
            />
            {errors.accessCode && (
              <Text
                className="text-red-500 font-zona-regular text-sm mb-2"
                style={{ fontSize: isTablet ? width * 0.035 : width * 0.03 }}
              >
                {errors.accessCode.message}
              </Text>
            )}
          </View>

          <View className="w-full mb-4">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  className="w-full bg-zinc-800 text-white rounded-lg px-4"
                  style={{
                    height: isTablet ? 60 : 48,
                    fontSize: isTablet ? width * 0.04 : width * 0.035,
                  }}
                  placeholder="Email"
                  keyboardType="email-address"
                  accessibilityLabel="Email"
                  placeholderTextColor="#ccc"
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text
                className="text-red-500 font-zona-regular text-sm mb-2"
                style={{ fontSize: isTablet ? width * 0.035 : width * 0.03 }}
              >
                {errors.email.message}
              </Text>
            )}
          </View>

          <View className="w-full mb-4">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  className="w-full bg-zinc-800 text-white rounded-lg px-4"
                  style={{
                    height: isTablet ? 60 : 48,
                    fontSize: isTablet ? width * 0.04 : width * 0.035,
                  }}
                  placeholder="Senha"
                  secureTextEntry
                  accessibilityLabel="Senha"
                  placeholderTextColor="#ccc"
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text
                className="text-red-500 font-zona-regular text-sm mb-2"
                style={{ fontSize: isTablet ? width * 0.035 : width * 0.03 }}
              >
                {errors.password.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className={`w-full rounded-lg justify-center items-center ${
              mutation.isPending ? "bg-primary/80" : "bg-primary"
            }`}
            style={{
              height: isTablet ? 60 : 48,
            }}
            accessibilityRole="button"
            accessibilityLabel="Botão de acessar"
            accessibilityHint="Clique para fazer login"
            activeOpacity={0.8}
            onPress={handleSubmit(handleLogin)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text
                className="text-center text-white font-zona-bold"
                style={{ fontSize: isTablet ? width * 0.045 : width * 0.035 }}
              >
                Acessar
              </Text>
            )}
          </TouchableOpacity>

          <Link href="/" asChild>
            <TouchableOpacity
              className="mt-4"
              accessibilityRole="link"
              accessibilityLabel="Acesse como usuário"
              accessibilityHint="Clique para acessar como usuário"
              activeOpacity={0.8}
            >
              <Text
                className="text-zinc-400 text-sm font-zona-regular"
                style={{ fontSize: isTablet ? width * 0.04 : width * 0.035 }}
              >
                Acesse como usuário
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}