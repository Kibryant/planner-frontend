import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

interface GradientBorderCircleProps {
  day: string;
}

const backgroundIcon = [
  "sun",
  "calendar",
  "cloud",
  "cloud-rain",
  "cloud-snow",
  "cloud-lightning",
  "moon",
];

export function GradientBorderCircle({ day }: GradientBorderCircleProps) {
  return (
    <LinearGradient
      colors={["#EF0052", "#4E001D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        padding: 1,
        borderRadius: 999,
        height: 96,
        width: 96,
      }}
    >
      <Feather
        name={backgroundIcon[Math.floor(Math.random() * backgroundIcon.length)]}
        size={40}
        color="#FF005E"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [{ translateX: -20 }, { translateY: -20 }],
        }}
      />

      <Link href={`/post-planning/${day}`} asChild>
        <TouchableOpacity
          key={day}
          className="bg-[#4F001DE0] flex-1 rounded-full flex items-center justify-center"
        >
          <Text className="text-zinc-100 text-base font-zona-bold">{day}</Text>
        </TouchableOpacity>
      </Link>
    </LinearGradient>
  );
}
