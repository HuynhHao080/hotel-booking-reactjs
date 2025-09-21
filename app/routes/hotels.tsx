import { useState } from "react";
import { Plus, Trash2, Hotel } from "lucide-react"; // Thêm icon Hotel

export default function Hotels() {
  const [hotels, setHotels] = useState<{ id: number; name: string }[]>([]);
  const [name, setName] = useState("");

  const addHotel = () => {
    if (!name.trim()) return;
    setHotels([...hotels, { id: Date.now(), name }]);
    setName("");
  };

  const deleteHotel = (id: number) => {
    setHotels(hotels.filter((h) => h.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-[#f4ede4] text-[#4b2e1e] p-6 md:p-12 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10 animate-fadeInUp">
        <Hotel className="h-10 w-10 text-[#b68d40]" />
        <h1 className="text-4xl font-extrabold tracking-tight">
          Quản lý Khách sạn
        </h1>
      </div>

      {/* Input & Add Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên khách sạn..."
          className="flex-1 border border-[#d3b98e] rounded-2xl px-5 py-3 bg-white/70 backdrop-blur-md 
                     focus:outline-none focus:ring-2 focus:ring-[#caa968] placeholder-[#6e4b33]/50 shadow-sm"
        />
        <button
          onClick={addHotel}
          className="flex items-center justify-center bg-gradient-to-r from-[#caa968] to-[#e4cfa3] 
                     text-[#4b2e1e] font-semibold px-6 py-3 rounded-2xl shadow-md hover:shadow-xl 
                     hover:from-[#b68d40] hover:to-[#d6b77a] transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="mr-2 h-5 w-5" /> Thêm Khách sạn
        </button>
      </div>

      {/* Hotel List */}
      {hotels.length === 0 ? (
        <p className="text-[#6e4b33]/70 text-lg text-center animate-fadeInUp delay-200">
          Chưa có khách sạn nào. Hãy thêm khách sạn mới!
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((h, i) => (
            <li
              key={h.id}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden 
                         hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Hotel Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`/images/hotel-${(h.id % 3) + 1}.jpg`}
                  alt={h.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Hotel Info */}
              <div className="p-5 flex justify-between items-center">
                <span className="text-lg font-semibold text-[#4b2e1e]">
                  {h.name}
                </span>
                <button
                  onClick={() => deleteHotel(h.id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
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
