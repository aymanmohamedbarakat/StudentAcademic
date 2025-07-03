import { Field } from "formik";
import React from "react";

export default function FieldRenderer({ field }) {
  const labelText =
    typeof field.label === "string" ? field.label : field.label?.en || "Field";
  const baseClasses =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400";
  if (field.type === "select") {
    return (
      <Field as="select" name={field.name} className={baseClasses}>
        <option value="">Select {labelText}</option>
        {(field.options || []).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Field>
    );
  }

  if (field.type === "textarea") {
    return (
      <Field
        as="textarea"
        name={field.name}
        rows={3}
        className={baseClasses}
        placeholder={labelText}
      />
    );
  }
  return (
    <Field
      type={field.type}
      name={field.name}
      className={baseClasses}
      placeholder={labelText}
    />
  );
}
