import { BottomButton } from "@/components/bottom-button";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";

const { width } = Dimensions.get("window");

export default function SharesToSellr() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-4">
        <View className="flex-row items-center justify-between py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={28} color="#fb005d" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center mt-10 mb-6">
          <View className="bg-primary h-10 w-1.5 mr-4 rounded-full" />
          <Text
            className="text-zinc-100 text-2xl font-zona-bold"
            style={{ fontSize: width * 0.06 }}
          >
            Ações para Vender
          </Text>
        </View>

        <ScrollView className="flex-1">
          {/* Aula 1 */}
          <View className="mb-4">
            <Image
              source={{ uri: "URL_DA_IMAGEM_AULA" }} // Substitua pela URL correta
              className="w-full h-40 rounded-lg"
            />
            <Text className="text-white text-center mt-2">
              Aula 03{"\n"}11/09{"\n"}às 20:09
            </Text>
            <Link href="/shares-to-sell/cloro-off" asChild>
              <TouchableOpacity className="mt-2 bg-primary py-2 px-4 rounded-lg self-center">
                <Text className="text-white">Clique para assistir</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Aula 2 */}
          <View className="mb-4">
            <Image
              source={{ uri: "URL_DA_IMAGEM_AULA" }} // Substitua pela URL correta
              className="w-full h-40 rounded-lg"
            />
            <Text className="text-white text-center mt-2">
              Aula 03{"\n"}11/09{"\n"}às 20:09
            </Text>
            <TouchableOpacity className="mt-2 bg-primary py-2 px-4 rounded-lg self-center">
              <Text className="text-white">Clique para assistir</Text>
            </TouchableOpacity>
          </View>

          {/* Aula 3 */}
          <View className="mb-4">
            <Image
              source={{ uri: "URL_DA_IMAGEM_AULA" }} // Substitua pela URL correta
              className="w-full h-40 rounded-lg"
            />
            <Text className="text-white text-center mt-2">
              Aula 03{"\n"}11/09{"\n"}às 20:09
            </Text>
            <TouchableOpacity className="mt-2 bg-primary py-2 px-4 rounded-lg self-center">
              <Text className="text-white">Clique para assistir</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomButton />
      </View>
    </SafeAreaView>
  );
}
