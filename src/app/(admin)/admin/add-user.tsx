import { AddUserForm } from "@/components/add-user-form";
import { View, Text } from "react-native";

export default function AddUser() {
  return (
    <View className="flex-1 bg-zinc-950 px-8">
      <Text className="text-3xl font-zona-bold text-zinc-100 mt-10 mb-4 text-center">
        Adicionar novo usuário
      </Text>

      <AddUserForm />
    </View>
  );
}
