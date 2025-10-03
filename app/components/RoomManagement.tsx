import { useState, useEffect } from "react";
import { useUI } from "../contexts/UIContext";
import { BookingService, type Room, type Booking } from "../services/bookingService";
import {
  Bed,
  Users,
  Wifi,
  Tv,
  Bath,
  Wind,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  Search,
  Filter,
} from "lucide-react";

interface RoomManagementProps {
  onRoomSelect?: (room: Room) => void;
}

export default function RoomManagement({ onRoomSelect }: RoomManagementProps) {
  const { isDark } = useUI();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "available" | "occupied">("all");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for new room
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "standard",
    price: 0,
    size: "",
    beds: "",
    amenities: [] as string[],
    maxGuests: 2,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Load mock data - in real app, this would be API calls
      const mockRooms: Room[] = [
        {
          id: "room-001",
          type: "standard",
          name: "Phòng Standard 101",
          price: 500000,
          size: "25m²",
          beds: "1 giường đôi",
          amenities: ["WiFi miễn phí", "TV 42 inch", "Minibar"],
          images: ["/images/gallery1.jpg"],
          available: true,
          maxGuests: 2
        },
        {
          id: "room-002",
          type: "deluxe",
          name: "Phòng Deluxe 201",
          price: 800000,
          size: "35m²",
          beds: "1 giường king",
          amenities: ["WiFi miễn phí", "TV 50 inch", "Ban công", "Bồn tắm"],
          images: ["/images/gallery2.jpg"],
          available: false,
          maxGuests: 2
        },
        {
          id: "room-003",
          type: "suite",
          name: "Suite Executive 301",
          price: 1500000,
          size: "50m²",
          beds: "1 giường king + sofa",
          amenities: ["WiFi miễn phí", "TV 55 inch", "Phòng khách", "Bồn tắm + vòi sen"],
          images: ["/images/gallery3.jpg"],
          available: true,
          maxGuests: 4
        }
      ];

      const mockBookings: Booking[] = [
        {
          id: "booking-001",
          roomId: "room-002",
          customerName: "Nguyễn Văn A",
          checkInDate: "2024-01-15",
          checkOutDate: "2024-01-17",
          guests: 2,
          totalAmount: 1600000,
          status: "checked-in",
          createdAt: "2024-01-10T10:00:00Z"
        }
      ];

      setRooms(mockRooms);
      setBookings(mockBookings);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" ||
                         (filterStatus === "available" && room.available) ||
                         (filterStatus === "occupied" && !room.available);
    return matchesSearch && matchesFilter;
  });

  const getRoomStatus = (room: Room) => {
    const hasBooking = bookings.some(booking =>
      booking.roomId === room.id &&
      (booking.status === "confirmed" || booking.status === "checked-in")
    );

    if (hasBooking) {
      const booking = bookings.find(b => b.roomId === room.id);
      return {
        status: "occupied" as const,
        booking: booking,
        available: false
      };
    }

    return {
      status: "available" as const,
      booking: null,
      available: true
    };
  };

  const handleAddRoom = async () => {
    try {
      // TODO: Implement API call to add room
      const roomToAdd: Room = {
        id: `room-${Date.now()}`,
        type: newRoom.type,
        name: newRoom.name,
        price: newRoom.price,
        size: newRoom.size,
        beds: newRoom.beds,
        amenities: newRoom.amenities,
        images: ["/images/gallery1.jpg"], // Default image
        available: true,
        maxGuests: newRoom.maxGuests
      };

      setRooms(prev => [...prev, roomToAdd]);
      setShowAddModal(false);
      setNewRoom({
        name: "",
        type: "standard",
        price: 0,
        size: "",
        beds: "",
        amenities: [],
        maxGuests: 2,
      });
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes("WiFi")) return <Wifi className="h-4 w-4" />;
    if (amenity.includes("TV")) return <Tv className="h-4 w-4" />;
    if (amenity.includes("Bồn tắm") || amenity.includes("tắm")) return <Bath className="h-4 w-4" />;
    if (amenity.includes("Ban công")) return <Wind className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <div className={`p-6 border-b transition-colors duration-300 ${
        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🏨 Quản lý Phòng</h1>
            <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Quản lý danh sách phòng và trạng thái đặt phòng
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm phòng mới
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className={`p-4 rounded-lg mb-6 transition-colors duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm phòng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              >
                <option value="all">Tất cả phòng</option>
                <option value="available">Phòng trống</option>
                <option value="occupied">Phòng đã đặt</option>
              </select>
            </div>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => {
            const roomStatus = getRoomStatus(room);
            return (
              <div
                key={room.id}
                className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
                onClick={() => {
                  setSelectedRoom(room);
                  onRoomSelect?.(room);
                }}
              >
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold z-10 ${
                  roomStatus.available
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {roomStatus.available ? 'Trống' : 'Đã đặt'}
                </div>

                {/* Room Image */}
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${room.images[0] || '/images/gallery1.jpg'}')` }}
                >
                  {!roomStatus.available && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                      <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        Đã được đặt
                      </div>
                    </div>
                  )}
                </div>

                {/* Room Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(room.price)}/đêm
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {room.size}
                    </span>
                  </div>

                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {room.beds} • Tối đa {room.maxGuests} khách
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        {getAmenityIcon(amenity)}
                        <span className="ml-1">{amenity}</span>
                      </div>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="text-sm text-gray-500">
                        +{room.amenities.length - 3} tiện ích khác
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-300 flex items-center justify-center">
                      <Edit className="h-4 w-4 mr-2" />
                      Chỉnh sửa
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <Bed className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Không tìm thấy phòng nào</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Thử thay đổi bộ lọc hoặc tìm kiếm khác
            </p>
          </div>
        )}
      </div>

      {/* Add Room Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`max-w-md w-full mx-4 rounded-xl shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Thêm phòng mới</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tên phòng</label>
                  <input
                    type="text"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder="VD: Phòng Deluxe 201"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Loại phòng</label>
                    <select
                      value={newRoom.type}
                      onChange={(e) => setNewRoom(prev => ({ ...prev, type: e.target.value }))}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    >
                      <option value="standard">Standard</option>
                      <option value="deluxe">Deluxe</option>
                      <option value="suite">Suite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Giá/đêm</label>
                    <input
                      type="number"
                      value={newRoom.price}
                      onChange={(e) => setNewRoom(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                      placeholder="500000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Diện tích</label>
                    <input
                      type="text"
                      value={newRoom.size}
                      onChange={(e) => setNewRoom(prev => ({ ...prev, size: e.target.value }))}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                      placeholder="25m²"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Số khách tối đa</label>
                    <input
                      type="number"
                      value={newRoom.maxGuests}
                      onChange={(e) => setNewRoom(prev => ({ ...prev, maxGuests: Number(e.target.value) }))}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                      min="1"
                      max="6"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Giường ngủ</label>
                  <input
                    type="text"
                    value={newRoom.beds}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, beds: e.target.value }))}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder="1 giường đôi"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddRoom}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                >
                  Thêm phòng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
