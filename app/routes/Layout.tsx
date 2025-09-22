import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Building,
  LayoutDashboard,
  Bed,
  FileText,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#f8f1e9] to-[#fff]">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } bg-white shadow-lg border-r border-[#c9a978]/20`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-[#c9a978]/20">
          {!collapsed && (
            <Link
      to="/"
      className="text-lg font-bold text-[#5a3e2b] tracking-wide hover:text-[#b68d40] transition"
    >
      Hotel Manager
    </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#5a3e2b] hover:text-[#d2b48c] transition"
          >
            {collapsed ? "➡️" : "⬅️"}
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center px-6 py-3 text-[#5a3e2b] hover:bg-[#f3e5d0] transition-all duration-300
                ${
                  pathname === link.to
                    ? "bg-[#d2b48c] text-white border-l-4 border-[#5a3e2b]"
                    : ""
                }`}
            >
              <link.icon className="w-6 h-6 mr-4" />
              {!collapsed && <span className="font-medium">{link.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white shadow-inner">{children}</main>
    </div>
  );
}
