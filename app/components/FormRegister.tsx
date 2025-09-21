import { useState } from "react";
import { UserPlus } from "lucide-react";

export default function FormRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register info:", { name, email, password });
    // TODO: gọi API register ở đây
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-[#5a3e2b] mb-6 text-center animate-fadeInUp">
        Đăng ký
      </h2>

      <div className="mb-4">
        <label className="block text-[#5a3e2b] font-medium mb-2">Họ và tên</label>
        <input
          type="text"
          className="w-full p-3 border-2 border-[#c9a978] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2b48c] placeholder-[#5a3e2b]/50"
          placeholder="Nguyễn Văn A"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#5a3e2b] font-medium mb-2">Email</label>
        <input
          type="email"
          className="w-full p-3 border-2 border-[#c9a978] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2b48c] placeholder-[#5a3e2b]/50"
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
          className="w-full p-3 border-2 border-[#c9a978] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2b48c] placeholder-[#5a3e2b]/50"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center bg-gradient-to-r from-[#d2b48c] to-[#f3e5d0] text-[#5a3e2b] py-3 rounded-xl font-semibold shadow-lg hover:from-[#c9a978] hover:to-[#e6d2aa] transition-all duration-300 transform hover:scale-105"
      >
        <UserPlus className="mr-2 h-5 w-5" /> Đăng ký
      </button>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
    </form>
  );
}