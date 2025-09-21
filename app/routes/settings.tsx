import { Settings as SettingsIcon, Save, User, Lock } from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f1e9] to-[#fff] text-[#5a3e2b] p-6 md:p-12 font-sans">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-6 text-[#5a3e2b] animate-fadeInUp">
        Cài đặt
      </h1>
      <p className="text-lg mb-8 text-gray-700 animate-fadeInUp delay-200">
        Quản lý và tùy chỉnh cài đặt cho hệ thống khách sạn.
      </p>

      {/* Settings Options */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-between p-4 border-b border-[#c9a978]/20">
          <div className="flex items-center">
            <User className="w-6 h-6 mr-4 text-[#d2b48c]" />
            <span className="text-lg font-medium">Thông tin tài khoản</span>
          </div>
          <button className="text-[#5a3e2b] hover:text-[#c9a978] transition">
            <Save className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-between p-4 border-b border-[#c9a978]/20">
          <div className="flex items-center">
            <Lock className="w-6 h-6 mr-4 text-[#d2b48c]" />
            <span className="text-lg font-medium">Đổi mật khẩu</span>
          </div>
          <button className="text-[#5a3e2b] hover:text-[#c9a978] transition">
            <Save className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-[#5a3e2b]/70 text-center text-lg animate-fadeInUp delay-300">
            Các cài đặt khác sẽ được thêm khi backend tích hợp!
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fadeInUp.delay-200 { animation-delay: 0.2s; }
        .animate-fadeInUp.delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}