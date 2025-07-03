import React, { useEffect } from "react";
import {
  Edit2,
  Plus,
  Trash2,
  Users,
  GraduationCap,
  BookOpen,
  UserCheck,
  Calendar,
  MoreVertical,
} from "lucide-react";
import { useModalStore } from "../stores/modalStore";
import { useStudentStore } from "../stores/studentStore";
import UniversalModal from "../components/UniversalModal/UniversalModal";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./components/Header/DashboardHeader";
import DashboardStats from "./components/Stats/DashboardStats";
import DashboardCard from "./components/Card/DashboardCard";
export default function StudentDashboard() {
  const { levels } = useStudentStore();

  // const { openModal } = useModalStore();
  // // Color palette for different levels
  // const colorPalette = [
  //   "from-blue-500 to-cyan-400",
  //   "from-purple-500 to-pink-400",
  //   "from-green-500 to-teal-400",
  //   "from-orange-500 to-red-400",
  //   "from-indigo-500 to-blue-400",
  //   "from-pink-500 to-rose-400",
  // ];

  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(levels);
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <DashboardHeader />

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
          <DashboardStats />
        {/* Levels Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Academic Levels
            </h2>
            {/* <div className="flex items-center gap-3">
              <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>All Levels</option>
                <option>Elementary</option>
                <option>Middle School</option>
                <option>High School</option>
              </select>
            </div> */}
          </div>

              <DashboardCard />
        </div>

        {/* Empty State */}
        {levels.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Academic Levels Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Get started by creating your first academic level to organize
              students and groups.
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg mx-auto">
              <Plus className="w-5 h-5" />
              <span className="font-medium">Create First Level</span>
            </button>
          </div>
        )}
      </div>
      <UniversalModal />
    </div>
  );
}
