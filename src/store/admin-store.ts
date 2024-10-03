import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminLoginSchema } from "@/schema/admin-login-schema";
import { adminLogin } from "@/functions/admin-login";

export interface Admin {
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
  };
}

interface AdminState {
  admin: Admin | null;
  login: (data: AdminLoginSchema) => Promise<void>;
  logout: () => void;
  setAdmin: (admin: Admin) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      admin: null,

      login: async ({ email, password, accessCode }: AdminLoginSchema) => {
        try {
          const response = await adminLogin({ email, password, accessCode });

          console.log(response);

          if (response) {
            set({ admin: response });
          }
        } catch {
          throw new Error("Credenciais inválidas");
        }
      },

      logout: () => set({ admin: null }),

      setAdmin: (admin) => set({ admin }),
    }),
    {
      name: "admin-storage",
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
  // persist(
  //   (set) => ({
  //     user: null,
  //     token: null,

  //     setUser: (user, token) => set({ user, token }),

  //     logout: () => set({ user: null, token: null }),

  //     login: async ({ email, password }: UserLoginSchema) => {
  //       try {
  //         const response = await userLogin({ email, password });

  //         if (response.user) {
  //           set({ user: response.user, token: response.token });
  //         }
  //       } catch {
  //         throw new Error("Credenciais inválidas");
  //       }
  //     },
  //   }),
  //   {
  //     name: "user-storage",
  //     storage: {
  //       getItem: async (name: string) => {
  //         const item = await AsyncStorage.getItem(name);
  //         return item ? JSON.parse(item) : null;
  //       },
  //       setItem: async (name: string, value: unknown) => {
  //         await AsyncStorage.setItem(name, JSON.stringify(value));
  //       },
  //       removeItem: async (name: string) => {
  //         await AsyncStorage.removeItem(name);
  //       },
  //     },
  //   },
  // ),
);
