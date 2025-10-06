import { useState } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🧠 Giả lập API login
    // Thực tế bạn sẽ gọi axios.post("/api/login", { email, password })
    const fakeUser = {
      name: "Nguyễn Văn A",
      email,
      avatar: "https://i.pravatar.cc/100?img=12", // avatar mẫu
    };

    // ✅ Lưu thông tin vào localStorage
    localStorage.setItem("user", JSON.stringify(fakeUser));
    localStorage.setItem("token", "fake_jwt_token");

    // 🧭 Điều hướng về trang chủ
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/hotel-hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-[#5a3e2b] mb-6 text-center animate-fadeInUp">
          Đăng nhập
        </h2>

        <div className="mb-4">
          <label className="block text-[#5a3e2b] font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 border-2 border-[#c9a978] rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-[#d2b48c] 
                       placeholder-[#5a3e2b]/50"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#5a3e2b] font-medium mb-2">Mật khẩu</label>
          <input
            type="password"
            className="w-full p-3 border-2 border-[#c9a978] rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-[#d2b48c] 
                       placeholder-[#5a3e2b]/50"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center 
                     bg-gradient-to-r from-[#d2b48c] to-[#f3e5d0] text-[#5a3e2b] 
                     py-3 rounded-xl font-semibold shadow-lg 
                     hover:from-[#c9a978] hover:to-[#e6d2aa] 
                     transition-all duration-300 transform hover:scale-105"
        >
          <LogIn className="mr-2 h-5 w-5" /> Đăng nhập
        </button>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        `}</style>
      </form>
    </div>
  );
}
