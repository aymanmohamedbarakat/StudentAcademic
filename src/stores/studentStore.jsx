import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createLevelOperations } from "./levelOperations";
import { createGroupOperations } from "./groupOperations";
import { createStudentOperations } from "./studentOperations";
import { createGradeOperations } from "./gradeOperations";
import { createAttendanceOperations } from "./attendanceOperations";

export const useStudentStore = create(
  persist(
    (set, get) => ({
      levels: [
        {
          id: "10",
          name: "Grade 10",
          grade: "10",
          group: [
            {
              id: "110",
              name: "Group A",
              levelId: "10",
              students: [
                {
                  id: "111",
                  name: "John Doe",
                  age: "16",
                  phone: "123-456-7890",
                  email: "john@example.com",
                  address: "123 Main St",
                  groupId: "110",
                  grades: [
                    {
                      id: "111",
                      subject: "Mathematics",
                      score: 85,
                      maxScore: 100,
                      date: "2024-01-15",
                      semester: "Fall 2024",
                    },
                  ],
                  attendance: [
                    {
                      id: "111",
                      date: "2024-01-15",
                      status: "present",
                      notes: "",
                    },
                  ],
                },
              ],
            },
            {
              id: "120",
              name: "Group B",
              levelId: "10",
              students: [
                {
                  id: "121",
                  name: "Jane Doe",
                  age: "16",
                  phone: "123-456-7890",
                  email: "jane@example.com",
                  address: "123 Main St",
                  groupId: "120",
                  grades: [
                    {
                      id: "121",
                      subject: "Mathematics",
                      score: 85,
                      maxScore: 100,
                      date: "2024-01-15",
                      semester: "Fall 2024",
                    },
                  ],
                  attendance: [
                    {
                      id: "121",
                      date: "2024-01-15",
                      status: "present",
                      notes: "",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "20",
          name: "Grade 11",
          grade: "11",
          group: [],
        },
        {
          id: "30",
          name: "Grade 12",
          grade: "12",
          group: [],
        },
      ],

      // Combine all operations
      ...createLevelOperations(set, get),
      ...createGroupOperations(set, get),
      ...createStudentOperations(set, get),
      ...createGradeOperations(set, get),
      ...createAttendanceOperations(set, get),
    }),
    {
      name: "student-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
