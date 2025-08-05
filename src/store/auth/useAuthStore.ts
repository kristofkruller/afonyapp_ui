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

        if (decoded.exp < Math.floor(Date.now() / 1000)) {
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
        const timeout = (decoded.exp - Math.floor(Date.now() / 1000)) * 1000;
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

  isTokenValid: () => {
    const token = get().token;
    if (!token) return false;
    try {
      const decoded: User = jwtDecode(token);
      return decoded.exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  },

  isAdmin: () => get().user?.type === "admin",
}));
