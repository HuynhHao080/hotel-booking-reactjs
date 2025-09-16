import { Link } from "react-router-dom";
import { LayoutDashboard, Building, Calendar, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-md z-50 shadow">
  <h1 className="text-2xl font-bold text-[#5a3e2b]">Hotel Manager</h1>
  <div className="flex gap-4">
    <Link
      to="/login"
      className="px-4 py-2 border border-[#5a3e2b] text-[#5a3e2b] rounded-lg hover:bg-[#f3e5d0] transition"
    >
      Đăng nhập
    </Link>
    <Link
      to="/register"
      className="px-4 py-2 bg-[#f3e5d0] text-[#5a3e2b] rounded-lg hover:bg-[#e6d2aa] transition"
    >
      Đăng ký
    </Link>
  </div>
</header>

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hotel-hero.jpg')",
        }}
      >
        {/* Overlay toàn màn hình mờ */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Box đen mờ giữa màn hình */}
        <div className="relative z-10 max-w-3xl px-8 py-12 bg-black/70 rounded-3xl shadow-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold animate-fadeIn">
            Hotel Manager System
          </h1>
          <p className="mt-4 text-lg md:text-xl animate-fadeIn delay-200">
            Nền tảng quản lý khách sạn toàn diện 🚀
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-block px-8 py-3 bg-gradient-to-r from-[#f3e5d0] to-[#d2b48c] rounded-lg shadow-lg hover:from-[#efd9b3] hover:to-[#c9a978] transition animate-fadeIn delay-400 text-black font-semibold"
          >
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

      {/* Features Section */}
      <section className="py-16 px-8 md:px-20 bg-[#e6d2aa]">
        <h2 className="text-3xl font-bold text-center mb-12">Chức năng chính</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard icon={<LayoutDashboard className="w-12 h-12 text-[#5a3e2b] mx-auto"/>} title="Dashboard" desc="Theo dõi tổng quan khách sạn."/>
          <FeatureCard icon={<Building className="w-12 h-12 text-[#5a3e2b] mx-auto"/>} title="Hotels" desc="Quản lý danh sách và thông tin khách sạn."/>
          <FeatureCard icon={<Calendar className="w-12 h-12 text-[#5a3e2b] mx-auto"/>} title="Booking" desc="Đặt phòng và quản lý lịch dễ dàng."/>
          <FeatureCard icon={<CreditCard className="w-12 h-12 text-[#5a3e2b] mx-auto"/>} title="Payments" desc="Thanh toán trực tuyến nhanh chóng."/>
        </div>
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

      {/* Footer */}
      <footer className="py-6 bg-[#e6d2aa] text-[#5a3e2b] text-center">
        <p>© {new Date().getFullYear()} Hotel Manager. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes fadeIn {from {opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);}}
        .animate-fadeIn {animation:fadeIn 1s forwards;}
        .animate-fadeIn.delay-200 {animation-delay:0.2s;}
        .animate-fadeIn.delay-400 {animation-delay:0.4s;}
      `}</style>
    </div>
  );
}

function FeatureCard({icon, title, desc}:{icon:React.ReactNode; title:string; desc:string}) {
  return (
    <div className="p-6 bg-[#f3e5d0] rounded-lg shadow hover:shadow-xl transition text-center">
      {icon}
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="mt-2">{desc}</p>
    </div>
  );
}
