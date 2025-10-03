import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: không cần check tài khoản, cứ đăng nhập là vào dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#f8f1e9] to-[#fff] dark:from-gray-900 dark:to-gray-800 pt-20 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md transition-colors duration-300">
        <h1 className="text-2xl font-bold text-center text-[#5a3e2b] dark:text-white mb-6">
          Đăng nhập
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#5a3e2b] dark:text-white mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full p-3 border-2 border-[#c9a978] dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2b48c] dark:focus:ring-gray-500 placeholder-[#5a3e2b]/50 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-[#5a3e2b] dark:text-white transition-colors duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5a3e2b] dark:text-white mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full p-3 border-2 border-[#c9a978] dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2b48c] dark:focus:ring-gray-500 placeholder-[#5a3e2b]/50 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-[#5a3e2b] dark:text-white transition-colors duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-gradient-to-r from-[#d2b48c] to-[#f3e5d0] text-[#5a3e2b] py-3 rounded-xl shadow-lg hover:from-[#c9a978] hover:to-[#e6d2aa] transition-all duration-300 transform hover:scale-105"
          >
            <LogIn className="mr-2 h-5 w-5" /> Đăng nhập
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#5a3e2b] dark:text-gray-300">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-[#d2b48c] hover:underline font-medium"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
