import { Moon, Sun } from "lucide-react";
import { useUI } from "../contexts/UIContext";

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useUI();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-[#d2b48c] hover:bg-[#c9a978] text-white transition-all duration-300 transform hover:scale-105"
      title={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
