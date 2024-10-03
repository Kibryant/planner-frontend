import { View, Text, TouchableOpacity } from "react-native";
import { useAdminStore } from "@/store/admin-store";
import { Title } from "@/components/title";
import { Card } from "@/components/card";
import { StarIcon } from "@/components/icons/star-icon";
import { Ionicons } from "@expo/vector-icons";
import { MainCard } from "@/components/main-card";

const UsersIcon = () => <Ionicons name="people" size={28} color="#fb005d" />;

const AddUserIcon = () => (
  <Ionicons name="person-add" size={26} color="#fb005d" />
);

export default function Index() {
  const logout = useAdminStore((state) => state.logout);

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="w-full px-8">
        <Title title="Painel de Administração" />

        <View className="w-full mt-20">
          <MainCard
            text="Usuários cadastrados"
            IconHeader={UsersIcon}
            href="/admin/users"
          />

          <View className="w-full flex-row justify-between mb-2">
            <Card text="Acessar o aplicativo" IconHeader={StarIcon} href="/" />

            <Card
              text="Adicionar usuário"
              IconHeader={AddUserIcon}
              href="/admin/add-user"
            />
          </View>

          <TouchableOpacity
            className="p-4 w-full border border-primary rounded-md mt-2"
            onPress={logout}
          >
            <Text className="text-zinc-100 font-zona-bold text-center">
              Sair da conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
