import clsx from "clsx";
import { CircleX, GraduationCap } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useLinks } from "../../stores/linksStore";
import { useEffect } from "react";

export default function SideMenu({ isOpen, onClose }) {
  const location = useLocation();
  const { currentLevelId, currentGroupId, setLevelId, setGroupId } = useLinks();

  // Auto-update store based on current route
  useEffect(() => {
    if (location.pathname.startsWith("/group/")) {
      const pathParts = location.pathname.split("/");
      const levelId = pathParts[2];
      if (levelId && levelId !== currentLevelId) {
        setLevelId(levelId);
      }

      // If we're on students page, also set groupId
      if (pathParts[3] === "students" && pathParts[4]) {
        const groupId = pathParts[4];
        if (groupId !== currentGroupId) {
          setGroupId(groupId);
        }
      }
    }
  }, [
    location.pathname,
    currentLevelId,
    currentGroupId,
    setLevelId,
    setGroupId,
  ]);

  const sideMenuStyle = clsx(
    // base styles
    "w-[250px] sm:w-[250px] h-full flex flex-col gap-4 p-4",
    "border-l border-slate-100/20 dark:border-gray-700/50",
    "bg-white dark:bg-gray-900",
    "transition-transform duration-300 ease-in-out",

    // Desktop styles
    "lg:translate-x-0 lg:static lg:z-auto",

    // Mobile styles
    "fixed top-0 right-0 z-50 lg:relative",
    isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
  );

  const groupLink = currentLevelId ? `/group/${currentLevelId}` : "#";
  const studentLink =
    currentLevelId && currentGroupId
      ? `/group/${currentLevelId}/students/${currentGroupId}`
      : "#";

  return (
    <div className={sideMenuStyle}>
      <div className="flex items-center justify-between lg:hidden mb-4">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close menu"
        >
          <CircleX />
        </button>
      </div>

      <div className="hidden lg:flex flex-col gap-4">
        <h1>
          <NavLink
            to="/"
            className="text-2xl font-bold flex items-center gap-2"
          >
            <GraduationCap className="w-6 h-6" /> Student
          </NavLink>
        </h1>
      </div>
      <div className="flex flex-col justify-between h-full">
        <nav className="flex flex-col gap-4 mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(
                "px-3 py-2 rounded-md transition-colors",
                isActive
                  ? "bg-gradient-to-r from-blue-600/70 to-cyan-600/80 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to={groupLink}
            onClick={(e) => !currentLevelId && e.preventDefault()}
            className={clsx(
              "px-3 py-2 rounded-md transition-colors",
              !currentLevelId
                ? "opacity-50 pointer-events-none cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            Groups
          </NavLink>

          <NavLink
            to={studentLink}
            onClick={(e) => !currentGroupId && e.preventDefault()}
            className={clsx(
              "px-3 py-2 rounded-md transition-colors",
              !currentGroupId
                ? "opacity-50 pointer-events-none cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            Students
          </NavLink>
        </nav>
        <div className="flex items-center gap-2 mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(
                "px-3 py-2 rounded-md transition-colors",
                isActive
                  ? "bg-gradient-to-r from-blue-600/70 to-cyan-600/80 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )
            }
          >
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
}
