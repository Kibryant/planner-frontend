import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Controller } from "react-hook-form";
import { useLogin } from "@/hooks/useLogin";

const { width } = Dimensions.get("window");

export function LoginForm() {
  const { t, control, errors, handleSubmit, handleLogin, mutation } = useLogin();

  return (
    <>
      <View className="w-full mb-2">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              placeholder={t("Email")}
              placeholderTextColor="#ccc"
              className="w-full h-12 bg-zinc-800 text-zinc-100 rounded-lg px-4"
              accessibilityLabel="Campo de email"
              accessibilityHint="Digite seu endereço de email"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="email"
        />
        {errors.email?.message && (
          <Text
            className="text-red-500 text-sm"
            style={{ fontSize: width * 0.035 }}
          >
            {t(errors.email.message)}
          </Text>
        )}
      </View>

      <View className="w-full mb-2">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              placeholder={t("Senha")}
              placeholderTextColor="#ccc"
              className="w-full h-12 bg-zinc-800 text-white rounded-lg px-4"
              accessibilityLabel="Campo de senha"
              accessibilityHint="Digite sua senha"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="password"
        />
        {errors.password?.message && (
          <Text
            className="text-red-500 text-sm"
            style={{ fontSize: width * 0.035 }}
          >
            {t(errors.password.message)}
          </Text>
        )}
      </View>

      <TouchableOpacity
        className={`w-full h-12 rounded-lg justify-center items-center ${mutation.isPending ? "bg-gray-400" : "bg-primary"
          }`}
        accessibilityRole="button"
        accessibilityLabel="Botão de acessar"
        accessibilityHint="Clique para fazer login"
        activeOpacity={0.8}
        onPress={handleSubmit(handleLogin)}
        disabled={mutation.isPending}
      >
        <Text className="text-center text-white font-zona-bold">
            {t("Acessar")}
        </Text>
      </TouchableOpacity>
    </>
  );
}
