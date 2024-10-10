import { Image } from "react-native";

interface CarouselImageProps {
  url: string;
  name: string;
}

export function CarouselImage({ url, name }: CarouselImageProps) {
  return (
    <Image
      source={{ uri: url }}
      className="rounded-lg mb-3"
      style={{ width: 200, height: 180 }}
      accessible={true}
      accessibilityLabel={`Imagem do arquivo ${name}`}
    />
  );
}
