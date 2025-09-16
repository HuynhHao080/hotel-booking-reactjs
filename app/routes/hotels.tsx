import { useState } from "react";

export default function Hotels() {
  const [hotels, setHotels] = useState<{ id: number; name: string }[]>([]);
  const [name, setName] = useState("");

  const addHotel = () => {
    if (!name.trim()) return;
    setHotels([...hotels, { id: Date.now(), name }]);
    setName("");
  };

  const deleteHotel = (id: number) => {
    setHotels(hotels.filter(h => h.id !== id));
  };

  return (
    <div className="p-6 bg-[#f3e5d0] min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-[#5a3e2b] mb-6">Quản lý Khách sạn</h1>

      {/* Input & Add Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên khách sạn"
          className="flex-1 border-2 border-[#c9a978] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d2b48c]"
        />
        <button
          onClick={addHotel}
          className="bg-gradient-to-r from-[#d2b48c] to-[#f3e5d0] text-[#5a3e2b] font-semibold px-6 py-2 rounded-xl shadow-lg hover:from-[#efd9b3] hover:to-[#e6d2aa] transition"
        >
          Thêm Khách sạn
        </button>
      </div>

      {/* Hotel List */}
      {hotels.length === 0 ? (
        <p className="text-[#5a3e2b]/70">Chưa có khách sạn nào. Thêm khách sạn mới!</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map(h => (
            <li
              key={h.id}
              className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center hover:shadow-xl transition"
            >
              <span className="text-[#5a3e2b] font-medium">{h.name}</span>
              <button
                onClick={() => deleteHotel(h.id)}
                className="text-red-600 font-semibold hover:text-red-800 transition"
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
