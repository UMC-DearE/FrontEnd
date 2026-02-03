import { create } from "zustand";
import { persist } from "zustand/middleware";

type MembershipState = {
  isPlus: boolean;
  setIsPlus: (v: boolean) => void;
};

export const useMembershipStore = create<MembershipState>()(
  persist(
    (set) => ({
      isPlus: false,
      setIsPlus: (v) => set({ isPlus: v }),
    }),
    { name: "deare-membership" }
  )
);
