import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle, LogOut, User } from "lucide-react";
import { useUI } from "../contexts/UIContext";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect, useState } from "react";
import authService from "../services/authService";

export default function Header() {
  const { isSidebarCollapsed, toggleSidebar } = useUI();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 🔍 Khi load trang, kiểm tra có user trong localStorage không
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) setUser(currentUser);
  }, []);

  // 🔄 Lắng nghe sự kiện cập nhật thông tin user
  useEffect(() => {
    const handleUserUpdate = () => {
      refreshUser();
    };

    window.addEventListener('userUpdated', handleUserUpdate);
    return () => window.removeEventListener('userUpdated', handleUserUpdate);
  }, []);

  // 🔄 Định kỳ kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const interval = setInterval(checkAuthStatus, 1000);
    return () => clearInterval(interval);
  }, [user]);

  // 🔄 Kiểm tra trạng thái khi focus lại vào cửa sổ
  useEffect(() => {
    const handleFocus = () => {
      checkAuthStatus();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);

  // 🔄 Hàm refresh thông tin user
  const refreshUser = () => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  };

  // 🔄 Hàm kiểm tra trạng thái đăng nhập
  const checkAuthStatus = () => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && !user) {
      setUser(currentUser);
    } else if (!currentUser && user) {
      setUser(null);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setMenuOpen(false);

    // Trigger sự kiện để các component khác cập nhật
    window.dispatchEvent(new Event('userUpdated'));

    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg z-50 transition-colors duration-300">
      {/* Logo + sidebar toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-[#d2b48c] hover:bg-[#c9a978] text-white transition-all duration-300 transform hover:scale-105"
          title={isSidebarCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
        >
          {isSidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>
        <h1 className="text-2xl font-bold text-[#5a3e2b] dark:text-white">
          <Link to="/">Hotel Manager</Link>
        </h1>
      </div>

      {/* Phần bên phải */}
      <div className="flex gap-4 items-center relative">
        <DarkModeToggle />

        {!user ? (
          // 🧍 Khi chưa đăng nhập
          <>
            <Link
              to="/booking"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              🏨 Đặt phòng
            </Link>
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
          </>
        ) : (
          // 🧑 Khi đã đăng nhập
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#f3e5d0] dark:hover:bg-gray-700 transition"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border border-[#d2b48c]"
                />
              ) : (
                <UserCircle className="w-8 h-8 text-[#5a3e2b] dark:text-white" />
              )}
              <span className="text-[#5a3e2b] dark:text-white font-medium">
                {user.name || "Tài khoản"}
              </span>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg z-50">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-[#5a3e2b] dark:text-gray-200 hover:bg-[#f9f4e6] dark:hover:bg-gray-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="w-4 h-4" /> Thông tin cá nhân
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left text-[#5a3e2b] dark:text-gray-200 hover:bg-[#f9f4e6] dark:hover:bg-gray-700 transition"
                >
                  <LogOut className="w-4 h-4" /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
