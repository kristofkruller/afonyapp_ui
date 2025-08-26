import { create } from "zustand";
import type { UiStore } from "./types";

export const useUiStore = create<UiStore>((set) => ({
    isPopUp: false,
    togglePopUp: () => set((state) => ({isPopUp: !state.isPopUp})),
  }));
