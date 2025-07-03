import React from 'react'
import { useStudentStore } from '../../../stores/studentStore';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

export default function DashboardStats() {
    const { levels } = useStudentStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Levels
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {levels.length}
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
            {levels.reduce((acc, level) => acc + level.group.length, 0)}
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Active Programs
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {levels.length}
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}
