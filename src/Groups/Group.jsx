import React from "react";
import { useStudentStore } from "../stores/studentStore";
import { useNavigate, useParams } from "react-router-dom";
import UniversalModal from "../components/UniversalModal/UniversalModal";
import { useModalStore } from "../stores/modalStore";
import {
  Plus,
  Edit3,
  Trash2,
  Users,
  UserPlus,
  Settings,
  GraduationCap,
  BookOpen,
  UserCircle,
  Calendar,
} from "lucide-react";

export default function Group() {
  const { levels } = useStudentStore();
  const { id } = useParams();
  // Fix: Convert id to string for comparison since store uses string IDs
  const level = levels.find((level) => level.id === id);
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const handleNavigate = (groupId) => {
    navigate(`/group/${level.id}/students/${groupId}`);
  };

  const handleAddGroup = () => {
    openModal("add", "group", null, { levelId: level.id });
  };
  const handleEditGroup = (group) => {
    openModal("edit", "group", group, { levelId: level.id, groupId: group.id });
  };

  const handleRemoveGroup = (group) => {
    openModal("remove", "group", group, {
      levelId: level.id,
      groupId: group.id,
    });
  };

  if (!level) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 p-6">
        <div className="max-w-2xl mx-auto text-center pt-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-red-500 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Level Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            The requested level could not be found.
          </p>
        </div>
      </div>
    );
  }

  const totalStudents = level.group.reduce(
    (total, group) => total + group.students.length,
    0
  );

  const handleGoBack = () => {
    navigate('/');
  };

  // Color palette for different groups
  const colorPalette = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-green-500 to-teal-400",
    "from-orange-500 to-red-400",
    "from-indigo-500 to-blue-400",
    "from-pink-500 to-rose-400",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 relative md:sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                  <GraduationCap onClick={handleGoBack} className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {level.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Manage groups and students for Grade {level.grade}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <Users className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {level.group.length} Groups
                </span>
              </div>
              <button
                onClick={handleAddGroup}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Group</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
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

        {/* Groups Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Class Groups
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {level.group.map((group, index) => (
              <div
                key={group.id}
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:scale-[1.02] hover:-translate-y-1"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colorPalette[index % colorPalette.length]
                    } opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                {/* Card Header */}
                <div className="relative p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${colorPalette[index % colorPalette.length]
                          } shadow-lg`}
                      >
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {group.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Class Group
                        </p>
                      </div>
                    </div>

                    {/* Action Menu */}
                    <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleEditGroup(group)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Edit3 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleRemoveGroup(group)}
                        className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="relative px-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <UserCircle className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Students ({group.students.length})
                      </span>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full bg-gradient-to-r ${colorPalette[index % colorPalette.length]
                        } text-white text-sm font-medium`}
                    >
                      {group.students.length} Active
                    </div>
                  </div>
                </div>

                {/* Students List */}
                <div className="relative px-6 pb-6">
                  {group.students.length > 0 ? (
                    <div className="space-y-2">
                      {group.students
                        .slice(0, 3)
                        .map((student, studentIndex) => (
                          <div
                            key={student.id || studentIndex}
                            className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                              {student.name
                                ? student.name.charAt(0).toUpperCase()
                                : "?"}
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {student.name || "Unknown Student"}
                              </span>
                              {student.id && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                  #{student.id}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}

                      {group.students.length > 3 && (
                        <div className="flex items-center gap-3 p-3 text-sm text-gray-500 dark:text-gray-400">
                          <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                          <span>
                            +{group.students.length - 3} more students
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                        <UserPlus className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        No students assigned
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="relative px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20 border-t border-gray-200/50 dark:border-gray-600/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Updated today</span>
                    </div>
                    <button
                      onClick={() => handleNavigate(group.id)}
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Manage</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
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

      <UniversalModal />
    </div>
  );
}
