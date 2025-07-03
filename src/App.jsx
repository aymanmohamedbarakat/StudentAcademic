import clsx from "clsx";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import StudentDashboard from "./StudentDashboard/StudentDashboard";
import { useTheme } from "./stores/theme";
import Group from "./Groups/Group";
import Students from "./Students/Students";
import StudentDetails from "./Students/StudentDetails";

export default function App() {
  const { isDarkMode } = useTheme();

  const appStyle = clsx(
    "h-[100dvh] w-full overflow-hidden",
    "bg-slate-100 text-gray-950",
    "dark:bg-gray-950 dark:text-slate-100 ",
    isDarkMode && "dark"
  );

  return (
    <div className={appStyle}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="/group/:id" element={<Group />} />
          <Route
            path="/group/:levelId/students/:groupId"
            element={<Students />}
          />
          <Route path="/students/:id" element={<StudentDetails />} />
        </Route>
      </Routes>
    </div>
  );
}
