import type { HabitType } from "@/types/habit-type";
import type { ImageSourcePropType } from "react-native";

export const habitImages: Record<HabitType, ImageSourcePropType[]> = {
  Diário: [
    require("@/assets/images/bancada.jpg"),
    require("@/assets/images/three-stories.jpg"),
    require("@/assets/images/five-clients.jpeg"),
  ],
  Semanal: [
    require("@/assets/images/bancada-2.jpg"),
    require("@/assets/images/team.jpg"),
    require("@/assets/images/monday.jpg"),
    require("@/assets/images/weekly.jpg"),
    require("@/assets/images/stories-feed.jpg"),
  ],
  Mensal: [
    require("@/assets/images/bancada-3.jpg"),
    require("@/assets/images/team2.png"),
    require("@/assets/images/action2.png"),
    require("@/assets/images/goal.jpg"),
    require("@/assets/images/action.png"),
  ],
};
