export function handleModalSubmit({
  mode,
  entityType,
  data,
  values,
  context,
  studentStore,
  closeModal,
  setSubmitting,
}) {
  const { levelId, groupId, studentId } = context;

  try {
    switch (mode) {
      case "add":
        handleAdd(
          entityType,
          values,
          { levelId, groupId, studentId },
          studentStore
        );
        break;
      case "edit":
        handleEdit(
          entityType,
          data.id,
          values,
          { levelId, groupId, studentId },
          studentStore
        );
        break;
      case "remove":
        handleRemove(
          entityType,
          data.id,
          { levelId, groupId, studentId },
          studentStore
        );
        break;
    }
    closeModal();
  } catch (error) {
    console.error("Error performing operation:", error);
  } finally {
    setSubmitting(false);
  }
}

function handleAdd(entityType, values, ctx, store) {
  const { levelId, groupId, studentId } = ctx;
  switch (entityType) {
    case "level":
      return store.addLevel(values);
    case "group":
      return store.addGroup(levelId, values); // Updated
    case "student":
      return store.addStudent(levelId, groupId, values);
    case "grade":
      return store.addGrade(levelId, groupId, studentId, values);
    case "attendance":
      return store.addAttendance(levelId, groupId, studentId, values);
  }
}

function handleEdit(entityType, id, values, ctx, store) {
  const { levelId, groupId, studentId } = ctx;
  switch (entityType) {
    case "level":
      return store.updateLevel(id, values);
    case "group":
      return store.updateGroup(levelId, id, values); // Updated
    case "student":
      return store.updateStudent(levelId, groupId, id, values);
    case "grade":
      return store.updateGrade(levelId, groupId, studentId, id, values);
    case "attendance":
      return store.updateAttendance(levelId, groupId, studentId, id, values);
  }
}

function handleRemove(entityType, id, ctx, store) {
  const { levelId, groupId, studentId } = ctx;
  switch (entityType) {
    case "level":
      return store.removeLevel(id);
    case "group":
      return store.removeGroup(levelId, id); // Updated
    case "student":
      return store.removeStudent(levelId, groupId, id);
    case "grade":
      return store.removeGrade(levelId, groupId, studentId, id);
    case "attendance":
      return store.removeAttendance(levelId, groupId, studentId, id);
  }
}
