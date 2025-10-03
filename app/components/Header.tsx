import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useUI } from "../contexts/UIContext";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const { isSidebarCollapsed, toggleSidebar } = useUI();

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg z-50 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-[#d2b48c] hover:bg-[#c9a978] text-white transition-all duration-300 transform hover:scale-105"
          title={isSidebarCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
        >
          {isSidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>
        <h1 className="text-2xl font-bold text-[#5a3e2b] dark:text-white">
          <Link to="/">Hotel Manager</Link>
        </h1>
      </div>
      <div className="flex gap-4 items-center">
        <DarkModeToggle />
        <Link
          to="/login"
          className="px-4 py-2 border-2 border-[#5a3e2b] dark:border-gray-600 text-[#5a3e2b] dark:text-white rounded-full hover:bg-[#f3e5d0] dark:hover:bg-gray-700 transition"
        >
          Đăng nhập
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-[#d2b48c] text-white rounded-full hover:bg-[#c9a978] transition"
        >
          Đăng ký
        </Link>
      </div>
    </header>
  );
}
