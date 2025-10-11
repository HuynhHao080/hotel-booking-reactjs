import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage or token)
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - in real app, this would call an API
      if (email === "admin@hotel.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin-1",
          name: "Quản trị viên",
          email: "admin@hotel.com",
          role: "admin",
          avatar: "/images/admin-avatar.jpg"
        };
        setUser(adminUser);
        localStorage.setItem("currentUser", JSON.stringify(adminUser));
        return true;
      } else if (email === "customer@hotel.com" && password === "customer123") {
        const customerUser: User = {
          id: "customer-1",
          name: "Khách hàng",
          email: "customer@hotel.com",
          role: "customer",
          avatar: "/images/customer-avatar.jpg"
        };
        setUser(customerUser);
        localStorage.setItem("currentUser", JSON.stringify(customerUser));
        return true;
      } else {
        // Demo: any other email/password combination creates a customer account
        const customerUser: User = {
          id: `customer-${Date.now()}`,
          name: email.split("@")[0],
          email: email,
          role: "customer"
        };
        setUser(customerUser);
        localStorage.setItem("currentUser", JSON.stringify(customerUser));
        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isCustomer: user?.role === "customer"
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
