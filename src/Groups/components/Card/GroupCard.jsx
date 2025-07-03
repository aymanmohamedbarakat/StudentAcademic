import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudentStore } from "../../../stores/studentStore";
import { useModalStore } from "../../../stores/modalStore";
import {
  Calendar,
  Edit3,
  Settings,
  Trash2,
  UserCircle,
  UserPlus,
  Users,
} from "lucide-react";

export default function GroupCard() {
  const { levels } = useStudentStore();
  const { id } = useParams();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  // More robust level finding - try both as number and string
  let level = levels.find((level) => level.id === parseInt(id));
  if (!level) {
    level = levels.find((level) => level.id.toString() === id);
  }

  console.log("GroupCard - URL param:", id);
  console.log("GroupCard - Available levels:", levels.map(l => ({ id: l.id, name: l.name })));
  console.log("GroupCard - Found level:", level);

  // Add safety check
  if (!level) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Level not found</p>
        <p className="text-gray-500">URL param: {id}</p>
        <p className="text-gray-500">Available levels: {levels.map(l => l.id).join(', ')}</p>
      </div>
    );
  }

  const handleNavigate = (groupId) => {
    navigate(`/group/${level.id}/students/${groupId}`);
  };

  const handleEditGroup = (group) => {
    console.log("Edit Clicked:", group);
    console.log("Level from store:", level);
    console.log("Group:", group);
    console.log("URL param ID:", id);
    
    // Use the actual level ID from the found level, not the URL param
    const levelIdToUse = level.id;
    console.log("Using level ID:", levelIdToUse);
    
    openModal("edit", "group", group, { 
      levelId: levelIdToUse, 
      groupId: group.id 
    });
  };

  const handleRemoveGroup = (group) => {
    console.log("Remove Clicked:", group);
    console.log("Level from store:", level);
    console.log("Group:", group);
    console.log("URL param ID:", id);
    
    // Use the actual level ID from the found level, not the URL param
    const levelIdToUse = level.id;
    console.log("Using level ID:", levelIdToUse);
    
    openModal("remove", "group", group, {
      levelId: levelIdToUse,
      groupId: group.id,
    });
  };

  const colorPalette = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-green-500 to-teal-400",
    "from-orange-500 to-red-400",
    "from-indigo-500 to-blue-400",
    "from-pink-500 to-rose-400",
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {level.group.map((group, index) => (
          <div
            key={group.id}
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
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                  className={`px-3 py-1 rounded-full bg-gradient-to-r ${
                    colorPalette[index % colorPalette.length]
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
                  {group.students.slice(0, 3).map((student, studentIndex) => (
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
                      <span>+{group.students.length - 3} more students</span>
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
  );
}