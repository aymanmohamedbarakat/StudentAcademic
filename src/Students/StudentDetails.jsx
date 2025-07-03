import React, { useState, useMemo } from "react";
import {
  User,
  GraduationCap,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useParams } from "react-router-dom";

import { useModalStore } from "../stores/modalStore";
import UniversalModal from "../components/UniversalModal/UniversalModal";
import { useStudentStore } from "../stores/studentStore";

export default function StudentDetails() {
  // Fix: Use 'id' parameter name to match the route
  const { id: studentId } = useParams();
  const { levels } = useStudentStore();
  const { openModal } = useModalStore();
  const [activeTab, setActiveTab] = useState("profile");

  const currentStudent = useMemo(() => {
    // Add safety checks for data structure
    if (!levels || !Array.isArray(levels) || !studentId) {
      return null;
    }

    for (const level of levels) {
      // Check if level.group exists and is an array
      if (!level.group || !Array.isArray(level.group)) {
        continue;
      }
      
      for (const group of level.group) {
        // Check if group.students exists and is an array
        if (!group.students || !Array.isArray(group.students)) {
          continue;
        }
        
        const student = group.students.find((s) => s.id === studentId);
        if (student) {
          return { student, level, group };
        }
      }
    }
    return null;
  }, [levels, studentId]);

  // Add loading state check
  if (!studentId) {
    return (
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            Invalid student ID
          </h2>
        </div>
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            Student not found
          </h2>
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            Student with ID "{studentId}" could not be found.
          </p>
        </div>
      </div>
    );
  }

  const { student, level, group } = currentStudent;

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "grades", label: "Grades", icon: GraduationCap },
    { id: "attendance", label: "Attendance", icon: Calendar },
  ];

  // Grade handlers
  const handleAddGrade = () => {
    openModal("add", "grade", null, {
      levelId: level.id,
      groupId: group.id,
      studentId: student.id,
    });
  };

  const handleEditGrade = (grade) => {
    openModal("edit", "grade", grade, {
      levelId: level.id,
      groupId: group.id,
      studentId: student.id,
    });
  };

  const handleDeleteGrade = (grade) => {
    openModal("remove", "grade", grade, {
      levelId: level.id,
      groupId: group.id,
      studentId: student.id,
    });
  };

  // Attendance handlers
  const handleAddAttendance = () => {
    openModal("add", "attendance", null, {
      levelId: level.id,
      groupId: group.id,
      studentId: student.id,
    });
  };

  const handleEditAttendance = (attendance) => {
    openModal("edit", "attendance", attendance, {
      levelId: level.id,
      groupId: group.id,
      studentId: student.id,
    });
  };

  const handleDeleteAttendance = (attendance) => {
    openModal("remove", "attendance", attendance, {
      levelId: level.id,
      groupId: group.id,
      studentId: student.id,
    });
  };

  // Student handler
  const handleEditStudent = () => {
    openModal("edit", "student", student, {
      levelId: level.id,
      groupId: group.id,
      studentId: student.id,
    });
  };

  const getGradeColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return "text-green-400";
    if (percentage >= 80) return "text-blue-400";
    if (percentage >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getAttendanceColor = (status) => {
    switch (status) {
      case "present":
        return "text-green-400 bg-green-400/10";
      case "absent":
        return "text-red-400 bg-red-400/10";
      case "late":
        return "text-yellow-400 bg-yellow-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                {student.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {level.name} - {group.name}
              </p>
            </div>
            <button
              onClick={handleEditStudent}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors text-white"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-300 dark:border-gray-700 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "profile" && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
                Student Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Full Name
                    </label>
                    <p className="text-black dark:text-white">{student.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Age
                    </label>
                    <p className="text-black dark:text-white">{student.age} years old</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Group
                    </label>
                    <p className="text-black dark:text-white">{group.name}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                        Email
                      </label>
                      <p className="text-black dark:text-white">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                        Phone
                      </label>
                      <p className="text-black dark:text-white">{student.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                        Address
                      </label>
                      <p className="text-black dark:text-white">{student.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "grades" && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-black dark:text-white">Academic Grades</h2>
                <button
                  onClick={handleAddGrade}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 rounded-lg transition-colors text-white"
                >
                  <Plus className="w-4 h-4" />
                  Add Grade
                </button>
              </div>

              {student.grades && student.grades.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                          Subject
                        </th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                          Score
                        </th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                          Percentage
                        </th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                          Semester
                        </th>
                        <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.grades.map((grade) => (
                        <tr
                          key={grade.id}
                          className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700/30"
                        >
                          <td className="py-3 px-4 text-black dark:text-white font-medium">
                            {grade.subject}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`font-semibold ${getGradeColor(
                                grade.score,
                                grade.maxScore
                              )}`}
                            >
                              {grade.score}/{grade.maxScore}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`font-semibold ${getGradeColor(
                                grade.score,
                                grade.maxScore
                              )}`}
                            >
                              {Math.round((grade.score / grade.maxScore) * 100)}
                              %
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                            {grade.semester}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditGrade(grade)}
                                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-400/10 rounded-lg transition-colors"
                                title="Edit grade"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteGrade(grade)}
                                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-400/10 rounded-lg transition-colors"
                                title="Delete grade"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <GraduationCap className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No grades recorded yet</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Add the first grade to get started
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-black dark:text-white">Attendance Records</h2>
                <button
                  onClick={handleAddAttendance}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 rounded-lg transition-colors text-white"
                >
                  <Plus className="w-4 h-4" />
                  Add Attendance
                </button>
              </div>

              {student.attendance && student.attendance.length > 0 ? (
                <div className="space-y-3">
                  {student.attendance.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-black dark:text-white font-medium">
                          {record.date}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getAttendanceColor(
                            record.status
                          )}`}
                        >
                          {record.status}
                        </span>
                        {record.notes && (
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            "{record.notes}"
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditAttendance(record)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-400/10 rounded-lg transition-colors"
                          title="Edit attendance"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAttendance(record)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Delete attendance"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No attendance records yet</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Add the first attendance record to get started
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <UniversalModal />
    </div>
  );
}