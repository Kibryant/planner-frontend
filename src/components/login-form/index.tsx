import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Controller } from "react-hook-form";
import { useLogin } from "@/hooks/useLogin";

const { width } = Dimensions.get("window");

const isTablet = width >= 768;

export function LoginForm() {
  const { t, control, errors, handleSubmit, handleLogin, mutation } = useLogin();

  return (
    <>
      <View className="w-full mb-4">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              placeholder={t("Email")}
              placeholderTextColor="#ccc"
              className="w-full bg-zinc-800 text-zinc-100 rounded-lg px-4"
              style={{
                height: isTablet ? 60 : 48,
                fontSize: isTablet ? width * 0.04 : width * 0.035,
              }}
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
            style={{ fontSize: isTablet ? width * 0.04 : width * 0.035 }}
          >
            {t(errors.email.message)}
          </Text>
        )}
      </View>

      <View className="w-full mb-4">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              placeholder={t("Senha")}
              placeholderTextColor="#ccc"
              className="w-full bg-zinc-800 text-white rounded-lg px-4"
              style={{
                height: isTablet ? 60 : 48,
                fontSize: isTablet ? width * 0.04 : width * 0.035,
              }}
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
            style={{ fontSize: isTablet ? width * 0.04 : width * 0.035 }}
          >
            {t(errors.password.message)}
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
            {t("Acessar")}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
}