import { useState } from "react";
import { api } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/store/user-store";
import { HttpStatusCode } from "axios";

export function useUserActions(token: string) {
  const queryClient = useQueryClient();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const deleteUser = async (id: string) => {
    try {
      const response = await api.delete(`/admin/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== HttpStatusCode.Ok) {
        throw new Error("Erro ao deletar usuário");
      }

      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      });
    } catch {
      throw new Error("Erro ao deletar usuário");
    }
  };

  const editUser = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setShowModal(false);

    queryClient.invalidateQueries({
      queryKey: ["get-users"],
    });
  };

  return {
    deleteUser,
    editUser,
    editingUser,
    showModal,
    closeModal,
  };
}
