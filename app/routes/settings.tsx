import { useState } from "react";
import {
  Settings as SettingsIcon, Save, User, Lock, Bell,
  Palette, Globe, Shield, Database, Mail, Phone,
  MapPin, CreditCard, Clock, Monitor, Smartphone,
  Sun, Moon, Eye, EyeOff, Check, X, AlertCircle
} from "lucide-react";
import { useUI } from "../contexts/UIContext";
import authService from "../services/authService";

interface SettingsSection {
  id: string;
  title: string;
  icon: any;
  description: string;
  settings: SettingItem[];
}

interface SettingItem {
  id: string;
  label: string;
  type: 'toggle' | 'select' | 'input' | 'textarea';
  value: any;
  options?: { label: string; value: any }[];
  description?: string;
}

export default function Settings() {
  const { isDark } = useUI();
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [settings, setSettings] = useState({
    profile: {
      name: "Nguyen Van A",
      email: "admin@hotelmanager.com",
      phone: "0901234567",
      position: "Quản lý khách sạn",
      bio: "Quản lý khách sạn với hơn 5 năm kinh nghiệm trong ngành dịch vụ lưu trú."
    },
    security: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: false,
      sessionTimeout: "30"
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      bookingAlerts: true,
      maintenanceAlerts: true,
      reportAlerts: false
    },
    appearance: {
      theme: "light",
      language: "vi",
      timezone: "Asia/Ho_Chi_Minh",
      dateFormat: "DD/MM/YYYY",
      currency: "VND"
    },
    system: {
      autoBackup: true,
      backupFrequency: "daily",
      dataRetention: "90",
      maintenanceMode: false,
      debugMode: false
    }
  });

  const settingsSections: SettingsSection[] = [
    {
      id: "profile",
      title: "Thông tin cá nhân",
      icon: User,
      description: "Quản lý thông tin cá nhân và tài khoản",
      settings: [
        { id: "name", label: "Họ và tên", type: "input", value: settings.profile.name },
        { id: "email", label: "Email", type: "input", value: settings.profile.email },
        { id: "phone", label: "Số điện thoại", type: "input", value: settings.profile.phone },
        { id: "position", label: "Chức vụ", type: "input", value: settings.profile.position },
        { id: "bio", label: "Mô tả", type: "textarea", value: settings.profile.bio }
      ]
    },
    {
      id: "security",
      title: "Bảo mật",
      icon: Shield,
      description: "Cài đặt bảo mật và xác thực",
      settings: [
        { id: "currentPassword", label: "Mật khẩu hiện tại", type: "input", value: settings.security.currentPassword },
        { id: "newPassword", label: "Mật khẩu mới", type: "input", value: settings.security.newPassword },
        { id: "confirmPassword", label: "Xác nhận mật khẩu", type: "input", value: settings.security.confirmPassword },
        { 
          id: "twoFactorEnabled", 
          label: "Xác thực hai yếu tố", 
          type: "toggle", 
          value: settings.security.twoFactorEnabled,
          description: "Bật xác thực hai yếu tố để tăng bảo mật"
        },
        { 
          id: "sessionTimeout", 
          label: "Thời gian đăng xuất tự động", 
          type: "select", 
          value: settings.security.sessionTimeout,
          options: [
            { label: "15 phút", value: "15" },
            { label: "30 phút", value: "30" },
            { label: "1 giờ", value: "60" },
            { label: "4 giờ", value: "240" }
          ]
        }
      ]
    },
    {
      id: "notifications",
      title: "Thông báo",
      icon: Bell,
      description: "Cấu hình thông báo và cảnh báo",
      settings: [
        { 
          id: "emailNotifications", 
          label: "Thông báo qua email", 
          type: "toggle", 
          value: settings.notifications.emailNotifications,
          description: "Nhận thông báo qua email"
        },
        { 
          id: "smsNotifications", 
          label: "Thông báo qua SMS", 
          type: "toggle", 
          value: settings.notifications.smsNotifications,
          description: "Nhận thông báo qua tin nhắn SMS"
        },
        { 
          id: "pushNotifications", 
          label: "Thông báo đẩy", 
          type: "toggle", 
          value: settings.notifications.pushNotifications,
          description: "Nhận thông báo đẩy trên ứng dụng"
        },
        { 
          id: "bookingAlerts", 
          label: "Cảnh báo đặt phòng", 
          type: "toggle", 
          value: settings.notifications.bookingAlerts,
          description: "Thông báo khi có đặt phòng mới"
        },
        { 
          id: "maintenanceAlerts", 
          label: "Cảnh báo bảo trì", 
          type: "toggle", 
          value: settings.notifications.maintenanceAlerts,
          description: "Thông báo khi có sự cố cần bảo trì"
        },
        { 
          id: "reportAlerts", 
          label: "Báo cáo tự động", 
          type: "toggle", 
          value: settings.notifications.reportAlerts,
          description: "Nhận báo cáo hàng ngày qua email"
        }
      ]
    },
    {
      id: "appearance",
      title: "Giao diện",
      icon: Palette,
      description: "Tùy chỉnh giao diện và ngôn ngữ",
      settings: [
        { 
          id: "theme", 
          label: "Chủ đề", 
          type: "select", 
          value: settings.appearance.theme,
          options: [
            { label: "Sáng", value: "light" },
            { label: "Tối", value: "dark" },
            { label: "Tự động", value: "auto" }
          ]
        },
        { 
          id: "language", 
          label: "Ngôn ngữ", 
          type: "select", 
          value: settings.appearance.language,
          options: [
            { label: "Tiếng Việt", value: "vi" },
            { label: "English", value: "en" },
            { label: "日本語", value: "ja" }
          ]
        },
        { 
          id: "timezone", 
          label: "Múi giờ", 
          type: "select", 
          value: settings.appearance.timezone,
          options: [
            { label: "Asia/Ho_Chi_Minh", value: "Asia/Ho_Chi_Minh" },
            { label: "Asia/Tokyo", value: "Asia/Tokyo" },
            { label: "America/New_York", value: "America/New_York" }
          ]
        },
        { 
          id: "dateFormat", 
          label: "Định dạng ngày", 
          type: "select", 
          value: settings.appearance.dateFormat,
          options: [
            { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
            { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
            { label: "YYYY-MM-DD", value: "YYYY-MM-DD" }
          ]
        },
        { 
          id: "currency", 
          label: "Tiền tệ", 
          type: "select", 
          value: settings.appearance.currency,
          options: [
            { label: "VNĐ", value: "VND" },
            { label: "USD", value: "USD" },
            { label: "JPY", value: "JPY" }
          ]
        }
      ]
    },
    {
      id: "system",
      title: "Hệ thống",
      icon: Database,
      description: "Cài đặt hệ thống và bảo trì",
      settings: [
        { 
          id: "autoBackup", 
          label: "Sao lưu tự động", 
          type: "toggle", 
          value: settings.system.autoBackup,
          description: "Tự động sao lưu dữ liệu hàng ngày"
        },
        { 
          id: "backupFrequency", 
          label: "Tần suất sao lưu", 
          type: "select", 
          value: settings.system.backupFrequency,
          options: [
            { label: "Hàng ngày", value: "daily" },
            { label: "Hàng tuần", value: "weekly" },
            { label: "Hàng tháng", value: "monthly" }
          ]
        },
        { 
          id: "dataRetention", 
          label: "Giữ dữ liệu (ngày)", 
          type: "select", 
          value: settings.system.dataRetention,
          options: [
            { label: "30 ngày", value: "30" },
            { label: "90 ngày", value: "90" },
            { label: "180 ngày", value: "180" },
            { label: "365 ngày", value: "365" }
          ]
        },
        { 
          id: "maintenanceMode", 
          label: "Chế độ bảo trì", 
          type: "toggle", 
          value: settings.system.maintenanceMode,
          description: "Tạm dừng hệ thống để bảo trì"
        },
        { 
          id: "debugMode", 
          label: "Chế độ debug", 
          type: "toggle", 
          value: settings.system.debugMode,
          description: "Hiển thị thông tin debug (chỉ dành cho developer)"
        }
      ]
    }
  ];

  const handleSettingChange = (sectionId: string, settingId: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId as keyof typeof prev],
        [settingId]: value
      }
    }));
  };

  const handleSave = async (sectionId: string) => {
    setIsLoading(true);
    setMessage(null);

    try {
      if (sectionId === 'security') {
        // Xử lý đặc biệt cho section bảo mật (đổi mật khẩu)
        const { currentPassword, newPassword, confirmPassword } = settings.security;

        // Validate mật khẩu
        if (!currentPassword) {
          throw new Error("Vui lòng nhập mật khẩu hiện tại");
        }

        if (!newPassword) {
          throw new Error("Vui lòng nhập mật khẩu mới");
        }

        if (newPassword !== confirmPassword) {
          throw new Error("Mật khẩu xác nhận không khớp");
        }

        if (newPassword.length < 8) {
          throw new Error("Mật khẩu mới phải có ít nhất 8 ký tự");
        }

        // Đổi mật khẩu
        await authService.changePassword(currentPassword, newPassword);

        // Reset form và hiển thị thông báo thành công
        setSettings(prev => ({
          ...prev,
          security: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            twoFactorEnabled: prev.security.twoFactorEnabled,
            sessionTimeout: prev.security.sessionTimeout
          }
        }));

        setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });

      } else {
        // Xử lý các section khác như bình thường
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessage({ type: 'success', text: 'Lưu cài đặt thành công!' });
      }

    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Có lỗi xảy ra'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderSettingInput = (setting: SettingItem, sectionId: string) => {
    const commonClasses = `w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968] transition-colors duration-300 ${
      isDark
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
    }`;

    switch (setting.type) {
      case 'toggle':
        return (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                {setting.label}
              </label>
              {setting.description && (
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {setting.description}
                </p>
              )}
            </div>
            <button
              onClick={() => handleSettingChange(sectionId, setting.id, !setting.value)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                setting.value ? 'bg-[#caa968]' : isDark ? 'bg-gray-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  setting.value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        );

      case 'select':
        return (
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {setting.label}
            </label>
            <select
              value={setting.value}
              onChange={(e) => handleSettingChange(sectionId, setting.id, e.target.value)}
              className={commonClasses}
            >
              {setting.options?.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {setting.label}
            </label>
            <textarea
              value={setting.value}
              onChange={(e) => handleSettingChange(sectionId, setting.id, e.target.value)}
              className={`${commonClasses} resize-none`}
              rows={4}
              placeholder={`Nhập ${setting.label.toLowerCase()}...`}
            />
          </div>
        );

      default: // input
        const inputType = setting.id.includes('password') ? 'password' : 'text';
        return (
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {setting.label}
            </label>
            <div className="relative">
              <input
                type={setting.id.includes('password') && !showPassword ? 'password' : 'text'}
                value={setting.value}
                onChange={(e) => handleSettingChange(sectionId, setting.id, e.target.value)}
                className={commonClasses}
                placeholder={`Nhập ${setting.label.toLowerCase()}...`}
              />
              {setting.id.includes('password') && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-gray-600 transition-colors duration-300 ${
                    isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400'
                  }`}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
            </div>
          </div>
        );
    }
  };

  const currentSection = settingsSections.find(s => s.id === activeSection);

  return (
    <div className={`min-h-screen transition-colors duration-300 p-6 md:p-12 font-sans ${
      isDark
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-b from-[#fdfaf6] to-[#f4ede4] text-[#4b2e1e]'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 animate-fadeInUp">
        <SettingsIcon className={`h-10 w-10 ${isDark ? 'text-blue-400' : 'text-[#b68d40]'}`} />
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Cài đặt hệ thống</h1>
          <p className={`text-lg mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Quản lý và tùy chỉnh cài đặt cho hệ thống khách sạn
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className={`backdrop-blur-md rounded-3xl shadow-lg p-6 transition-colors duration-300 ${
            isDark ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90'
          }`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#4b2e1e]'}`}>
              Danh mục cài đặt
            </h2>
            <nav className="space-y-2">
              {settingsSections.map(section => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center p-3 rounded-2xl text-left transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-[#caa968] text-white'
                        : isDark
                          ? 'hover:bg-gray-700 text-gray-300'
                          : 'hover:bg-[#f3e5d0] text-gray-700'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className={`text-xs ${
                        activeSection === section.id
                          ? 'text-white/80'
                          : isDark
                            ? 'text-gray-400'
                            : 'text-gray-500'
                      }`}>
                        {section.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {currentSection && (
            <div className={`backdrop-blur-md rounded-3xl shadow-lg p-6 transition-colors duration-300 ${
              isDark ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90'
            }`}>
              {/* Thông báo lỗi/thành công */}
              {message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center ${
                  message.type === 'success'
                    ? isDark
                      ? 'bg-green-900/50 border border-green-700 text-green-300'
                      : 'bg-green-100 border border-green-300 text-green-700'
                    : isDark
                      ? 'bg-red-900/50 border border-red-700 text-red-300'
                      : 'bg-red-100 border border-red-300 text-red-700'
                }`}>
                  {message.type === 'success' ? (
                    <Check className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2" />
                  )}
                  {message.text}
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#4b2e1e]'}`}>
                    {currentSection.title}
                  </h2>
                  <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {currentSection.description}
                  </p>
                </div>
                <button
                  onClick={() => handleSave(activeSection)}
                  disabled={isLoading}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-[#caa968] to-[#e4cfa3] text-[#4b2e1e] font-semibold rounded-2xl shadow-md hover:shadow-xl hover:from-[#b68d40] hover:to-[#d6b77a] transition-all duration-300 disabled:opacity-50"
                >
                  <Save className="mr-2 h-5 w-5" />
                  {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>

              <div className={`space-y-6 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                {currentSection.settings.map(setting => (
                  <div key={setting.id} className={`pb-6 last:pb-0 ${
                    isDark ? 'border-gray-700' : 'border-gray-100'
                  }`}>
                    {renderSettingInput(setting, activeSection)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}
