import clsx from "clsx";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu/SideMenu";
import { useState } from "react";
import { GraduationCap, Menu } from "lucide-react";

export default function MainLayout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const mainLayoutStyle = clsx("flex h-full w-full overflow-hidden");

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  return (
    <div className={mainLayoutStyle}>
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSideMenu}
        />
      )}
      <SideMenu isOpen={isSideMenuOpen} onClose={closeSideMenu} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <button
            onClick={toggleSideMenu}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu />
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
