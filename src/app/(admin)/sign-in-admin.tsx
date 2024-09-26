import { logoHorizontal } from "@/constants/logo-horizontal";
import { Link, router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const handleLogin = () => {
    router.push("/home");
  };

  return (
    <View
      className="flex-1 bg-black justify-center items-center px-8"
      style={{ paddingHorizontal: width * 0.05 }}
    >
      {/* Logo */}
      <View className="mb-12" style={{ marginBottom: height * 0.05 }}>
        <Image
          source={logoHorizontal} // Substitua pela logo correta
          className="w-[265.54px] h-[111.38px]"
          resizeMode="contain"
          accessibilityLabel="Logo da Mecha Turbo"
        />
      </View>

      {/* Título */}
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

      <TextInput
        placeholder="Código de acesso"
        placeholderTextColor="#ccc"
        className="w-full h-12 bg-zinc-800 text-zinc-100 rounded-lg px-4 mb-4"
        accessibilityLabel="Campo de código de acesso"
        accessibilityHint="Digite o código de acesso"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Input de email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        className="w-full h-12 bg-zinc-800 text-zinc-100 rounded-lg px-4 mb-4"
        accessibilityLabel="Campo de email"
        accessibilityHint="Digite seu endereço de email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Input de senha */}
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        className="w-full h-12 bg-zinc-800 text-zinc-100 rounded-lg px-4 mb-6"
        accessibilityLabel="Campo de senha"
        accessibilityHint="Digite sua senha"
        autoCapitalize="none"
      />

      {/* Botão de login */}
      <TouchableOpacity
        className="w-full h-12 bg-primary rounded-lg justify-center items-center"
        accessibilityRole="button"
        accessibilityLabel="Botão de acessar"
        accessibilityHint="Clique para fazer login"
        activeOpacity={0.8}
        onPress={handleLogin}
      >
        <Text
          className="text-zinc-100 text-lg font-zona-bold"
          style={{ fontSize: width * 0.05 }}
        >
          Acessar
        </Text>
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
  );
}
