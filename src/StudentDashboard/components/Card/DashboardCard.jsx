import React from "react";
import { useModalStore } from "../../../stores/modalStore";
import { useStudentStore } from "../../../stores/studentStore";
import { Calendar, Edit2, GraduationCap, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardCard() {
    const { openModal } = useModalStore();
    const { levels } = useStudentStore();
    // Color palette for different levels
    const colorPalette = [
      "from-blue-500 to-cyan-400",
      "from-purple-500 to-pink-400",
      "from-green-500 to-teal-400",
      "from-orange-500 to-red-400",
      "from-indigo-500 to-blue-400",
      "from-pink-500 to-rose-400",
    ];
    const navigate = useNavigate();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level, index) => (
          <div
            key={level.id}
            className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:scale-[1.02] hover:-translate-y-1"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                colorPalette[index % colorPalette.length]
              } opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
            ></div>

            {/* Card Header */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${
                      colorPalette[index % colorPalette.length]
                    } shadow-lg`}
                  >
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {level.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Academic Level
                    </p>
                  </div>
                </div>

                {/* Action Menu */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() =>
                      openModal("edit", "level", level, {
                        levelId: level.id,
                      })
                    }
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() =>
                      openModal("remove", "level", level, {
                        levelId: level.id,
                      })
                    }
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
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Groups ({level.group.length})
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full bg-gradient-to-r ${
                    colorPalette[index % colorPalette.length]
                  } text-white text-sm font-medium`}
                >
                  {level.group.length} Active
                </div>
              </div>
            </div>

            {/* Groups List */}
            <div className="relative px-6 pb-6">
              <div className="space-y-2">
                {level.group.slice(0, 3).map((group, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                        colorPalette[index % colorPalette.length]
                      }`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {group.name}
                    </span>
                  </div>
                ))}

                {level.group.length > 3 && (
                  <div className="flex items-center gap-3 p-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <span>+{level.group.length - 3} more groups</span>
                  </div>
                )}
              </div>
            </div>

            {/* Card Footer */}
            <div className="relative px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20 border-t border-gray-200/50 dark:border-gray-600/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Updated today</span>
                </div>
                <button
                  onClick={() => {
                    navigate(`/group/${level.id}`, {
                      state: { level: level.id },
                    });
                  }}
                  className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
