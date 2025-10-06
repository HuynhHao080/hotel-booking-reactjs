import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useUI } from "../contexts/UIContext";
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

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gradient-to-b from-[#f8f1e9] to-[#fff] dark:from-gray-900 dark:to-gray-800 pt-20 transition-colors duration-300">
        <aside className={`bg-white dark:bg-gray-800 shadow-lg border-r border-[#c9a978]/20 dark:border-gray-700 transition-all duration-300 ${
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
          <nav className="mt-6">
            {links.map((link) => (
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
            ))}
          </nav>
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
