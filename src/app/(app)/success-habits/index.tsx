import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useWindowDimensions } from 'react-native';

export default function SuccessHabits() {
  const { width } = useWindowDimensions();

  const imageHeight = width * 0.6;

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 p-4">
        <View className='flex-row items-center justify-between py-4'>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back-sharp' size={28} color='#fb005d' />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center mt-10 mb-6">
          <View className="bg-primary h-10 w-1.5 mr-4 rounded-full" />
          <Text className="text-zinc-100 text-2xl font-zona-bold" style={{ fontSize: width * 0.06 }}>
            Hábitos de Sucesso
          </Text>
        </View>

        <View className="flex-row justify-center">

          <View className="flex-row justify-center w-80 mt-5 space-x-2 bg-primary/40 rounded-full px-4 py-2">
            <TouchableOpacity className="px-4 py-3 bg-primary rounded-full">
              <Text className="text-white font-semibold">Diário</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-3 bg-[#500a38] rounded-full">
              <Text className="text-white font-semibold">Semanal</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-3 bg-[#500a38] rounded-full">
              <Text className="text-white font-semibold">Mensal</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
      <View className="mt-10 items-center">
        <TouchableOpacity
          className="bg-primary border-2 border-zinc-100 w-16 h-16 rounded-full justify-center items-center"
          accessibilityLabel="Botão Home"
          accessibilityHint="Clique para voltar para o menu principal"
          activeOpacity={0.8}
        >
          <Ionicons name="home" size={32} color="#f4f4f5" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};