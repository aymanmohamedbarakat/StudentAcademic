import React from "react";
import { useStudentStore } from "../../../stores/studentStore";
import { useParams } from "react-router-dom";
import { Plus, Users } from "lucide-react";

export default function EmptyState() {
    const { levels } = useStudentStore();
    const { id } = useParams();
    const level = levels.find((level) => level.id === parseInt(id));
  return (
    <div>
      {level.group.length === 0 && (
        <div className="text-center py-16">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Groups Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Get started by creating your first group to organize students for
            this level.
          </p>
          <button
            onClick={() =>
              openModal("add", "group", null, { levelId: level.id })
            }
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg mx-auto"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create First Group</span>
          </button>
        </div>
      )}
    </div>
  );
}
