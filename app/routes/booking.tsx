import { useUI } from "../contexts/UIContext";
import BookingSystem from "../components/BookingSystem";
import {
  Calendar,
  Star,
  Shield,
  Clock,
  CheckCircle,
  Users,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
} from "lucide-react";

export default function Booking() {
  const { isDark } = useUI();

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Đặt phòng an toàn",
      description: "Hệ thống bảo mật SSL 256-bit"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ CSKH luôn sẵn sàng"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Xác nhận tức thì",
      description: "Nhận mã đặt phòng ngay lập tức"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Đảm bảo giá tốt nhất",
      description: "Cam kết giá cạnh tranh nhất"
    }
  ];

  const handleBookingComplete = (booking: any) => {
    console.log("Booking completed:", booking);
    // TODO: Handle booking completion - redirect to success page, send email, etc.
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-[#f8f1e9] to-[#fff] text-gray-900'
    }`}>
      {/* Header */}
      <div className={`p-6 border-b transition-colors duration-300 ${
        isDark ? 'border-gray-700 bg-gray-800' : 'border-[#c9a978]/20 bg-white/80'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🏨</div>
              <div>
                <h1 className="text-2xl font-bold">Đặt Phòng Paradise Hotel</h1>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Hệ thống đặt phòng trực tuyến nhanh chóng và an toàn
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm font-medium ml-2">4.9/5</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  2,847 đánh giá
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className={`py-4 px-6 transition-colors duration-300 ${
        isDark ? 'bg-gray-800 border-b border-gray-700' : 'bg-blue-50 border-b border-blue-200'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`p-1 rounded-full ${
                  isDark ? 'bg-blue-600' : 'bg-blue-100'
                }`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <div>
                  <p className="text-sm font-medium">{feature.title}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Booking System */}
      <BookingSystem onBookingComplete={handleBookingComplete} />

      {/* Trust Indicators */}
      <div className={`py-8 px-6 transition-colors duration-300 ${
        isDark ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-lg font-bold mb-4">Tại sao chọn Paradise Hotel?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="font-medium">Khách sạn 5 sao</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Tiêu chuẩn quốc tế
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📍</div>
              <p className="font-medium">Vị trí đắc địa</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Trung tâm thành phố
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <p className="font-medium">Phục vụ 24/7</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Đội ngũ chuyên nghiệp
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <p className="font-medium">An toàn tuyệt đối</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Hệ thống bảo mật cao
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-6 px-6 text-center transition-colors duration-300 ${
        isDark ? 'bg-gray-900 border-t border-gray-700' : 'bg-white border-t border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2024 Paradise Hotel. Tất cả quyền được bảo lưu. |
            <span className="mx-2">•</span>
            <span className="text-blue-500 hover:underline cursor-pointer">Điều khoản sử dụng</span>
            <span className="mx-2">•</span>
            <span className="text-blue-500 hover:underline cursor-pointer">Chính sách bảo mật</span>
            <span className="mx-2">•</span>
            <span className="text-blue-500 hover:underline cursor-pointer">Liên hệ hỗ trợ</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
