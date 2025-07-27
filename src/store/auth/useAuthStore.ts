import { create } from "zustand";
import type { AuthState, User } from "./types";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null, // SSR-kompatibilitás
  user: null,

  setToken: (token) => {
    try {
      if (token) {
        const decoded: User = jwtDecode(token);

        const nowInSec = Math.floor(Date.now() / 1000);
        if (decoded.exp < nowInSec) {
          console.warn("Token expired on arrival");
          get().logout();
          return false;
        }

        localStorage.setItem("token", token);
        set({ token, user: decoded });

        // auto logout
        let logoutTimer: ReturnType<typeof setTimeout> | null = null;

        // Clear previous timer
        if (logoutTimer) clearTimeout(logoutTimer);

        // Calculate timeout duration in ms
        const timeout = (decoded.exp - nowInSec) * 1000;
        logoutTimer = setTimeout(() => {
          console.info("Token expired, logging out automatically");
          get().logout();
        }, timeout);

        return true;
      } else {
        localStorage.removeItem("token");
        set({ token: null, user: null });
      }
      return true;
    } catch (error) {
      console.error("Hiba a token mentésekor vagy dekódolásakor:", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },

  isAdmin: () => get().user?.type === "admin",
}));
