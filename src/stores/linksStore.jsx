import { create } from "zustand";

export const useLinks = create((set) => ({
  currentLevelId: null,
  currentGroupId: null,

  setLevelId: (id) => set({ currentLevelId: id, currentGroupId: null }),
  setGroupId: (id) => set({ currentGroupId: id }),
  clearLinks: () => set({ currentLevelId: null, currentGroupId: null }),
}));