import * as yup from "yup";

export const validationSchemas = {
  level: yup.object({
    name: yup.string().required("Level name is required"),
    grade: yup.number().min(10).max(12).required("Grade must be between 10-12"),
  }),

  group: yup.object({
    name: yup.string().required("Group name is required"),
  }),

  student: yup.object({
    name: yup.string().required("Student name is required"),
    age: yup.number().min(1).max(100).required("Age is required"),
    phone: yup.string().required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    address: yup.string().required("Address is required"),
  }),

  grade: yup.object({
    subject: yup.string().required("Subject is required"),
    score: yup
      .number()
      .min(0, "Score must be positive")
      .max(100, "Score cannot exceed 100")
      .required("Score is required"),
    maxScore: yup
      .number()
      .min(1, "Max score must be at least 1")
      .required("Max score is required"),
    semester: yup.string().required("Semester is required"),
  }),

  attendance: yup.object({
    date: yup.string().required("Date is required"),
    status: yup
      .string()
      .oneOf(["present", "absent", "late"], "Invalid status")
      .required("Status is required"),
    notes: yup.string(),
  }),
};

export const fieldConfigs = {
  level: [
    { name: "name", label: "Level Name", type: "text" },
    { name: "grade", label: "Grade", type: "number" },
  ],
  group: [{ name: "name", label: "Group Name", type: "text" }],
  student: [
    { name: "name", label: "Name", type: "text" },
    { name: "age", label: "Age", type: "number" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "address", label: "Address", type: "text" },
  ],
  grade: [
    { name: "subject", label: "Subject", type: "text" },
    { name: "score", label: "Score", type: "number" },
    { name: "maxScore", label: "Max Score", type: "number" },
    { name: "semester", label: "Semester", type: "text" },
  ],
  attendance: [
    { name: "date", label: "Date", type: "date" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["present", "absent", "late"],
    },
    { name: "notes", label: "Notes", type: "textarea" },
  ],
};

export const getInitialValues = (entityType, mode, data) => {
  if (mode === "edit" && data) {
    return data;
  }

  const defaults = {
    level: { name: "", grade: 10 },
    group: { name: "" },
    student: { name: "", age: "", phone: "", email: "", address: "" },
    grade: { subject: "", score: 0, maxScore: 100, semester: "" },
    attendance: { date: "", status: "", notes: "" },
  };

  return defaults[entityType] || {};
};
