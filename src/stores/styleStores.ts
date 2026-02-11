import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FontKey = "pretendard" | "cafe24" | "lee";

interface StyleState {
  font: FontKey;
  setFont: (font: FontKey) => void;
  resetStyle: () => void;
}

const DEFAULT_FONT: FontKey = "pretendard";

export const useStyleStore = create<StyleState>()(
  persist(
    (set) => ({
      font: DEFAULT_FONT,
      setFont: (font) => set({ font }),
      resetStyle: () => set({ font: DEFAULT_FONT }),
    }),
    { name: "deare-style" }
  )
);
