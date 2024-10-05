import { View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type TaskCardProps = {
  task: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };
  onPress: () => void;
  onComplete: () => void;
};

export const TaskCard = ({ task, onPress, onComplete }: TaskCardProps) => (
  <LinearGradient
    colors={["#EF0052", "#4E001D"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{
      padding: 1,
      borderRadius: 12,
      marginBottom: 18,
    }}
  >
    <View className="flex-row items-center justify-between bg-[#4F001D] rounded-xl p-6">
      <TouchableOpacity className="flex-1" onPress={onPress}>
        <Text
          className="text-zinc-100 text-xs font-zona-bold max-w-72"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {task.title}
        </Text>
      </TouchableOpacity>
      <BouncyCheckbox
        size={26}
        fillColor="#FF005E"
        iconStyle={{ borderColor: "#FF005E", borderRadius: 4 }}
        onPress={onComplete}
        className="absolute right-4"
        isChecked={task.completed}
        innerIconStyle={{ borderColor: "#FF005E", borderRadius: 4 }}
      />
    </View>
  </LinearGradient>
);
