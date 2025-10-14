import { create } from "zustand";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  picture?: string;
};

type AuthState = {
  user: AppUser | null;
  isAuthenticated: boolean;
  setUser: (u: AppUser | null) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (u) => set({ user: u, isAuthenticated: !!u }),
  clear: () => set({ user: null, isAuthenticated: false }),
}));
