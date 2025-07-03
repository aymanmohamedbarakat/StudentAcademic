import { ErrorMessage, Formik, Form } from "formik";
import React from "react";
import getModalTitle from "./getModalTitle";
import {
  fieldConfigs,
  getInitialValues,
  validationSchemas,
} from "../config/ConfigManager";
import FieldRenderer from "./FieldRenderer";
import { X } from "lucide-react";

export default function FormModal({
  mode,
  entityType,
  data,
  closeModal,
  handleSubmit,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {getModalTitle(mode, entityType)}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <Formik
          initialValues={getInitialValues(entityType, mode, data)}
          validationSchema={validationSchemas[entityType]}
          onSubmit={(values, actions) => {
            console.log("Submitting form..."); // جرب تتأكد
            handleSubmit(values, actions);
          }}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {fieldConfigs[entityType].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {typeof field.label === "string"
                      ? field.label
                      : field.label?.en || "Field"}
                  </label>
                  <FieldRenderer field={field} />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Saving..."
                    : mode === "add"
                    ? "Add"
                    : "Update"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
