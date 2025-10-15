import { create } from "zustand";
import { AuthUser } from "@/shared/types/auth";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (u: AuthUser | null) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (u) => set({ user: u, isAuthenticated: !!u }),
  clear: () => set({ user: null, isAuthenticated: false }),
}));
