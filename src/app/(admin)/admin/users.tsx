import { View } from "react-native";
import { UserList } from "@/components/user-list";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useAdminStore } from "@/store/admin-store";
import { useUserActions } from "@/hooks/useActionsUser";
import { UpdateUser } from "@/components/update-user";

export default function Users() {
  const token = useAdminStore((state) => state.admin?.token);

  const { users, isLoading, fetchNextPage } = useGetUsers(token || "");

  const { deleteUser, editUser, editingUser, showModal, closeModal } =
    useUserActions(token || "");

  return (
    <View className="flex-1 bg-zinc-950 px-8">
      <UserList
        users={users}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        deleteUser={deleteUser}
        editUser={editUser}
      />

      {editingUser && (
        <UpdateUser
          user={editingUser}
          showModal={showModal}
          closeModal={closeModal}
        />
      )}
    </View>
  );
}
