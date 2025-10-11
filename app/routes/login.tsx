import { useNavigate, Link } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Lấy thông tin từ form
      const formData = new FormData(e.target as HTMLFormElement);
      const email = (formData.get('email') as string) || '';
      const password = (formData.get('password') as string) || '';

      // Gọi auth context để đăng nhập
      const success = await login(email, password);

      if (success) {
        // Điều hướng dựa trên role
        navigate("/dashboard");
      } else {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hotel-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl rounded-xl p-8 transition-colors duration-300">
          <h1 className="text-2xl font-bold text-center text-[#5a3e2b] dark:text-white mb-6">
            Đăng nhập
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center p-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#5a3e2b] dark:text-white mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Nhập email của bạn"
                className="w-full p-3 border-2 border-[#c9a978] dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2b48c] dark:focus:ring-gray-500 placeholder-[#5a3e2b]/50 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-[#5a3e2b] dark:text-white transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5a3e2b] dark:text-white mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                className="w-full p-3 border-2 border-[#c9a978] dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2b48c] dark:focus:ring-gray-500 placeholder-[#5a3e2b]/50 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-[#5a3e2b] dark:text-white transition-colors duration-300"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-gradient-to-r from-[#d2b48c] to-[#f3e5d0] text-[#5a3e2b] py-3 rounded-xl shadow-lg hover:from-[#c9a978] hover:to-[#e6d2aa] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#5a3e2b] mr-2"></div>
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" /> Đăng nhập
                </>
              )}
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
    </div>
  );
}
