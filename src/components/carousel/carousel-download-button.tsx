import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { DownloadIcon } from "../icons/download-icon";

interface CarouselDownloadButtonProps {
  isDownloading: boolean;
  onPress: () => void;
  fileName: string;
}

export function CarouselDownloadButton({
  isDownloading,
  onPress,
  fileName,
}: CarouselDownloadButtonProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center gap-x-2 mt-4 w-full justify-center"
      onPress={onPress}
    >
      {isDownloading ? (
        <ActivityIndicator size="small" color="#fe017f" />
      ) : (
        <>
          <DownloadIcon />
          <Text className="text-zinc-100 text-base font-zona-semibold">
            {fileName}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
