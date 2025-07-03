// levelOperations.js
export const createLevelOperations = (set, get) => ({
    addLevel: (levelData) => {
      const { levels } = get();
      const newLevel = {
        id: Date.now(),
        ...levelData,
        group: [],
      };
      set({ levels: [...levels, newLevel] });
    },
  
    removeLevel: (id) => {
      const { levels } = get();
      set({ levels: levels.filter((level) => level.id !== id) });
    },
  
    updateLevel: (id, levelData) => {
      const { levels } = get();
      set({
        levels: levels.map((level) =>
          level.id === id ? { ...level, ...levelData } : level
        ),
      });
    },
  });