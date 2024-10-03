import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "@/functions/user-login";
import type { UserLoginSchema } from "@/schema/user-login-schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string;
  purchaseDate: Date;
  expirationDate: Date;
}

interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  login: ({ email, password }: UserLoginSchema) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),

      login: async ({ email, password }: UserLoginSchema) => {
        try {
          const response = await userLogin({ email, password });

          if (response.user) {
            set({ user: response.user, token: response.token });
          }
        } catch {
          throw new Error("Credenciais inválidas");
        }
      },
    }),
    {
      name: "user-storage",
      storage: {
        getItem: async (name: string) => {
          const item = await AsyncStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (name: string, value: unknown) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name: string) => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);
