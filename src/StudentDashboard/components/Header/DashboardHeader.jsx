import { GraduationCap, Plus, Users } from "lucide-react";
import React from "react";
import { useStudentStore } from "../../../stores/studentStore";
import { useModalStore } from "../../../stores/modalStore";

export default function DashboardHeader() {
  const { levels } = useStudentStore();

  const { openModal } = useModalStore();
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 relative md:sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl capitalize font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  academy student
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Manage students across different academic levels
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <Users className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {levels.length} Levels
              </span>
            </div>
            <button
              onClick={() => openModal("add", "level", null, {})}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Level</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
