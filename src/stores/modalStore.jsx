import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useModalStore = create(
  persist(
    (set) => ({
      isOpen: false,
      mode: "add",
      entityType: null,
      data: null,
      context: {
        levelId: null,
        groupId: null,
        studentId: null,
        gradeId: null,
        attendanceId: null,
      },
      openModal: (mode, entityType, data = null, context = {}) =>
        set((state) => ({
          isOpen: true,
          mode,
          entityType,
          data,
          context: { ...state.context, ...context },
        })),
      closeModal: () =>
        set({
          isOpen: false,
          mode: "add",
          entityType: null,
          data: null,
          context: {
            levelId: null,
            groupId: null,
            studentId: null,
            gradeId: null,
            attendanceId: null,
          },
        }),
    }),
    {
      name: "modal-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
