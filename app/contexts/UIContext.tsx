import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface UIContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarCollapsed") === "true";
    }
    return false;
  });

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", newValue.toString());
      return newValue;
    });
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem("sidebarCollapsed", newValue.toString());
      return newValue;
    });
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <UIContext.Provider
      value={{
        isDark,
        toggleDarkMode,
        isSidebarCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
