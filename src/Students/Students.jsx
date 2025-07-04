// import React, { useState } from "react";
// import {
//   User,
//   Plus,
//   Edit,
//   Trash2,
//   Mail,
//   Phone,
//   MapPin,
//   Users,
//   GraduationCap,
//   Calendar,
//   Search,
//   Eye,
//   ArrowLeft,
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useStudentStore } from "../stores/studentStore";
// import { useModalStore } from "../stores/modalStore";
// import UniversalModal from "../components/UniversalModal/UniversalModal";

// export default function Students() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const { levels } = useStudentStore();
//   const { openModal } = useModalStore();
//   const navigate = useNavigate();

//   const { groupId, levelId } = useParams();

//   const targetLevel = levels.find((level) => level.id === String(levelId));
//   const targetGroup = targetLevel?.group?.find(
//     (group) => group.id === String(groupId)
//   );

//   // console.log(targetGroup , targetLevel);


//   const isFiltered = groupId && levelId;
//   const pageTitle =
//     isFiltered && targetGroup && targetLevel
//       ? `${targetGroup.name} - ${targetLevel.name}`
//       : "Student Management";
//   const pageSubtitle = isFiltered
//     ? "Students in this group"
//     : "Manage students across all levels and groups";

//   // Navigation handler
//   const handleViewStudent = (studentId) => {
//     navigate(`/students/${studentId}`);
//   };

//   // Go back to group view
//   const handleGoBack = () => {
//     if (levelId) {
//       navigate(`/group/${levelId}`);
//     } else {
//       navigate(-1);
//     }
//   };

//   // CRUD handlers
//   const handleAddStudent = (levelId, groupId) => {
//     openModal("add", "student", null, { levelId, groupId });
//   };

//   const handleEditStudent = (student, levelId, groupId) => {
//     openModal("edit", "student", student, {
//       levelId,
//       groupId,
//       studentId: student.id,
//     });
//   };

//   const handleDeleteStudent = (student, levelId, groupId) => {
//     openModal("remove", "student", student, {
//       levelId,
//       groupId,
//       studentId: student.id,
//     });
//   };

//   const getStudentStats = (student) => {
//     const gradesCount = student.grades?.length || 0;
//     const attendanceCount = student.attendance?.length || 0;
//     const presentCount =
//       student.attendance?.filter((a) => a.status === "present").length || 0;
//     const attendanceRate =
//       attendanceCount > 0
//         ? Math.round((presentCount / attendanceCount) * 100)
//         : 0;

//     return { gradesCount, attendanceCount, attendanceRate };
//   };

//   const filteredData =
//     isFiltered && targetGroup && targetLevel
//       ? [{ ...targetLevel, group: [targetGroup] }]
//       : levels;


//   return (
//     <div className="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-gray-100">
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-4">
//               {isFiltered && (
//                 <button
//                   onClick={handleGoBack}
//                   className="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-300 dark:border-gray-700"
//                 >
//                   <ArrowLeft className="w-4 h-4 text-gray-700 dark:text-gray-200" />
//                 </button>
//               )}
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//                   {pageTitle}
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-400">{pageSubtitle}</p>
//               </div>
//             </div>
//           </div>

//           {/* Search Only */}
//           <div className="mb-6">
//             <div className="relative max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search students by name or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Students by Level and Group */}
//         <div className="space-y-8">
//           {filteredData.map((level) => (
//             <div key={level.id}>
//               {!isFiltered && (
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
//                   <GraduationCap className="w-6 h-6 text-blue-500 dark:text-blue-400" />
//                   {level.name}
//                 </h2>
//               )}

//               <div className="space-y-6">
//                 {level.group?.map((group) => (
//                   <div key={group.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center gap-3">
//                         <Users className="w-5 h-5 text-blue-500 dark:text-blue-400" />
//                         {!isFiltered && (
//                           <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                             {group.name}
//                           </h3>
//                         )}
//                         <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-sm border border-gray-300 dark:border-gray-700">
//                           {group.students?.length || 0} students
//                         </span>
//                         <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-sm border border-gray-300 dark:border-gray-700">
//                           {group.name}
//                         </span>
//                       </div>
//                       <button
//                         onClick={() => handleAddStudent(level.id, group.id)}
//                         className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm text-white"
//                       >
//                         <Plus className="w-3 h-3" />
//                         Add Student
//                       </button>
//                     </div>

//                     {group.students && group.students.length > 0 ? (
//                       (() => {
//                         const filteredStudents = group.students.filter(
//                           (student) =>
//                             student.name
//                               .toLowerCase()
//                               .includes(searchTerm.toLowerCase()) ||
//                             student.email
//                               ?.toLowerCase()
//                               .includes(searchTerm.toLowerCase())
//                         );

