import { Text, TouchableOpacity } from "react-native";

interface DatePickerButtonProps {
  date: Date;
  onPress: () => void;
}

export function DatePickerButton({ date, onPress }: DatePickerButtonProps) {
  return (
    <TouchableOpacity
      className="w-full rounded-md p-4 border border-primary"
      onPress={onPress}
    >
      <Text className="text-center text-zinc-100 font-zona-bold">
        Selecionar a data de compra
      </Text>
      <Text className="text-center text-zinc-500 font-zona-bold text-xs">
        {date.toLocaleDateString("pt-br")}
      </Text>
    </TouchableOpacity>
  );
}
