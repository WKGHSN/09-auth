import { User } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  authOk: boolean;
  user: User | null;
  setAuth: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  authOk: false,
  user: null,
  setAuth: (user: User) =>
    set(() => ({
      authOk: true,
      user,
    })),
  clearAuth: () =>
    set(() => ({
      authOk: false,
      user: null,
    })),
}));
