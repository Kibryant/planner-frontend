import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';

const { width } = Dimensions.get('window');

export default function SharesToSellr() {
  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-1 p-4'>
        <View className='flex-row items-center justify-between py-4'>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back-sharp' size={28} color='#fb005d' />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center mt-10 mb-6">
          <View className="bg-primary h-10 w-1.5 mr-4 rounded-full" />
          <Text className="text-zinc-100 text-2xl font-zona-bold" style={{ fontSize: width * 0.06 }}>
            Ações para Vender
          </Text>
        </View>

        <ScrollView className='flex-1'>
          {/* Aula 1 */}
          <View className='mb-4'>
            <Image
              source={{ uri: 'URL_DA_IMAGEM_AULA' }} // Substitua pela URL correta
              className='w-full h-40 rounded-lg'
            />
            <Text className='text-white text-center mt-2'>
              Aula 03{'\n'}11/09{'\n'}às 20:09
            </Text>
            <TouchableOpacity className='mt-2 bg-pink-500 py-2 px-4 rounded-lg self-center'>
              <Text className='text-white'>Clique para assistir</Text>
            </TouchableOpacity>
          </View>

          {/* Aula 2 */}
          <View className='mb-4'>
            <Image
              source={{ uri: 'URL_DA_IMAGEM_AULA' }} // Substitua pela URL correta
              className='w-full h-40 rounded-lg'
            />
            <Text className='text-white text-center mt-2'>
              Aula 03{'\n'}11/09{'\n'}às 20:09
            </Text>
            <TouchableOpacity className='mt-2 bg-pink-500 py-2 px-4 rounded-lg self-center'>
              <Text className='text-white'>Clique para assistir</Text>
            </TouchableOpacity>
          </View>

          {/* Aula 3 */}
          <View className='mb-4'>
            <Image
              source={{ uri: 'URL_DA_IMAGEM_AULA' }} // Substitua pela URL correta
              className='w-full h-40 rounded-lg'
            />
            <Text className='text-white text-center mt-2'>
              Aula 03{'\n'}11/09{'\n'}às 20:09
            </Text>
            <TouchableOpacity className='mt-2 bg-pink-500 py-2 px-4 rounded-lg self-center'>
              <Text className='text-white'>Clique para assistir</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

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
      </View>
    </SafeAreaView>
  );
}
