import { create } from "zustand";

type AuthStatus =
  | "checking"
  | "authenticated"
  | "signup_required"
  | "unauthenticated";

type AuthState = {
  authStatus: AuthStatus;
  setAuthStatus: (s: AuthStatus) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  authStatus: "checking",
  setAuthStatus: (authStatus) => set({ authStatus }),
}));
