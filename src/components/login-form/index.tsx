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
  const { control, errors, handleSubmit, handleLogin, mutation } = useLogin();

  return (
    <>
      <View className="w-full mb-2">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              placeholder="Email"
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
        {errors.email && (
          <Text
            className="text-red-500 text-sm"
            style={{ fontSize: width * 0.035 }}
          >
            {errors.email.message}
          </Text>
        )}
      </View>

      <View className="w-full mb-2">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              placeholder="Senha"
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
        {errors.password && (
          <Text
            className="text-red-500 text-sm"
            style={{ fontSize: width * 0.035 }}
          >
            {errors.password.message}
          </Text>
        )}
      </View>

      <TouchableOpacity
        // eslint-disable-next-line prettier/prettier
        className={`w-full h-12 rounded-lg justify-center items-center ${mutation.isPending ? "bg-gray-400" : "bg-primary"
          // eslint-disable-next-line prettier/prettier
          }`}
        accessibilityRole="button"
        accessibilityLabel="Botão de acessar"
        accessibilityHint="Clique para fazer login"
        activeOpacity={0.8}
        onPress={handleSubmit(handleLogin)}
        disabled={mutation.isPending}
      >
        <Text className="text-center text-white font-zona-bold">Acessar</Text>
      </TouchableOpacity>
    </>
  );
}
