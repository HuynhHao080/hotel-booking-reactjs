interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: 'admin' | 'staff' | 'manager';
  permissions: string[];
  phone?: string;
  address?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

// Tài khoản admin mặc định
const DEFAULT_ADMIN = {
  id: 1,
  name: "Administrator",
  email: "admin@hotelmanager.com",
  password: "HotelManager@2024!",
  avatar: "https://ui-avatars.com/api/?name=Administrator&background=d2b48c&color=5a3e2b&size=128&bold=true",
  role: "admin" as const,
  permissions: [
    "hotels.create", "hotels.read", "hotels.update", "hotels.delete",
    "rooms.create", "rooms.read", "rooms.update", "rooms.delete",
    "bookings.create", "bookings.read", "bookings.update", "bookings.delete",
    "customers.create", "customers.read", "customers.update", "customers.delete",
    "staff.create", "staff.read", "staff.update", "staff.delete",
    "reports.read", "reports.export",
    "settings.update"
  ]
};

class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Helper function để kiểm tra localStorage availability
  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  // Đăng nhập với tài khoản admin mặc định
  async login(email: string, password: string): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Kiểm tra tài khoản admin mặc định
        if (email === "admin@hotelmanager.com" && password === "HotelManager@2024!") {
          // Tạo thông tin admin không có mật khẩu
          const adminForStorage = { ...DEFAULT_ADMIN };
          delete (adminForStorage as any).password;

          const token = "admin-token-" + Date.now();
          const response: AuthResponse = {
            user: adminForStorage,
            token: token
          };

          // Lưu vào localStorage nếu có sẵn
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem('user', JSON.stringify({
              ...adminForStorage,
              role: "admin",
              permissions: [
                "hotels.create", "hotels.read", "hotels.update", "hotels.delete",
                "rooms.create", "rooms.read", "rooms.update", "rooms.delete",
                "bookings.create", "bookings.read", "bookings.update", "bookings.delete",
                "customers.create", "customers.read", "customers.update", "customers.delete",
                "staff.create", "staff.read", "staff.update", "staff.delete",
                "reports.read", "reports.export",
                "settings.update"
              ]
            }));
            localStorage.setItem('token', token);
          }

          resolve(response);
          return;
        }

        // Kiểm tra các tài khoản khác từ localStorage (đăng ký trước đó)
        const existingUsers = this.getStoredUsers();
        const passwords = this.getStoredPasswords();
        const user = existingUsers.find(u => u.email === email);

        if (user && passwords[email] === password) {
          const token = "user-token-" + Date.now();
          const response: AuthResponse = {
            user: {
              ...user,
              role: "staff",
              permissions: [
                "hotels.read", "rooms.read", "bookings.create", "bookings.read",
                "customers.read", "reports.read"
              ]
            },
            token: token
          };

          if (this.isLocalStorageAvailable()) {
            localStorage.setItem('user', JSON.stringify({
              ...user,
              role: "staff",
              permissions: [
                "hotels.read", "rooms.read", "bookings.create", "bookings.read",
                "customers.read", "reports.read"
              ]
            }));
            localStorage.setItem('token', token);
          }

          resolve(response);
          return;
        }

        reject(new Error("Email hoặc mật khẩu không đúng"));
      }, 500); // Simulate API delay
    });
  }

  // Đăng ký tài khoản mới
  async register(userData: { name: string; email: string; password: string }): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUsers = this.getStoredUsers();

        // Kiểm tra email đã tồn tại
        if (existingUsers.some(u => u.email === userData.email)) {
          reject(new Error("Email đã được sử dụng"));
          return;
        }

        const newUser: User = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          password: userData.password,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=d2b48c&color=5a3e2b&size=128`,
          role: "staff",
          permissions: [
            "hotels.read", "rooms.read", "bookings.create", "bookings.read",
            "customers.read", "reports.read"
          ],
          phone: "",
          address: ""
        };

        // Lưu vào localStorage (lưu mật khẩu riêng biệt để bảo mật)
        const userForStorage = { ...newUser };
        delete (userForStorage as any).password; // Xóa mật khẩu khỏi thông tin user

        existingUsers.push(userForStorage);

        // Lưu mật khẩu riêng biệt
        const passwords = this.getStoredPasswords();
        passwords[userData.email] = userData.password;
        if (this.isLocalStorageAvailable()) {
          localStorage.setItem('userPasswords', JSON.stringify(passwords));
          localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
        }

        const token = "user-token-" + Date.now();
        const response: AuthResponse = {
          user: {
            ...userForStorage,
            role: "staff",
            permissions: [
              "hotels.read", "rooms.read", "bookings.create", "bookings.read",
              "customers.read", "reports.read"
            ]
          },
          token: token
        };

        if (this.isLocalStorageAvailable()) {
          localStorage.setItem('user', JSON.stringify({
            ...userForStorage,
            role: "staff",
            permissions: [
              "hotels.read", "rooms.read", "bookings.create", "bookings.read",
              "customers.read", "reports.read"
            ]
          }));
          localStorage.setItem('token', token);
        }

        resolve(response);
      }, 500);
    });
  }

  // Lấy danh sách users đã đăng ký từ localStorage
  private getStoredUsers(): User[] {
    try {
      // Kiểm tra xem có đang chạy trong browser environment không
      if (typeof localStorage === 'undefined') {
        return [];
      }
      const stored = localStorage.getItem('registeredUsers');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Lấy danh sách mật khẩu từ localStorage
  private getStoredPasswords(): { [email: string]: string } {
    try {
      // Kiểm tra xem có đang chạy trong browser environment không
      if (typeof localStorage === 'undefined') {
        return {};
      }
      const stored = localStorage.getItem('userPasswords');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  // Đăng xuất
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    // Không xóa mật khẩu để user có thể đăng nhập lại
  }

  // Lấy thông tin user hiện tại
  getCurrentUser(): User | null {
    try {
      if (!this.isLocalStorageAvailable()) {
        return null;
      }
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  // Kiểm tra quyền truy cập
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    return user.permissions.includes(permission);
  }

  // Kiểm tra role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    return user.role === role;
  }

  // Khởi tạo tài khoản admin mặc định nếu chưa có
  initializeDefaultAdmin(): void {
    const existingUsers = this.getStoredUsers();
    const adminExists = existingUsers.some(u => u.email === "admin@hotelmanager.com");

    if (!adminExists) {
      // Lưu admin vào danh sách users (không có mật khẩu)
      const adminForStorage = { ...DEFAULT_ADMIN };
      delete (adminForStorage as any).password;
      existingUsers.push(adminForStorage);

      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      }
    }
  }

  // Đổi mật khẩu admin
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Kiểm tra mật khẩu hiện tại có đúng không
        if (currentPassword !== DEFAULT_ADMIN.password) {
          reject(new Error("Mật khẩu hiện tại không đúng"));
          return;
        }

        // Kiểm tra mật khẩu mới có đủ mạnh không
        if (newPassword.length < 8) {
          reject(new Error("Mật khẩu mới phải có ít nhất 8 ký tự"));
          return;
        }

        // Cập nhật mật khẩu trong DEFAULT_ADMIN
        (DEFAULT_ADMIN as any).password = newPassword;

        // Cập nhật mật khẩu trong localStorage nếu có sẵn
        if (this.isLocalStorageAvailable()) {
          const existingUsers = this.getStoredUsers();
          const adminIndex = existingUsers.findIndex(u => u.email === "admin@hotelmanager.com");

          if (adminIndex !== -1) {
            // Cập nhật thông tin admin trong danh sách users đã đăng ký
            existingUsers[adminIndex] = {
              ...existingUsers[adminIndex],
              password: newPassword
            };
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
          }
        }

        resolve();
      }, 500);
    });
  }
}

// Khởi tạo service và tài khoản admin mặc định
const authService = AuthService.getInstance();
authService.initializeDefaultAdmin();

export default authService;
export type { User, AuthResponse };
