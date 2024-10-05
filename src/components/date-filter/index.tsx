import { View, Text, TouchableHighlight } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";

interface Props {
  purchaseDate: Date | undefined;
  setPurchaseDate: (date: Date | undefined) => void;
}

export function DateFilter({ purchaseDate, setPurchaseDate }: Props) {
  const [showPuchaseDatePicker, setShowPuchaseDatePicker] = useState(false);

  const onChangePurchaseDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    const currentDate = selectedDate || purchaseDate;
    setShowPuchaseDatePicker(false);
    setPurchaseDate(currentDate);
  };

  const clearDates = () => {
    setPurchaseDate(undefined);
  };

  return (
    <View className="w-full">
      <View className="w-full flex flex-col mb-3">
        <TouchableHighlight
          onPress={() => setShowPuchaseDatePicker((prev) => !prev)}
          className="w-full p-4 border border-zinc-300 rounded-md font-zona-regular"
        >
          <Text className="text-left text-zinc-100 font-zona-regular text-sm">
            Buscar por data de compra:{" "}
            {purchaseDate
              ? purchaseDate.toLocaleDateString("pt-br")
              : "não selecionada"}
          </Text>
        </TouchableHighlight>
        {showPuchaseDatePicker && (
          <DateTimePicker
            value={purchaseDate || new Date()}
            mode="date"
            display="inline"
            onChange={onChangePurchaseDate}
          />
        )}
      </View>

      <TouchableHighlight
        onPress={clearDates}
        className="w-full rounded-md py-3 px-1 bg-primary"
      >
        <Text className="text-center text-white font-zona-bold">
          Limpar Data
        </Text>
      </TouchableHighlight>
    </View>
  );
}
