import { useState } from "react";
import { View, ActivityIndicator, Image } from "react-native";

interface CarouselImageProps {
  url: string;
  name: string;
}

export function CarouselImage({ url, name }: CarouselImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <View
      style={{
        width: 200,
        height: 180,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {loading && (
        <ActivityIndicator
          size="large"
          color="#fe017f"
          style={{
            position: "absolute",
            zIndex: 1,
          }}
        />
      )}

      <Image
        source={{ uri: url }}
        className="rounded-lg mb-3"
        style={{ width: 200, height: 180 }}
        accessible={true}
        accessibilityLabel={`Imagem do arquivo ${name}`}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}
