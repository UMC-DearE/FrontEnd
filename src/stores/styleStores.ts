import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FontKey = "pretendard" | "cafe24" | "lee";

interface StyleState {
  font: FontKey;
  setFont: (font: FontKey) => void;
}

export const useStyleStore = create<StyleState>()(
  persist(
    (set) => ({
      font: "pretendard",
      setFont: (font) => set({ font }),
    }),
    { name: "deare-style" }
  )
);
