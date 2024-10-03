import { isSubscriptionActive } from "@/lib/utils";
import type { User } from "@/store/user-store";
import { View, TouchableOpacity, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useState } from "react";

interface RenderItemProps {
  item: User;
  deleteUser: (id: string) => void;
  editUser: (user: User) => void;
}

export function RenderItem({ item, deleteUser, editUser }: RenderItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = (id: string) => {
    Toast.show({
      type: "info",
      text1: "Confirmação de Exclusão",
      text2:
        "Tem certeza que deseja deletar este usuário? Essa ação não pode ser desfeita.",
      autoHide: false,
      topOffset: 60,
      position: "top",
      onPress: () => {
        deleteUser(id);
        Toast.hide();
      },
      onHide: () => setIsDeleting(false),
    });

    setIsDeleting(true);
  };

  return (
    <View className="border-b-2 border-primary p-4">
      <Text className="text-lg font-zona-bold text-primary">{item.email}</Text>
      <Text className="text-lg font-zona-bold text-zinc-300">
        Data de compra:{" "}
        {new Date(item.purchaseDate).toLocaleDateString("pt-br")}
      </Text>
      <Text className="text-lg font-zona-bold text-zinc-300">
        Data de expiração:{" "}
        {new Date(item.expirationDate).toLocaleDateString("pt-br")}
      </Text>
      <Text
        className={`text-lg font-zona-bold mb-2 ${
          isSubscriptionActive(new Date(item.expirationDate).toDateString())
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        Status:{" "}
        {isSubscriptionActive(new Date(item.expirationDate).toDateString())
          ? "Ativo"
          : "Expirado"}
      </Text>
      <View className="flex-row gap-x-2">
        <TouchableOpacity
          className="bg-primary rounded-md py-2 flex-1"
          onPress={() => confirmDelete(item.id)}
          disabled={isDeleting}
        >
          <Text className="text-center text-white font-zona-bold">
            {isDeleting ? "Aguardando..." : "Deletar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border border-primary rounded-md py-2 flex-1"
          onPress={() => editUser(item)}
        >
          <Text className="text-center text-white font-zona-bold">Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
