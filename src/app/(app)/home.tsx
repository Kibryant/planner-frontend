import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-black" style={{ paddingHorizontal: 20 }}>
      <View className='flex-1 px-4'>

        <View className="flex-row items-center mt-10 mb-6">
          <View className="bg-primary h-10 w-1.5 mr-4 rounded-full" />
          <Text className="text-zinc-100 text-2xl font-zona-bold" style={{ fontSize: width * 0.06 }}>
            Menu Principal
          </Text>
        </View>

        <View className="flex-1 justify-center">
          <Link href="/shares-to-sell" asChild>
            <TouchableOpacity
              className="bg-primary/50 w-full h-40 rounded-xl justify-center items-center mb-2"
              accessibilityLabel="Ações mensais para aumentar o faturamento"
              accessibilityHint="Clique para acessar as ações mensais"
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="chart-line" size={36} color="#f4f4f5" />
              <Text className="text-zinc-100 font-zona-semibold text-center mt-2" style={{ fontSize: width * 0.035 }}>
                Ações mensais para Aumentar o Faturamento
              </Text>
            </TouchableOpacity>
          </Link>

          <View className="flex-row justify-between mb-2">
            <TouchableOpacity
              className="bg-pink-900 w-[49%] h-32 p-4 rounded-xl justify-center items-center"
              accessibilityLabel="Planejamento das postagens"
              accessibilityHint="Clique para acessar o planejamento das postagens"
              activeOpacity={0.8}
            >
              <FontAwesome5 name="calendar-alt" size={36} color="#f4f4f5" />
              <Text className="text-zinc-100 font-zona-semibold text-center mt-2" style={{ fontSize: width * 0.04 }}>
                Planejamento das postagens
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-pink-900 w-[49%] h-32 p-4 rounded-xl justify-center items-center"
              accessibilityLabel="Meta de faturamento"
              accessibilityHint="Clique para acessar as metas de faturamento"
              activeOpacity={0.8}
            >
              <FontAwesome5 name="fire" size={36} color="#f4f4f5" />
              <Text className="text-zinc-100 font-zona-semibold text-center mt-2" style={{ fontSize: width * 0.04 }}>
                Meta de Faturamento
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between mb-4">
            <Link href="/success-habits" asChild>
              <TouchableOpacity
                className="bg-primary/50 w-[49%] h-32 p-4 rounded-xl justify-center items-center"
                accessibilityLabel="Hábitos de sucesso"
                accessibilityHint="Clique para acessar os hábitos de sucesso"
                activeOpacity={0.8}
              >
                <FontAwesome5 name="star" size={36} color="#f4f4f5" />
                <Text className="text-zinc-100 font-zona-semibold text-center mt-2" style={{ fontSize: width * 0.04 }}>
                  Hábitos de sucesso
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/grow-tips" asChild>
              <TouchableOpacity
                className="bg-primary/50 w-[49%] h-32 p-4 rounded-xl justify-center items-center"
                accessibilityLabel="Dicas para crescer"
                accessibilityHint="Clique para acessar as dicas para crescer"
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons name="flash" size={36} color="#f4f4f5" />
                <Text className="text-zinc-100 font-zona-semibold text-center mt-2" style={{ fontSize: width * 0.04 }}>
                  Dicas para crescer
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View className="items-center">
          <TouchableOpacity
            className="bg-primary border-2 border-zinc-100 w-16 h-16 rounded-full justify-center items-center"
            accessibilityLabel="Botão Home"
            accessibilityHint="Clique para voltar para o menu principal"
            activeOpacity={0.8}
          >
            <Ionicons name="home" size={32} color="#f4f4f5" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

