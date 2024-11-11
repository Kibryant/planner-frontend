import type { HabitType } from "@/types/habit-type";
import type { ImageSourcePropType } from "react-native";

export const habitImages: Record<HabitType, ImageSourcePropType[]> = {
  Diário: [
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
  ],
  Semanal: [
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
  ],
  Mensal: [
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
    require("@/assets/images/bancada.png"),
  ],
};
