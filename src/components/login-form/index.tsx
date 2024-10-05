import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userLoginSchema,
  type UserLoginSchema,
} from "@/schema/user-login-schema";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useUserStore } from "@/store/user-store";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginSchema>({
    resolver: zodResolver(userLoginSchema),
  });

  const { login } = useUserStore();

  const mutation = useMutation({
    mutationKey: ["user-login"],
    mutationFn: login,
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: error.message,
      });
    },
  });

  const handleLogin = ({ email, password }: UserLoginSchema) => {
    mutation.mutate({ email: email.toLowerCase(), password });
  };

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
        className={`w-full h-12 rounded-lg justify-center items-center ${
          mutation.isPending ? "bg-gray-400" : "bg-primary"
        }`}
        accessibilityRole="button"
        accessibilityLabel="Botão de acessar"
        accessibilityHint="Clique para fazer login"
        activeOpacity={0.8}
        onPress={handleSubmit(handleLogin)}
        disabled={mutation.isPending}
      >
        <Text className="text-white text-lg" style={{ fontSize: width * 0.05 }}>
          Acessar
        </Text>
      </TouchableOpacity>
    </>
  );
}
