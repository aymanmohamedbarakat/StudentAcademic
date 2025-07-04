import React, { useState } from "react";
import {
  User,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Users,
  GraduationCap,
  Calendar,
  Search,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useStudentStore } from "../stores/studentStore";
import { useModalStore } from "../stores/modalStore";
import UniversalModal from "../components/UniversalModal/UniversalModal";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");

  const { levels } = useStudentStore();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const { groupId, levelId } = useParams();

  const targetLevel = levels.find((level) => level.id === Number(levelId));
  const targetGroup = targetLevel?.group?.find(
    (group) => group.id === Number(groupId)
  );

  const isFiltered = groupId && levelId;
  const pageTitle =
    isFiltered && targetGroup && targetLevel
      ? `${targetGroup.name} - ${targetLevel.name}`
      : "Student Management";
  const pageSubtitle = isFiltered
    ? "Students in this group"
    : "Manage students across all levels and groups";

  // Navigation handler
  const handleViewStudent = (studentId) => {
    navigate(`/students/${studentId}`);
  };

  // Go back to group view
  const handleGoBack = () => {
    if (levelId) {
      navigate(`/group/${levelId}`);
    } else {
      navigate(-1);
    }
  };

  // CRUD handlers
  const handleAddStudent = (levelId, groupId) => {
    openModal("add", "student", null, { levelId, groupId });
  };

  const handleEditStudent = (student, levelId, groupId) => {
    openModal("edit", "student", student, {
      levelId,
      groupId,
      studentId: student.id,
    });
  };

  const handleDeleteStudent = (student, levelId, groupId) => {
    openModal("remove", "student", student, {
      levelId,
      groupId,
      studentId: student.id,
    });
  };

  const getStudentStats = (student) => {
    const gradesCount = student.grades?.length || 0;
    const attendanceCount = student.attendance?.length || 0;
    const presentCount =
      student.attendance?.filter((a) => a.status === "present").length || 0;
    const attendanceRate =
      attendanceCount > 0
        ? Math.round((presentCount / attendanceCount) * 100)
        : 0;

    return { gradesCount, attendanceCount, attendanceRate };
  };

  const filteredData =
    isFiltered && targetGroup && targetLevel
      ? [{ ...targetLevel, group: [targetGroup] }]
      : levels;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {isFiltered && (
                <button
                  onClick={handleGoBack}
                  className="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-300 dark:border-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                </button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {pageTitle}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{pageSubtitle}</p>
              </div>
            </div>
          </div>

          {/* Search Only */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Students by Level and Group */}
        <div className="space-y-8">
          {filteredData.map((level) => (
            <div key={level.id}>
              {!isFiltered && (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  {level.name}
                </h2>
              )}

              <div className="space-y-6">
                {level.group?.map((group) => (
                  <div key={group.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                        {!isFiltered && (
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {group.name}
                          </h3>
                        )}
                        <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-sm border border-gray-300 dark:border-gray-700">
                          {group.students?.length || 0} students
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddStudent(level.id, group.id)}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm text-white"
                      >
                        <Plus className="w-3 h-3" />
                        Add Student
                      </button>
                    </div>

                    {group.students && group.students.length > 0 ? (
                      (() => {
                        const filteredStudents = group.students.filter(
                          (student) =>
                            student.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            student.email
                              ?.toLowerCase()
                              .includes(searchTerm.toLowerCase())
                        );

                        return filteredStudents.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredStudents.map((student) => {
                              const stats = getStudentStats(student);
                              return (
                                <div
                                  key={student.id}
                                  className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                          {student.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                          {student.age} years old
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() =>
                                          handleViewStudent(student.id)
                                        }
                                        className="p-1 text-green-400 hover:bg-green-400/10 rounded transition-colors"
                                        title="View student details"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleEditStudent(
                                            student,
                                            level.id,
                                            group.id
                                          )
                                        }
                                        className="p-1 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                                        title="Edit student"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteStudent(
                                            student,
                                            level.id,
                                            group.id
                                          )
                                        }
                                        className="p-1 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                                        title="Delete student"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Contact Info */}
                                  <div className="space-y-2 mb-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                      <Mail className="w-3 h-3" />
                                      <span className="truncate">
                                        {student.email}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                      <Phone className="w-3 h-3" />
                                      <span>{student.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                      <MapPin className="w-3 h-3" />
                                      <span className="truncate">
                                        {student.address}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Stats */}
                                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-300 dark:border-gray-600">
                                    <div className="flex items-center gap-1">
                                      <GraduationCap className="w-3 h-3" />
                                      <span>{stats.gradesCount} grades</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      <span>
                                        {stats.attendanceRate}% attendance
                                      </span>
                                    </div>
                                  </div>

                                  {/* View Details Button */}
                                  <button
                                    onClick={() =>
                                      handleViewStudent(student.id)
                                    }
                                    className="w-full mt-3 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 border border-blue-600/20"
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <User className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400 mb-2">
                              No students match your search
                            </p>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="text-center py-8">
                        <User className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400 mb-2">
                          No students in this group yet
                        </p>
                        <button
                          onClick={() => handleAddStudent(level.id, group.id)}
                          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                        >
                          Add the first student
                        </button>
                      </div>
                    )}
                  </div>
                )) || (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-800">
                    <Users className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">No groups in this level yet</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {levels.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No levels found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Create levels and groups first to manage students
            </p>
          </div>
        )}
      </div>
      <UniversalModal />
    </div>
  );
}