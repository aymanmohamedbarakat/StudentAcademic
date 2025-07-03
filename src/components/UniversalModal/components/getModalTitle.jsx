import React from "react";

export default function getModalTitle(mode, entityType) {
  const entityName = entityType.charAt(0).toUpperCase() + entityType.slice(1);
  if (mode === "remove") {
    return `Remove ${entityName}`;
  }
  return `${mode === "add" ? "Add" : "Edit"} ${entityName}`;
}
