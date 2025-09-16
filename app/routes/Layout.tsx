import { Link, useLocation } from "react-router-dom";
import { Home, Building, LayoutDashboard, Calendar, CreditCard } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/hotels", label: "Hotels", icon: Building },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Hotel Manager</h1>
        </div>
        <nav className="mt-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 ${
                pathname === link.to ? "bg-gray-200" : ""
              }`}
            >
              <link.icon className="w-6 h-6 mr-4" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
