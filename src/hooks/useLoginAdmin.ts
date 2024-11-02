import {
  type AdminLoginSchema,
  adminLoginSchema,
} from "@/schema/admin-login-schema";
import { useAdminStore } from "@/store/admin-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

export const useLoginAdmin = () => {
  const login = useAdminStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      accessCode: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["admin-login"],
    mutationFn: login,
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: error.message,
      });
    },
    onSuccess: () => {
      router.replace("/admin");
    },
  });

  const handleLogin = (data: AdminLoginSchema) => {
    mutation.mutate(data);
  };

  return {
    control,
    errors,
    handleSubmit,
    handleLogin,
    mutation,
  };
};
