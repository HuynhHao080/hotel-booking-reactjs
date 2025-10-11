import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useUI } from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import {
  Home,
  Building,
  LayoutDashboard,
  Calendar,
  CreditCard,
  Bed,
  FileText,
  Settings,
  Users,
  ChevronDown,
  Plus,
  List,
  BarChart3,
  Clock,
  LogOut,
  User,
} from "lucide-react";
import logoLight from "../welcome/logo-light.svg";
import logoDark from "../welcome/logo-dark.svg";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/hotels", label: "Hotels", icon: Building },
  { to: "/rooms", label: "Rooms", icon: Bed },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/staff", label: "Staff", icon: Users },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { isSidebarCollapsed } = useUI();
  const { isAuthenticated, isAdmin, isCustomer, user, logout } = useAuth();
  const [isBookingDropdownOpen, setIsBookingDropdownOpen] = useState(false);

  // Admin menu items
  const adminLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/hotels", label: "Hotels", icon: Building },
    { to: "/rooms", label: "Rooms", icon: Bed },
    { to: "/reports", label: "Reports", icon: FileText },
    { to: "/settings", label: "Settings", icon: Settings },
    { to: "/staff", label: "Staff", icon: Users },
  ];

  // Customer menu items
  const customerLinks = [
    { to: "/", label: "Trang chủ", icon: Home },
    { to: "/hotels", label: "Khách sạn", icon: Building },
    { to: "/rooms", label: "Phòng", icon: Bed },
  ];

  const bookingOptions = [
    { to: "/booking", label: "Đặt phòng mới", icon: Plus },
    ...(isAdmin ? [
      { to: "/booking/all", label: "Xem tất cả đặt phòng", icon: List },
      { to: "/booking/manage", label: "Quản lý đặt phòng", icon: Calendar },
      { to: "/booking/schedule", label: "Lịch đặt phòng", icon: Clock },
      { to: "/booking/reports", label: "Báo cáo đặt phòng", icon: BarChart3 },
    ] : []),
  ];

  const currentLinks = isAdmin ? adminLinks : customerLinks;

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gradient-to-b from-[#f8f1e9] to-[#fff] dark:from-gray-900 dark:to-gray-800 pt-20 transition-colors duration-300">
        <aside className={`bg-white dark:bg-gray-800 shadow-lg border-r border-[#c9a978]/20 dark:border-gray-700 transition-all duration-300 flex flex-col ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}>
          <div className={`p-6 border-b border-[#c9a978]/20 dark:border-gray-700 ${isSidebarCollapsed ? "p-4" : ""}`}>
            <Link to="/" className="block">
              <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-start"}`}>
                <img
                  src={logoLight}
                  alt="Hotel Manager Logo"
                  className={`transition-all duration-300 ${
                    isSidebarCollapsed ? "w-8 h-8" : "w-10 h-10 mr-3"
                  }`}
                />
                {!isSidebarCollapsed && (
                  <h1 className="font-bold text-[#5a3e2b] dark:text-white text-2xl">
                    Hotel Manager
                  </h1>
                )}
              </div>
            </Link>
          </div>

          <nav className="mt-6 flex-1">
            {currentLinks.map((link, index) => {
              // Add booking dropdown after dashboard for admin
              if (isAdmin && link.to === "/dashboard") {
                return (
                  <div key={link.to}>
                    <Link
                      to={link.to}
                      className={`flex items-center px-6 py-3 text-[#5a3e2b] dark:text-white hover:bg-[#f3e5d0] dark:hover:bg-gray-700 transition-all duration-300 ${
                        pathname === link.to ? "bg-[#d2b48c] text-white dark:bg-gray-700 dark:text-white" : ""
                      } ${isSidebarCollapsed ? "justify-center px-4" : ""}`}
                      title={isSidebarCollapsed ? link.label : ""}
                    >
                      <link.icon className={`w-6 h-6 ${isSidebarCollapsed ? "" : "mr-4"}`} />
                      {!isSidebarCollapsed && <span className="font-medium">{link.label}</span>}
                    </Link>

                    {/* Booking Dropdown - Only for Admin */}
                    <div className={`${isSidebarCollapsed ? "relative" : ""}`}>
                      <button
                        onClick={() => setIsBookingDropdownOpen(!isBookingDropdownOpen)}
                        className={`flex items-center w-full px-6 py-3 text-[#5a3e2b] dark:text-white hover:bg-[#f3e5d0] dark:hover:bg-gray-700 transition-all duration-300 ${
                          bookingOptions.some(option => pathname === option.to) ? "bg-[#d2b48c] text-white dark:bg-gray-700 dark:text-white" : ""
                        } ${isSidebarCollapsed ? "justify-center px-4" : ""}`}
                        title={isSidebarCollapsed ? "Đặt phòng" : ""}
                      >
                        <Calendar className={`w-6 h-6 ${isSidebarCollapsed ? "" : "mr-4"}`} />
                        {!isSidebarCollapsed && (
                          <>
                            <span className="font-medium mr-2">Đặt phòng</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isBookingDropdownOpen ? "rotate-180" : ""}`} />
                          </>
                        )}
                      </button>

                      {!isSidebarCollapsed && isBookingDropdownOpen && (
                        <div className="ml-6 mt-1 space-y-1">
                          {bookingOptions.map((option) => (
                            <Link
                              key={option.to}
                              to={option.to}
                              className={`flex items-center px-6 py-2 text-sm text-[#5a3e2b] dark:text-white hover:bg-[#f3e5d0] dark:hover:bg-gray-700 transition-all duration-300 ${
                                pathname === option.to ? "bg-[#d2b48c] text-white dark:bg-gray-700 dark:text-white" : ""
                              }`}
                              title={option.label}
                            >
                              <option.icon className="w-4 h-4 mr-3" />
                              <span className="font-medium">{option.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center px-6 py-3 text-[#5a3e2b] dark:text-white hover:bg-[#f3e5d0] dark:hover:bg-gray-700 transition-all duration-300 ${
                    pathname === link.to ? "bg-[#d2b48c] text-white dark:bg-gray-700 dark:text-white" : ""
                  } ${isSidebarCollapsed ? "justify-center px-4" : ""}`}
                  title={isSidebarCollapsed ? link.label : ""}
                >
                  <link.icon className={`w-6 h-6 ${isSidebarCollapsed ? "" : "mr-4"}`} />
                  {!isSidebarCollapsed && <span className="font-medium">{link.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout - Bottom of sidebar */}
          {isAuthenticated && (
            <div className="mt-auto border-t border-[#c9a978]/20 dark:border-gray-700 p-4">
              {!isSidebarCollapsed ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#d2b48c] rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#5a3e2b] dark:text-white truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {user?.role === "admin" ? "Quản trị viên" : "Khách hàng"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-[#d2b48c] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <button
                    onClick={logout}
                    className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </aside>
        <main className={`flex-1 p-10 bg-white dark:bg-gray-900 shadow-inner transition-colors duration-300 ${
          isSidebarCollapsed ? "ml-0" : ""
        }`}>
          {children}
        </main>
      </div>
    </>
  );
}