//                         return filteredStudents.length > 0 ? (
//                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {filteredStudents.map((student) => {
//                               const stats = getStudentStats(student);
//                               return (
//                                 <div
//                                   key={student.id}
//                                   className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
//                                 >
//                                   <div className="flex items-start justify-between mb-3">
//                                     <div className="flex items-center gap-3">
//                                       <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//                                         <User className="w-5 h-5 text-white" />
//                                       </div>
//                                       <div>
//                                         <h4 className="font-semibold text-gray-900 dark:text-gray-100">
//                                           {student.name}
//                                         </h4>
//                                         <p className="text-sm text-gray-600 dark:text-gray-400">
//                                           {student.age} years old
//                                         </p>
//                                       </div>
//                                     </div>
//                                     <div className="flex items-center gap-1">
//                                       <button
//                                         onClick={() =>
//                                           handleViewStudent(student.id)
//                                         }
//                                         className="p-1 text-green-400 hover:bg-green-400/10 rounded transition-colors"
//                                         title="View student details"
//                                       >
//                                         <Eye className="w-4 h-4" />
//                                       </button>
//                                       <button
//                                         onClick={() =>
//                                           handleEditStudent(
//                                             student,
//                                             level.id,
//                                             group.id
//                                           )
//                                         }
//                                         className="p-1 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
//                                         title="Edit student"
//                                       >
//                                         <Edit className="w-4 h-4" />
//                                       </button>
//                                       <button
//                                         onClick={() =>
//                                           handleDeleteStudent(
//                                             student,
//                                             level.id,
//                                             group.id
//                                           )
//                                         }
//                                         className="p-1 text-red-400 hover:bg-red-400/10 rounded transition-colors"
//                                         title="Delete student"
//                                       >
//                                         <Trash2 className="w-4 h-4" />
//                                       </button>
//                                     </div>
//                                   </div>

//                                   {/* Contact Info */}
//                                   <div className="space-y-2 mb-3">
//                                     <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
//                                       <Mail className="w-3 h-3" />
//                                       <span className="truncate">
//                                         {student.email}
//                                       </span>
//                                     </div>
//                                     <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
//                                       <Phone className="w-3 h-3" />
//                                       <span>{student.phone}</span>
//                                     </div>
//                                     <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
//                                       <MapPin className="w-3 h-3" />
//                                       <span className="truncate">
//                                         {student.address}
//                                       </span>
//                                     </div>
//                                   </div>

//                                   {/* Stats */}
//                                   <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-300 dark:border-gray-600">
//                                     <div className="flex items-center gap-1">
//                                       <GraduationCap className="w-3 h-3" />
//                                       <span>{stats.gradesCount} grades</span>
//                                     </div>
//                                     <div className="flex items-center gap-1">
//                                       <Calendar className="w-3 h-3" />
//                                       <span>
//                                         {stats.attendanceRate}% attendance
//                                       </span>
//                                     </div>
//                                   </div>

//                                   {/* View Details Button */}
//                                   <button
//                                     onClick={() =>
//                                       handleViewStudent(student.id)
//                                     }
//                                     className="w-full mt-3 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 border border-blue-600/20"
//                                   >
//                                     <Eye className="w-4 h-4" />
//                                     View Details
//                                   </button>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         ) : (
//                           <div className="text-center py-8">
//                             <User className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
//                             <p className="text-gray-500 dark:text-gray-400 mb-2">
//                               No students match your search
//                             </p>
//                           </div>
//                         );
//                       })()
//                     ) : (
//                       <div className="text-center py-8">
//                         <User className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
//                         <p className="text-gray-500 dark:text-gray-400 mb-2">
//                           No students in this group yet
//                         </p>
//                         <button
//                           onClick={() => handleAddStudent(level.id, group.id)}
//                           className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
//                         >
//                           Add the first student
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )) || (
//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-800">
//                       <Users className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
//                       <p className="text-gray-500 dark:text-gray-400">No groups in this level yet</p>
//                     </div>
//                   )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {levels.length === 0 && (
//           <div className="text-center py-12">
//             <GraduationCap className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
//               No levels found
//             </h3>
//             <p className="text-gray-500 dark:text-gray-500">
//               Create levels and groups first to manage students
//             </p>
//           </div>
//         )}
//       </div>
//       <UniversalModal />
//     </div>
//   );
// }

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
  UserCircle,
  BookOpen,
  Settings,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudentStore } from "../stores/studentStore";
