import { useNavigate, Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: đăng ký xong thì cũng cho vào Dashboard luôn
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#f8f1e9] to-[#fff]">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-[#5a3e2b] mb-6">Đăng ký</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#5a3e2b] mb-1">Tên</label>
            <input
              type="text"
              placeholder="Nhập tên của bạn"
              className="w-full p-3 border-2 border-[#c9a978] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2b48c] placeholder-[#5a3e2b]/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5a3e2b] mb-1">Email</label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full p-3 border-2 border-[#c9a978] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2b48c] placeholder-[#5a3e2b]/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5a3e2b] mb-1">Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full p-3 border-2 border-[#c9a978] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2b48c] placeholder-[#5a3e2b]/50"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-gradient-to-r from-[#d2b48c] to-[#f3e5d0] text-[#5a3e2b] py-3 rounded-xl shadow-lg hover:from-[#c9a978] hover:to-[#e6d2aa] transition-all duration-300 transform hover:scale-105"
          >
            <UserPlus className="mr-2 h-5 w-5" /> Đăng ký
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#5a3e2b]">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-[#d2b48c] hover:underline font-medium">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}