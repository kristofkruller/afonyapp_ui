import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { persist } from "zustand/middleware";

import type { AuthState, User } from "./types";

let logoutTimer: ReturnType<typeof setTimeout> | null = null;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setToken: (token) => {
        if (token) {
          try {
            const decoded: User = jwtDecode(token);

            if (decoded.exp < Math.floor(Date.now() / 1000)) {
              console.warn("Token lejárt");
              get().logout();
              return false;
            }

            // auto logout időzítő
            if (logoutTimer) clearTimeout(logoutTimer);
            const timeout =
              (decoded.exp - Math.floor(Date.now() / 1000)) * 1000;
            logoutTimer = setTimeout(() => {
              console.info("Token expired, logging out automatically");
              get().logout();
            }, timeout);

            set({ token, user: decoded });
            return true;
          } catch (err) {
            console.error("Érvénytelen token dekódolás:", err);
            get().logout();
            return false;
          }
        } else {
          console.info("Token null");
          return false;
        }
      },

      logout: () => {
        if (logoutTimer) clearTimeout(logoutTimer);
        logoutTimer = null;
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
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        token: state.token,
      }),
      // ⚠️ újratöltés után fut le, ha van token, akkor dekódoljuk újra
      onRehydrateStorage: () => (state) => {
        const token = state?.token;
        if (token) {
          const decoded: User = jwtDecode(token);
          if (decoded.exp < Math.floor(Date.now() / 1000)) {
            console.warn("Token már lejárt rehydrate után");
            state.logout();
          } else {
            state.setToken(token); // ez beállítja a user-t + timer-t
          }
        }
      },
    }
  )
);
