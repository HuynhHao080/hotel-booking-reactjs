import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface UIContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  darkModeElement: string | null;
  setDarkModeElement: (elementId: string | null) => void;
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

  const [darkModeElement, setDarkModeElement] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkModeElement");
    }
    return null;
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

  const handleSetDarkModeElement = (elementId: string | null) => {
    setDarkModeElement(elementId);
    if (elementId) {
      localStorage.setItem("darkModeElement", elementId);
    } else {
      localStorage.removeItem("darkModeElement");
    }
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
        darkModeElement,
        setDarkModeElement: handleSetDarkModeElement,
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
