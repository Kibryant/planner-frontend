import { logoHorizontal } from "@/constants/logo-horizontal";
import {
  type AdminLoginSchema,
  adminLoginSchema,
} from "@/schema/admin-login-schema";
import { useAdminStore } from "@/store/admin-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, Redirect, router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
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
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const { login, admin } = useAdminStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      accessCode: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["admin-login"],
    mutationFn: login,
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: error.message,
      });
    },
    onSuccess: () => {
      router.replace("/admin");
    },
  });

  const handleLogin = (data: AdminLoginSchema) => {
    mutation.mutate(data);
  };

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
          <View className="mb-12" style={{ marginBottom: height * 0.05 }}>
            <Image
              source={logoHorizontal} // Substitua pela logo correta
              className="w-[265.54px] h-[111.38px]"
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
            className={`w-full h-12 rounded-lg justify-center items-center ${
              mutation.isPending ? "bg-primary/80" : "bg-primary"
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
