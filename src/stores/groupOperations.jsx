export const createGroupOperations = (set, get) => ({
  addGroup: (levelId, groupData) => {
    const { levels } = get();
    // Keep levelId as string for consistent comparison
    const stringLevelId = typeof levelId === 'number' ? levelId.toString() : levelId;
    
    console.log('addGroup called with:', { levelId, stringLevelId, groupData });
    console.log('Available levels:', levels.map(l => ({ id: l.id, groupCount: l.group.length })));
    
    const newGroup = {
      id: Date.now().toString(), // Convert to string for consistency
      ...groupData,
      levelId: stringLevelId,
      students: [],
    };

    set({
      levels: levels.map((level) =>
        level.id === stringLevelId
          ? {
              ...level,
              group: [...level.group, newGroup],
            }
          : level
      ),
    });
  },

  updateGroup: (levelId, groupId, groupData) => {
    const { levels } = get();
    // Keep levelId as string for comparison since level.id is a string
    const stringLevelId = typeof levelId === 'number' ? levelId.toString() : levelId;
    // Ensure groupId is also handled consistently
    const stringGroupId = typeof groupId === 'number' ? groupId.toString() : groupId;
    
    console.log('updateGroup called with:', { levelId, stringLevelId, groupId, stringGroupId, groupData });
    console.log('Available levels:', levels.map(l => ({ id: l.id, groupCount: l.group.length })));
    
    set({
      levels: levels.map((level) =>
        level.id === stringLevelId
          ? {
              ...level,
              group: level.group.map((group) =>
                group.id === stringGroupId
                  ? { ...group, ...groupData }
                  : group
              ),
            }
          : level
      ),
    });
  },

  removeGroup: (levelId, groupId) => {
    const { levels } = get();
    // Keep levelId as string for comparison since level.id is a string
    const stringLevelId = typeof levelId === 'number' ? levelId.toString() : levelId;
    // Ensure groupId is also handled consistently
    const stringGroupId = typeof groupId === 'number' ? groupId.toString() : groupId;
    
    console.log('removeGroup called with:', { levelId, stringLevelId, groupId, stringGroupId });
    console.log('Available levels:', levels.map(l => ({ id: l.id, groupCount: l.group.length })));
    
    set({
      levels: levels.map((level) =>
        level.id === stringLevelId
          ? {
              ...level,
              group: level.group.filter((group) => group.id !== stringGroupId),
            }
          : level
      ),
    });
  },
});