import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, StyleSheet } from "react-native";

export function CardHabit() {
  return (
    <View className="w-full rounded-2xl overflow-hidden bg-[#4F001D] max-w-80">
      {/* Título */}
      <View className="p-6">
        <Text className="text-zinc-100 text-2xl font-zona-semibold max-w-60">
          Organização da bancada e sala
        </Text>
      </View>

      {/* Container da imagem para aplicar o gradiente */}
      <View className="relative w-full h-64">
        <Image
          source={require("@/assets/images/bancada.png")}
          className="w-full h-full rounded-tr-3xl rounded-tl-3xl"
          resizeMode="cover"
        />

        {/* Gradiente sobre a parte inferior da imagem */}
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />

        {/* Tracinhos do slider na parte inferior */}
        <View style={styles.sliderContainer}>
          <View style={[styles.sliderLine, styles.activeLine]} />
          <View style={styles.sliderLine} />
          <View style={styles.sliderLine} />
          <View style={styles.sliderLine} />
        </View>
      </View>
    </View>
  );
}

// Estilos adicionais para o gradiente e os tracinhos
const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
  },
  sliderContainer: {
    position: "absolute",
    bottom: 20, // Posição acima da borda inferior
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center", // Alinha os tracinhos no centro
    alignItems: "center",
  },
  sliderLine: {
    width: 20, // Largura dos tracinhos
    height: 4, // Altura dos tracinhos
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Cor neutra para tracinhos inativos
    marginHorizontal: 4, // Espaçamento entre os tracinhos
    borderRadius: 999, // Borda arredondada
  },
  activeLine: {
    backgroundColor: "rgba(255, 255, 255, 1)", // Cor branca para o tracinho ativo
    width: 40, // Largura maior para o tracinho ativo
  },
});
