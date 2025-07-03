import React, { useState } from "react";
import { X } from "lucide-react";

export default function RemoveModal({ entityType, closeModal, handleSubmit }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await handleSubmit({}, { setSubmitting: setIsRemoving });
    } catch (error) {
      console.error("Error removing item:", error);
      setIsRemoving(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-red-600">
            Confirm Removal
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to remove this {entityType}? This action cannot
          be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRemoving ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
