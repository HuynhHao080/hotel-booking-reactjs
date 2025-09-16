import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Load theme từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }
  }, []);

  // Toggle theme
  function toggleTheme() {
    if (dark) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 transition-colors duration-300"
    >
      <span
        className={`absolute left-1 w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          dark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {dark ? (
          <Moon className="w-4 h-4 text-yellow-400" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </span>
    </button>
  );
}
