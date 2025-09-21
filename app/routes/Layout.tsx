import { Link, useLocation } from "react-router-dom";
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
} from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

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

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#f8f1e9] to-[#fff]">
      <aside className="w-64 bg-white shadow-lg border-r border-[#c9a978]/20">
        <div className="p-6 border-b border-[#c9a978]/20">
          <h1 className="text-2xl font-bold text-[#5a3e2b]">Hotel Manager</h1>
        </div>
        <nav className="mt-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center px-6 py-3 text-[#5a3e2b] hover:bg-[#f3e5d0] transition-all duration-300 ${
                pathname === link.to ? "bg-[#d2b48c] text-white" : ""
              }`}
            >
              <link.icon className="w-6 h-6 mr-4" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-10 bg-white shadow-inner">{children}</main>
    </div>
  );
} 