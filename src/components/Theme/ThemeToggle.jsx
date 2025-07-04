import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../stores/theme";


export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleToggle = () => {
    console.log("Theme toggle clicked, current isDarkMode:", isDarkMode);
    toggleDarkMode();
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="w-6 h-6 text-yellow-500" />
      ) : (
        <Moon className="w-6 h-6 text-blue-400" />
      )}
    </button>
  );
}