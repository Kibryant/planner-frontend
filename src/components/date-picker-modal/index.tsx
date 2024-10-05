import DateTimePicker from "@react-native-community/datetimepicker";
import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { View } from "react-native";

interface Props {
  date: Date;
  onChangeDate: (event: DateTimePickerEvent, selectedDate?: Date) => void;
}

export function DatePickerModal({ date, onChangeDate }: Props) {
  return (
    <View>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onChangeDate}
      />
    </View>
  );
}
