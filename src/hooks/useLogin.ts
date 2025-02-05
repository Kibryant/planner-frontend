import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userLoginSchema,
  type UserLoginSchema,
} from "@/schema/user-login-schema";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useUserStore } from "@/store/user-store";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export const useLogin = () => {
    const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginSchema>({
    resolver: zodResolver(userLoginSchema),
  });

  const { login } = useUserStore();

  const mutation = useMutation({
    mutationKey: ["user-login"],
    mutationFn: login,
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: t("Erro ao fazer login"),
        text2: t(error.message),
      });
    },
  });

  const handleLogin = ({ email, password }: UserLoginSchema) => {
    mutation.mutate({ email: email.toLowerCase(), password });
  };

  return {
    t,
    control,
    handleSubmit,
    errors,
    handleLogin,
    mutation,
  };
};
