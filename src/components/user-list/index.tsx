/* eslint-disable prettier/prettier */
import type { User } from "@/store/user-store";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";
import type { ListRenderItem } from "react-native";
import { RenderItem } from "./render-item";
import { ListFooterComponent } from "./list-footer-component";

interface UserListProps {
  users: User[];
  isLoading: boolean;
  fetchNextPage: () => void;
  deleteUser: (id: string) => void;
  editUser: (user: User) => void;
}

export function UserList({ users, isLoading, fetchNextPage, deleteUser, editUser }: UserListProps) {

  const renderItem: ListRenderItem<User> = ({ item }) => {
    return (
      <RenderItem item={item} deleteUser={deleteUser} editUser={editUser} />
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fb005d" />
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View>
        <Text className="text-3xl font-zona-bold text-zinc-100 mb-4 text-center mt-10">
          Nenhum usuário cadastrado
        </Text>
      </View>
    );
  }

  const onEndReached = () => {
    fetchNextPage();
  }

  return (
      <FlatList
        data={users}
        keyExtractor={(user) => user.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={ListFooterComponent}
      />
  );
}
