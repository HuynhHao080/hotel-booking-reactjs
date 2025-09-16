import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Home,
  Building,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/hotels", label: "Hotels", icon: Building },
  { to: "/customers", label: "Customers", icon: Users },
];

export default function Layout() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  function handleToggle() {
    setCollapsed((prev) => !prev);
  }

  return (
    <div className="min-h-screen font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen shadow-md transition-all duration-300 z-40
          ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Nút toggle */}
        <button
          onClick={handleToggle}
          className="absolute top-1/2 -right-3 z-50 transform -translate-y-1/2 
                     bg-white border border-gray-300 rounded-full p-1 shadow 
                     hover:bg-gray-100 transition cursor-pointer"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        <div className="p-6 border-b">
          {!collapsed && (
            <h1 className="text-xl font-bold">Hotel Manager</h1>
          )}
        </div>

        <nav className="mt-2 flex-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center px-6 py-3 hover:bg-gray-200 transition ${
                pathname === link.to ? "font-semibold bg-gray-200" : ""
              }`}
            >
              <link.icon className="w-5 h-5" />
              {!collapsed && <span className="ml-3">{link.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-4 shadow">
          <h2 className="text-xl font-bold">
            {pathname === "/" ? "Home" : pathname.replace("/", "").toUpperCase()}
          </h2>
          <div className="flex gap-4 items-center">
            <ThemeToggle />
            <Link
              to="/login"
              className="px-4 py-2 border rounded-lg hover:bg-gray-200 transition"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Đăng ký
            </Link>
          </div>
        </header>

        {/* Nội dung */}
        <main className="flex-1 p-10">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-6 text-center">
          <p>© {new Date().getFullYear()} Hotel Manager. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
