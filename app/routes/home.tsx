import { Link } from "react-router-dom";
import { LayoutDashboard, Building, Calendar, CreditCard, Bed, FileText, Settings, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-[#f8f1e9] to-[#fff]">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md shadow-lg z-50">
        <h1 className="text-2xl font-bold text-[#5a3e2b]">Hotel Manager</h1>
        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 border-2 border-[#5a3e2b] text-[#5a3e2b] rounded-full hover:bg-[#f3e5d0] transition">
            Đăng nhập
          </Link>
          <Link to="/register" className="px-4 py-2 bg-[#d2b48c] text-white rounded-full hover:bg-[#c9a978] transition">
            Đăng ký
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/hotel-hero.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="relative z-10 max-w-4xl px-8 py-12 bg-black/60 rounded-2xl shadow-xl text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold animate-fadeInUp">Hotel Manager System</h1>
          <p className="mt-4 text-xl md:text-2xl animate-fadeInUp delay-200">Nền tảng quản lý khách sạn toàn diện 🚀</p>
          <Link to="/dashboard" className="mt-8 inline-block px-8 py-3 bg-gradient-to-r from-[#f3e5d0] to-[#d2b48c] text-[#5a3e2b] rounded-full shadow-lg hover:from-[#efd9b3] hover:to-[#c9a978] transition animate-fadeInUp delay-400">
            Vào Dashboard
          </Link>
        </div>
      </section>
      {/* About Section */}
      <section className="py-16 px-8 md:px-20 bg-[#f3e5d0] text-center">
        <h2 className="text-3xl font-bold mb-6">Giới thiệu</h2>
        <p className="max-w-2xl mx-auto text-[#5a3e2b]">
          Hotel Manager giúp bạn dễ dàng quản lý khách sạn, đặt phòng, thanh toán
          và theo dõi hoạt động kinh doanh chỉ trong một nền tảng duy nhất.
        </p>
      </section>
      
      {/* Gallery Section */}
      <section className="py-16 px-8 md:px-20 bg-[#f3e5d0]">
        <h2 className="text-3xl font-bold text-center mb-12">Hình ảnh minh họa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["gallery1.jpg","gallery2.jpg","gallery3.jpg"].map((img, idx) => (
            <img key={idx} src={`/images/${img}`} alt={`Hotel ${idx+1}`} className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"/>
          ))}
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 px-8 md:px-20 bg-gradient-to-r from-[#f3e5d0] to-[#d2b48c] text-center text-[#5a3e2b]">
        <h2 className="text-3xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
        <p className="mb-6">Tham gia ngay để quản lý khách sạn hiệu quả hơn.</p>
        <Link to="/register" className="px-8 py-3 bg-white rounded-lg shadow hover:bg-[#f3e5d0] transition font-semibold">
          Đăng ký ngay
        </Link>
      </section>
      {/* Navigation Buttons Section */}
      <section className="py-16 px-8 md:px-20 bg-[#f3e5d0] text-center">
        <h2 className="text-3xl font-bold mb-10 text-[#5a3e2b] animate-fadeInUp">Quản lý nhanh</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/rooms" className="px-6 py-3 bg-[#d2b48c] text-white rounded-full hover:bg-[#c9a978] transition-all duration-300 font-semibold shadow-md hover:shadow-lg animate-fadeInUp delay-200">
            <Bed className="inline mr-2" /> Rooms
          </Link>
          <Link to="/reports" className="px-6 py-3 bg-[#f3e5d0] text-[#5a3e2b] rounded-full hover:bg-[#e6d2aa] transition-all duration-300 font-semibold shadow-md hover:shadow-lg animate-fadeInUp delay-300">
            <FileText className="inline mr-2" /> Reports
          </Link>
          <Link to="/settings" className="px-6 py-3 bg-[#e6d2aa] text-[#5a3e2b] rounded-full hover:bg-[#d2b48c] transition-all duration-300 font-semibold shadow-md hover:shadow-lg animate-fadeInUp delay-400">
            <Settings className="inline mr-2" /> Settings
          </Link>
          <Link to="/staff" className="px-6 py-3 bg-[#d2b48c] text-white rounded-full hover:bg-[#c9a978] transition-all duration-300 font-semibold shadow-md hover:shadow-lg animate-fadeInUp delay-500">
            <Users className="inline mr-2" /> Staff
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-[#e6d2aa] text-[#5a3e2b] text-center">
        <p>© {new Date().getFullYear()} Hotel Manager. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fadeInUp.delay-200 { animation-delay: 0.2s; }
        .animate-fadeInUp.delay-300 { animation-delay: 0.3s; }
        .animate-fadeInUp.delay-400 { animation-delay: 0.4s; }
        .animate-fadeInUp.delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}