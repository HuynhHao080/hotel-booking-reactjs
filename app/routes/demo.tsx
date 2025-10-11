import { useAuth } from "../contexts/AuthContext";
import { Crown, Users, ArrowRight, CheckCircle, Hotel, Search, Star } from "lucide-react";
import EnhancedSearch from "../components/EnhancedSearch";
import EnhancedHotelCard from "../components/EnhancedHotelCard";

export default function Demo() {
  const { isAuthenticated, isAdmin, isCustomer, user } = useAuth();

  const demoAccounts = [
    {
      role: "admin",
      email: "admin@hotel.com",
      password: "admin123",
      name: "Quản trị viên",
      description: "Có toàn quyền truy cập tất cả chức năng quản lý",
      features: [
        "Quản lý khách sạn",
        "Quản lý phòng",
        "Quản lý nhân viên",
        "Xem báo cáo",
        "Cấu hình hệ thống",
        "Quản lý đặt phòng",
        "Lịch đặt phòng",
        "Báo cáo đặt phòng"
      ]
    },
    {
      role: "customer",
      email: "customer@hotel.com",
      password: "customer123",
      name: "Khách hàng",
      description: "Chỉ có thể đặt phòng và xem thông tin cá nhân",
      features: [
        "Đặt phòng khách sạn",
        "Xem danh sách phòng",
        "Xem thông tin cá nhân",
        "Đăng nhập/Đăng ký"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Hệ thống phân quyền Hotel Manager
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Hệ thống có hai loại tài khoản với quyền truy cập khác nhau để đảm bảo bảo mật và dễ quản lý
        </p>
      </div>

      {/* Current User Status */}
      {isAuthenticated && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Trạng thái hiện tại
          </h2>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isAdmin ? "bg-purple-100 dark:bg-purple-900" : "bg-blue-100 dark:bg-blue-900"
            }`}>
              {isAdmin ? (
                <Crown className="w-8 h-8 text-purple-600" />
              ) : (
                <Users className="w-8 h-8 text-blue-600" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {isAdmin ? "Quản trị viên" : "Khách hàng"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Demo Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {demoAccounts.map((account) => (
          <div key={account.role} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                account.role === "admin"
                  ? "bg-purple-100 dark:bg-purple-900"
                  : "bg-blue-100 dark:bg-blue-900"
              }`}>
                {account.role === "admin" ? (
                  <Crown className="w-6 h-6 text-purple-600" />
                ) : (
                  <Users className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {account.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {account.description}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Thông tin đăng nhập:
              </h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Email:</span>
                  <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm">
                    {account.email}
                  </code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Mật khẩu:</span>
                  <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm">
                    {account.password}
                  </code>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Quyền truy cập:
              </h4>
              <div className="space-y-2">
                {account.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Hướng dẫn sử dụng
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-600 font-semibold text-sm">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Đăng nhập với tài khoản Admin
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sử dụng tài khoản <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">admin@hotel.com</code> / <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">admin123</code> để truy cập tất cả chức năng quản lý
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-green-600 font-semibold text-sm">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Đăng nhập với tài khoản Customer
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sử dụng tài khoản <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">customer@hotel.com</code> / <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">customer123</code> để trải nghiệm giao diện khách hàng
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-purple-600 font-semibold text-sm">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Khám phá các chức năng
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Với tài khoản Admin, bạn sẽ thấy dropdown "Đặt phòng" với đầy đủ chức năng quản lý. Với tài khoản Customer, bạn sẽ thấy giao diện đơn giản hơn chỉ dành cho việc đặt phòng.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Helper */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Bắt đầu trải nghiệm
        </h3>
        <div className="flex flex-wrap gap-4">
          <a
            href="/login"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowRight className="w-4 h-4" />
            Đăng nhập ngay
          </a>
          <a
            href="/register"
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Users className="w-4 h-4" />
            Tạo tài khoản mới
          </a>
        </div>
      </div>
    </div>
  );
}
