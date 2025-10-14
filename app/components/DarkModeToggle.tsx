import { Moon, Sun } from "lucide-react";
import { useUI } from "../contexts/UIContext";
import { useEffect, useRef } from "react";

interface DarkModeToggleProps {
  targetElement?: string; // ID của element cần áp dụng dark mode
  className?: string;
  mode?: 'global' | 'local'; // Chế độ dark mode
}

export default function DarkModeToggle({ targetElement, className = "", mode = 'global' }: DarkModeToggleProps) {
  const { isDark, toggleDarkMode, darkModeElement, setDarkModeElement } = useUI();
  const elementRef = useRef<HTMLElement | null>(null);

  // Áp dụng dark mode cho element cụ thể hoặc toàn bộ trang
  useEffect(() => {
    if (mode === 'local' && targetElement) {
      elementRef.current = document.getElementById(targetElement);
    } else {
      elementRef.current = document.documentElement;
    }

    if (elementRef.current) {
      if (isDark) {
        elementRef.current.classList.add("dark");
      } else {
        elementRef.current.classList.remove("dark");
      }
    }
  }, [isDark, targetElement, mode]);

  const handleToggle = () => {
    if (mode === 'local' && targetElement) {
      setDarkModeElement(darkModeElement === targetElement ? null : targetElement);
    }
    toggleDarkMode();
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full bg-[#d2b48c] hover:bg-[#c9a978] text-white transition-all duration-300 transform hover:scale-105 ${className}`}
      title={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
