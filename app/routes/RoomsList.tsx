import React from "react";
import { Link } from "react-router-dom";

const rooms = [
  {
    id: 1,
    name: "Ocean View Suite",
    price: 250,
    image: "https://via.placeholder.com/400x300",
    description: "Phòng rộng rãi với tầm nhìn ra biển tuyệt đẹp.",
  },
  {
    id: 2,
    name: "Deluxe Room",
    price: 180,
    image: "https://via.placeholder.com/400x300",
    description: "Phòng tiện nghi, hiện đại, gần biển.",
  },
  {
    id: 3,
    name: "Standard Room",
    price: 120,
    image: "https://via.placeholder.com/400x300",
    description: "Phòng thoải mái với đầy đủ tiện nghi cơ bản.",
  },
];

const RoomsList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#5a3e2b]">
        Our Rooms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
              <p className="text-gray-600 mb-2">{room.description}</p>
              <p className="text-lg font-bold mb-4">{room.price} USD / đêm</p>
              <Link
                to="#"
                className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Đặt phòng
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
