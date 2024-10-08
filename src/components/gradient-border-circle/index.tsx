import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { FireIconTurned } from "../icons/fire-icon-turned";
import { ThunderIconTurned } from "../icons/thunder-icon-turned";
import type { SvgProps } from "react-native-svg";
import { PercentageIconTurned } from "../icons/percentage-icon-turned";
import { RocketIconTurned } from "../icons/rocket-icon-turned";
import { HelmetIconTurned } from "../icons/helmet-icon-turned";
import { StarIconTurned } from "../icons/star-icon-turned";
import { CalendarIconTurned } from "../icons/calendar-icon-turned";

interface GradientBorderCircleProps {
  day: string;
}

const getIconForDay = (day: string) => {
  const dayMap: { [day: string]: (props: SvgProps) => React.JSX.Element } = {
    Segunda: FireIconTurned,
    Terça: ThunderIconTurned,
    Quarta: PercentageIconTurned,
    Quinta: RocketIconTurned,
    Sexta: HelmetIconTurned,
    Sábado: StarIconTurned,
    Domingo: CalendarIconTurned,
  };

  return dayMap[day] || FireIconTurned;
};

export function GradientBorderCircle({ day }: GradientBorderCircleProps) {
  const Icon = getIconForDay(day);

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
      <Icon
        width={60}
        height={60}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [{ translateX: -30 }, { translateY: -30 }],
        }}
      />
      <Link href={`/post-planning/${day}`} asChild>
        <TouchableOpacity
          key={day}
          className="bg-[#4F001DE0] flex-1 rounded-full flex items-center justify-center"
          activeOpacity={0.8}
        >
          <Text className="text-zinc-100 text-base font-zona-bold">{day}</Text>
        </TouchableOpacity>
      </Link>
    </LinearGradient>
  );
}
