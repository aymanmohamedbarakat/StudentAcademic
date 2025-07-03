import React from "react";
import { useStudentStore } from "../../../stores/studentStore";
import { useParams } from "react-router-dom";
import { BookOpen, UserCircle, Users } from "lucide-react";

export default function GroupStats() {
    const { levels } = useStudentStore();
    const { id } = useParams();
    const level = levels.find((level) => level.id === parseInt(id));
    const totalStudents = level.group.reduce(
        (total, group) => total + group.students.length,
        0
      );
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Grade Level
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {level.grade}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-teal-400 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Groups
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {level.group.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Students
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalStudents}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
