import { AddUserForm } from "@/components/add-user-form";
import { Back } from "@/components/back";
import { Title } from "@/components/title";
import { View } from "react-native";

export default function AddUser() {
  return (
    <View className="flex-1 bg-zinc-950 px-8">
      <Back />
      <Title title="Adicionar usuário" />

      <View className="mt-10">
        <AddUserForm />
      </View>
    </View>
  );
}
