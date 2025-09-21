import { useState } from "react";
import { BedDouble, PlusCircle, Trash2 } from "lucide-react";

export default function RoomPage() {
  const [rooms, setRooms] = useState<{ id: number; name: string; status: string }[]>([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Available");

  const addRoom = () => {
    if (!name.trim()) return;
    setRooms([...rooms, { id: Date.now(), name, status }]);
    setName("");
    setStatus("Available");
  };

  const deleteRoom = (id: number) => {
    setRooms(rooms.filter((r) => r.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Occupied":
        return "bg-red-100 text-red-700 border-red-300";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-green-100 text-green-700 border-green-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-[#f4ede4] text-[#4b2e1e] p-6 md:p-12 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10 animate-fadeInUp">
        <BedDouble className="h-10 w-10 text-[#b68d40]" />
        <h1 className="text-4xl font-extrabold tracking-tight">
          Quản lý Phòng
        </h1>
      </div>

      {/* Input & Add Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên phòng (VD: Phòng 101)"
          className="flex-1 border border-[#d3b98e] rounded-2xl px-5 py-3 bg-white/70 backdrop-blur-md
                     focus:outline-none focus:ring-2 focus:ring-[#caa968] placeholder-[#6e4b33]/50 shadow-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-[#d3b98e] rounded-2xl px-4 py-3 bg-white/70 backdrop-blur-md 
                     focus:outline-none focus:ring-2 focus:ring-[#caa968] shadow-sm"
        >
          <option value="Available">Trống</option>
          <option value="Occupied">Đã đặt</option>
          <option value="Maintenance">Bảo trì</option>
        </select>
        <button
          onClick={addRoom}
          className="flex items-center justify-center bg-gradient-to-r from-[#caa968] to-[#e4cfa3] 
                     text-[#4b2e1e] font-semibold px-6 py-3 rounded-2xl shadow-md hover:shadow-xl 
                     hover:from-[#b68d40] hover:to-[#d6b77a] transition-all duration-300 transform hover:scale-105"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Thêm Phòng
        </button>
      </div>

      {/* Room List */}
      {rooms.length === 0 ? (
        <p className="text-[#6e4b33]/70 text-lg text-center animate-fadeInUp delay-200">
          Chưa có phòng nào. Hãy thêm phòng mới!
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <li
              key={room.id}
              className={`rounded-3xl shadow-lg bg-white/90 backdrop-blur-md p-6 flex flex-col 
                          hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-semibold">{room.name}</span>
                <button
                  onClick={() => deleteRoom(room.id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <span
                className={`inline-block px-3 py-1 rounded-xl border text-sm font-medium ${getStatusColor(
                  room.status
                )}`}
              >
                {room.status === "Available"
                  ? "Trống"
                  : room.status === "Occupied"
                  ? "Đã đặt"
                  : "Bảo trì"}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fadeInUp.delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
