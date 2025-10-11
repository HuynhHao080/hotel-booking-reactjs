import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle, LogOut, User, Crown, Users } from "lucide-react";
import { useUI } from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";

export default function Header() {
  const { isSidebarCollapsed, toggleSidebar } = useUI();
  const { isAuthenticated, isAdmin, isCustomer, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
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

        {!isAuthenticated ? (
          // 🧍 Khi chưa đăng nhập
          <div className="flex gap-3 items-center">
            <Link
              to="/booking"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              🏨 Đặt phòng
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 border-2 border-[#5a3e2b] dark:border-gray-600 text-[#5a3e2b] dark:text-white rounded-full hover:bg-[#f3e5d0] dark:hover:bg-gray-700 transition-all duration-300"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-[#d2b48c] text-white rounded-full hover:bg-[#c9a978] transition-all duration-300"
            >
              Đăng ký
            </Link>
          </div>
        ) : (
          // 🧑 Khi đã đăng nhập
          <div className="flex gap-3 items-center">
            {/* Hiển thị thông tin role cho admin */}
            {isAdmin && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full">
                <Crown className="w-4 h-4" />
                <span className="text-sm font-medium">Admin</span>
              </div>
            )}

            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#f3e5d0] dark:hover:bg-gray-700 transition-all duration-300"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border border-[#d2b48c]"
                  />
                ) : (
                  <UserCircle className="w-8 h-8 text-[#5a3e2b] dark:text-white" />
                )}
                <div className="text-left">
                  <div className="text-[#5a3e2b] dark:text-white font-medium text-sm">
                    {user?.name || "Tài khoản"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {isAdmin ? "Quản trị viên" : "Khách hàng"}
                  </div>
                </div>
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover border border-[#d2b48c]"
                        />
                      ) : (
                        <UserCircle className="w-10 h-10 text-[#5a3e2b] dark:text-white" />
                      )}
                      <div>
                        <div className="font-medium text-[#5a3e2b] dark:text-white">
                          {user?.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                          isAdmin
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}>
                          {isAdmin ? "Quản trị viên" : "Khách hàng"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-[#5a3e2b] dark:text-gray-200 hover:bg-[#f9f4e6] dark:hover:bg-gray-700 transition-all duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="w-4 h-4" /> Thông tin cá nhân
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-[#5a3e2b] dark:text-gray-200 hover:bg-[#f9f4e6] dark:hover:bg-gray-700 transition-all duration-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Users className="w-4 h-4" /> Quản lý hệ thống
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
