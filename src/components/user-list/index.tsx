import type { User } from "@/store/user-store";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import type { ListRenderItem } from "react-native";
import { RenderItem } from "./render-item";
import { ListFooterComponent } from "./list-footer-component";
import { useFilterUsers } from "@/hooks/useFilterUsers";
import { DateFilter } from "../date-filter";

interface UserListProps {
  users: User[];
  isLoading: boolean;
  fetchNextPage: () => void;
  deleteUser: (id: string) => void;
  editUser: (user: User) => void;
}

export function UserList({
  users,
  isLoading,
  fetchNextPage,
  deleteUser,
  editUser,
}: UserListProps) {
  const {
    searchEmail,
    setSearchEmail,
    purchaseDate,
    setPurchaseDate,
    filteredUsers,
  } = useFilterUsers(users);

  const renderItem: ListRenderItem<User> = ({ item }) => {
    return (
      <RenderItem item={item} deleteUser={deleteUser} editUser={editUser} />
    );
  };

  const renderListHeaderComponent = () => (
    <Text className="text-sm font-zona-bold text-gray-100 text-center my-4">
      Total de usuários: {filteredUsers.length}
    </Text>
  );

  const renderListFooterComponent = () => {
    return <ListFooterComponent isLoading={isLoading} />;
  };

  const onEndReached = () => {
    fetchNextPage();
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fb005d" />
      </View>
    );
  }

  return (
    <>
      <View className="w-full mt-10">
        <TextInput
          className="w-full p-4 border border-zinc-300 rounded-md mb-2 font-zona-regular"
          placeholder="Buscar por email"
          placeholderTextColor="#f4f4f5"
          style={{ color: "#f4f4f5", fontSize: 12 }}
          value={searchEmail}
          onChangeText={setSearchEmail}
        />

        <DateFilter
          purchaseDate={purchaseDate}
          setPurchaseDate={setPurchaseDate}
        />
      </View>

      {filteredUsers.length === 0 && (
        <Text className="text-center text-zinc-100 font-zona-regular mt-10">
          Nenhum usuário encontrado
        </Text>
      )}
      {filteredUsers.length > 0 && (
        <FlatList
          data={filteredUsers}
          ListHeaderComponent={renderListHeaderComponent}
          keyExtractor={(user) => user.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderListFooterComponent}
          style={{ flex: 1, marginTop: 28 }}
        />
      )}
    </>
  );
}
