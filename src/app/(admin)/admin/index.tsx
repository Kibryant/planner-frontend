import { View, Text, TouchableOpacity } from "react-native";
import { useAdminStore } from "@/store/admin-store";
import { Title } from "@/components/title";
import { Card } from "@/components/card";
import { Ionicons } from "@expo/vector-icons";
import { MainCard } from "@/components/main-card";
import { BottomButton } from "@/components/bottom-button";

const UsersIcon = () => <Ionicons name="people" size={28} color="#fb005d" />;

const AddUserIcon = () => (
  <Ionicons name="person-add" size={26} color="#fb005d" />
);

const PlayIcon = () => <Ionicons name="play" size={26} color="#fb005d" />;

export default function Index() {
  const logout = useAdminStore((state) => state.logout);

  return (
    <View className="flex-1 bg-zinc-950 px-8">
      <Title title="Painel de Admin" />

      <View className="flex-1 justify-center items-center">
        <MainCard
          text="Usuários cadastrados no aplicativo"
          IconHeader={UsersIcon}
          href="/admin/users"
        />

        <View className="flex-row justify-between w-full max-w-md mb-2">
          <Card text="Acessar o aplicativo" IconHeader={PlayIcon} href="/" />

          <Card
            text="Adicionar usuário"
            IconHeader={AddUserIcon}
            href="/admin/add-user"
          />
        </View>

        <View className="flex-row justify-between w-full max-w-md">
          <TouchableOpacity
            className="px-4 py-6 w-full rounded-xl bg-[#4F001D]"
            onPress={logout}
          >
            <Text className="text-zinc-100 font-zona-bold text-center">
              Sair da conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-center items-center gap-x-2 absolute -bottom-4 left-0 right-0 p-4">
        <BottomButton isHome />
      </View>
    </View>
  );
}
