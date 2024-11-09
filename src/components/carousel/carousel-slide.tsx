import { View, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { TriangleBackIcon } from "../icons/triangle-back-icon";
import { TriangleGoIcon } from "../icons/triangle-go-icon";
import { CarouselDownloadButton } from "./carousel-download-button";
import { CarouselImage } from "./carousel-image";
import { SLIDE_WIDTH } from "@/constants/slide-width";

interface CarouselSlideProps {
  item: {
    name: string;
    url: string;
  };
  handlePrev: () => void;
  handleNext: () => void;
  downloadLink: () => void;
  isDownloading: boolean;
}

export function CarouselSlide({
  item,
  handlePrev,
  handleNext,
  downloadLink,
  isDownloading,
}: CarouselSlideProps) {
  const isVideo = item.url.includes(".mp4") || item.url.includes(".mov");

  return (
    <View
      className="items-center justify-center mt-3"
      style={{ width: SLIDE_WIDTH }}
    >
      <View className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <TouchableOpacity
          className="h-[18px] w-[18px] bg-primary rounded items-center justify-center"
          onPress={handlePrev}
        >
          <TriangleBackIcon
            width={7.5}
            height={10.5}
            style={{
              transform: [{ translateX: -3.75 }, { translateY: -5.25 }],
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        </TouchableOpacity>
      </View>

      {isVideo ? (
        <Video
          source={{ uri: item.url }}
          resizeMode={ResizeMode.CONTAIN}
          style={{ width: 200, height: 180, borderRadius: 8 }}
          useNativeControls
        />
      ) : (
        <CarouselImage url={item.url} name={item.name} />
      )}

      <View className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <TouchableOpacity
          className="h-[18px] w-[18px] bg-primary rounded items-center justify-center"
          onPress={handleNext}
        >
          <TriangleGoIcon
            width={7.5}
            height={10.5}
            style={{
              transform: [{ translateX: -3.75 }, { translateY: -5.25 }],
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        </TouchableOpacity>
      </View>

      <CarouselDownloadButton
        isDownloading={isDownloading}
        onPress={downloadLink}
        fileName={item.name}
      />
    </View>
  );
}
