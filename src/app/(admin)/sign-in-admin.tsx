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
          style={{ paddingHorizontal: width * 0.05 }}
        >
            <LanguageSelector />
          <View className="mb-12" style={{ marginBottom: height * 0.05 }}>
            <Image
              source={logo}
              style={{ width: width * 0.5, height: width * 0.5 }}
              resizeMode="contain"
              accessibilityLabel="Logo da Mecha Turbo"
            />
          </View>

          <Text
            className="text-zinc-100 text-2xl font-zona-bold mb-2"
            style={{ fontSize: width * 0.06 }}
          >
            Boas vindas!
          </Text>
          <Text
            className="text-zinc-400 mb-6 text-center"
            style={{ fontSize: width * 0.04 }}
          >
            Faca seu login para acessar o painel administrativo
          </Text>
          <View className="w-full mb-2">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  className="w-full h-12 bg-zinc-800 text-white rounded-lg px-4"
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
              <Text className="text-red-500 font-zona-regular text-sm mb-2">
                {errors.accessCode.message}
              </Text>
            )}
          </View>

          <View className="w-full mb-2">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  className="w-full h-12 bg-zinc-800 text-white rounded-lg px-4"
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
              <Text className="text-red-500 font-zona-regular text-sm mb-2">
                {errors.email.message}
              </Text>
            )}
          </View>

          <View className="w-full mb-2">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  className="w-full h-12 bg-zinc-800 text-white rounded-lg px-4"
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
              <Text className="text-red-500 font-zona-regular text-sm mb-2">
                {errors.password.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            // eslint-disable-next-line prettier/prettier
            className={`w-full h-12 rounded-lg justify-center items-center ${mutation.isPending ? "bg-primary/80" : "bg-primary"
              // eslint-disable-next-line prettier/prettier
              }`}
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
              <Text className="text-center text-white font-zona-bold">
                Acessar
              </Text>
            )}
          </TouchableOpacity>

          <Link href="/" asChild>
            <TouchableOpacity
              className="mt-4"
              accessibilityRole="link"
              accessibilityLabel="Acesse como administrador"
              accessibilityHint="Clique para acessar como administrador"
              activeOpacity={0.8}
            >
              <Text
                className="text-zinc-400 text-sm font-zona-regular"
                style={{ fontSize: width * 0.035 }}
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