import { useModalStore } from "../stores/modalStore";
import UniversalModal from "../components/UniversalModal/UniversalModal";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");

  const { levels } = useStudentStore();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const { groupId, levelId } = useParams();

  const targetLevel = levels.find((level) => level.id === String(levelId));
  const targetGroup = targetLevel?.group?.find(
    (group) => group.id === String(groupId)
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

  // Color palette for different groups
  const colorPalette = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400", 
    "from-green-500 to-teal-400",
    "from-orange-500 to-red-400",
    "from-indigo-500 to-blue-400",
    "from-pink-500 to-rose-400",
  ];

  // Calculate total students
  const totalStudents = filteredData.reduce((total, level) => 
    total + (level.group?.reduce((groupTotal, group) => 
      groupTotal + (group.students?.length || 0), 0) || 0), 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 relative md:sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {isFiltered && (
                  <button
                    onClick={handleGoBack}
                    className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                  </button>
                )}
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                  <UserCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {pageTitle}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {pageSubtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        {!isFiltered && (
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
                    {levels.reduce((total, level) => total + (level.group?.length || 0), 0)}
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
        )}

        {/* Students by Level and Group */}
        <div className="space-y-8">
          {filteredData.map((level) => (
            <div key={level.id}>
              {!isFiltered && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {level.name}
                  </h2>
                </div>
              )}

              <div className="space-y-6">
                {level.group?.map((group, groupIndex) => (
                  <div key={group.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    {/* Group Header */}
                    <div className="px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20 border-b border-gray-200/50 dark:border-gray-600/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-gradient-to-r ${colorPalette[groupIndex % colorPalette.length]} shadow-md`}>
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                              {group.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {group.students?.length || 0} students enrolled
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddStudent(level.id, group.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="font-medium">Add Student</span>
                        </button>
                      </div>
                    </div>

                    {/* Students Grid */}
                    <div className="p-6">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {filteredStudents.map((student, studentIndex) => {
                                const stats = getStudentStats(student);
                                return (
                                  <div
                                    key={student.id}
                                    className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:scale-[1.02] hover:-translate-y-1"
                                  >
                                    {/* Gradient Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${colorPalette[studentIndex % colorPalette.length]} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                    {/* Student Header */}
                                    <div className="relative p-6 pb-4">
                                      <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                          <div className={`p-3 rounded-xl bg-gradient-to-r ${colorPalette[studentIndex % colorPalette.length]} shadow-lg`}>
                                            <User className="w-6 h-6 text-white" />
                                          </div>
                                          <div>
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                              {student.name}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                              {student.age} years old
                                            </p>
                                          </div>
                                        </div>

                                        {/* Action Menu */}
                                        <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                          <button
                                            onClick={() => handleViewStudent(student.id)}
                                            className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
                                          >
                                            <Eye className="w-4 h-4 text-green-500" />
                                          </button>
                                          <button
                                            onClick={() => handleEditStudent(student, level.id, group.id)}
                                            className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                                          >
                                            <Edit className="w-4 h-4 text-blue-500" />
                                          </button>
                                          <button
                                            onClick={() => handleDeleteStudent(student, level.id, group.id)}
                                            className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                          >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="relative px-6 pb-4">
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                                          <Mail className="w-4 h-4 text-gray-400" />
                                          <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                            {student.email}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                                          <Phone className="w-4 h-4 text-gray-400" />
                                          <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {student.phone}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                                          <MapPin className="w-4 h-4 text-gray-400" />
                                          <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                            {student.address}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="relative px-6 pb-4">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <GraduationCap className="w-4 h-4 text-gray-400" />
                                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                            {stats.gradesCount} Grades
                                          </span>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${colorPalette[studentIndex % colorPalette.length]} text-white text-sm font-medium`}>
                                          {stats.attendanceRate}% Attendance
                                        </div>
                                      </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="relative px-6 py-4 bg-gray-50/30 dark:bg-gray-700/20 border-t border-gray-200/50 dark:border-gray-600/50">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                          <Calendar className="w-4 h-4" />
                                          <span>Active Student</span>
                                        </div>
                                        <button
                                          onClick={() => handleViewStudent(student.id)}
                                          className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                        >
                                          <Settings className="w-4 h-4" />
                                          <span>Details</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center py-12">
                              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                                <User className="w-10 h-10 text-gray-400" />
                              </div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No students match your search
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                Try adjusting your search terms
                              </p>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="text-center py-12">
                          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                            <User className="w-10 h-10 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No Students Found
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Get started by adding your first student to this group.
                          </p>
                          <button
                            onClick={() => handleAddStudent(level.id, group.id)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg mx-auto"
                          >
                            <Plus className="w-5 h-5" />
                            <span className="font-medium">Add First Student</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )) || (
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-200/50 dark:border-gray-700/50">
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <Users className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No Groups Found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Create groups first to manage students
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {levels.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Levels Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Create levels and groups first to manage students effectively.
            </p>
            <button
              onClick={() => navigate('/levels')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg mx-auto"
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Create Levels</span>
            </button>
          </div>
        )}
      </div>

      <UniversalModal />
    </div>
  );
}