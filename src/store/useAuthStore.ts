// store/useAuthStore.ts
import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  username: string;
  email: string;
  rolePending: string;
  isApproved: string;
  role: "user" | "admin" | "provider";
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      logout: () => {
        try {
          Cookies.remove("token");
          set({ user: null });
        } catch (err) {
          throw err;
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
