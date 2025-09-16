import { useState } from "react";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login info:", { email, password });
    // TODO: gọi API login ở đây
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Đăng nhập
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
        <input
          type="password"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Đăng nhập
      </button>
    </form>
  );
}
