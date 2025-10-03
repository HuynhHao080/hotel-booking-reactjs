import { useState } from "react";
import { 
  BedDouble, PlusCircle, Trash2, Search, Filter, Edit, Eye,
  Wifi, Car, Utensils, Dumbbell, Waves, Coffee, Users,
  Calendar, DollarSign, MapPin
} from "lucide-react";

interface Room {
  id: number;
  name: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  price: number;
  capacity: number;
  floor: number;
  amenities: string[];
  description: string;
  size: number; // in square meters
  lastCleaned: string;
  nextMaintenance: string;
}

export default function RoomPage() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      name: "Phòng Deluxe 101",
      type: "Deluxe",
      status: "available",
      price: 1500000,
      capacity: 2,
      floor: 1,
      amenities: ["wifi", "ac", "minibar", "balcony"],
      description: "Phòng Deluxe với view thành phố, đầy đủ tiện nghi",
      size: 35,
      lastCleaned: "2024-01-15",
      nextMaintenance: "2024-02-15"
    },
    {
      id: 2,
      name: "Suite Premium 201",
      type: "Suite",
      status: "occupied",
      price: 3500000,
      capacity: 4,
      floor: 2,
      amenities: ["wifi", "ac", "minibar", "balcony", "jacuzzi", "kitchen"],
      description: "Suite cao cấp với phòng khách riêng và bếp nhỏ",
      size: 65,
      lastCleaned: "2024-01-14",
      nextMaintenance: "2024-02-20"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Form states for adding/editing
  const [formData, setFormData] = useState<Partial<Room>>({
    name: "",
    type: "Standard",
    status: "available",
    price: 0,
    capacity: 2,
    floor: 1,
    amenities: [],
    description: "",
    size: 25
  });

  const roomTypes = ["Standard", "Deluxe", "Suite", "Executive", "Presidential"];
  const availableAmenities = [
    { key: "wifi", label: "WiFi", icon: Wifi },
    { key: "ac", label: "Điều hòa", icon: Car },
    { key: "minibar", label: "Minibar", icon: Coffee },
    { key: "balcony", label: "Ban công", icon: MapPin },
    { key: "jacuzzi", label: "Bồn tắm", icon: Waves },
    { key: "kitchen", label: "Bếp", icon: Utensils },
    { key: "gym", label: "Gym", icon: Dumbbell }
  ];

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || room.status === filterStatus;
    const matchesType = filterType === "all" || room.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700 border-green-300';
      case 'occupied': return 'bg-red-100 text-red-700 border-red-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'cleaning': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Trống';
      case 'occupied': return 'Đã đặt';
      case 'maintenance': return 'Bảo trì';
      case 'cleaning': return 'Đang dọn';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getAmenityIcon = (amenity: string) => {
    const amenityData = availableAmenities.find(a => a.key === amenity);
    return amenityData ? amenityData.icon : null;
  };

  const RoomDetailsModal = ({ room, onClose }: { room: Room; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#4b2e1e]">Chi tiết phòng</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Room Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#4b2e1e] mb-2">{room.name}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(room.status)}`}>
                    {getStatusText(room.status)}
                  </span>
                  <span className="text-sm text-gray-500">Tầng {room.floor}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Loại phòng</p>
                  <p className="font-medium">{room.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sức chứa</p>
                  <p className="font-medium">{room.capacity} người</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Diện tích</p>
                  <p className="font-medium">{room.size} m²</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Giá/đêm</p>
                  <p className="font-medium text-lg text-[#b68d40]">{formatCurrency(room.price)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Mô tả</p>
                <p className="text-gray-700">{room.description}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Tiện nghi</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map(amenity => {
                    const IconComponent = getAmenityIcon(amenity);
                    return (
                      <div key={amenity} className="flex items-center bg-[#f3e5d0] px-3 py-1 rounded-full text-sm">
                        {IconComponent && <IconComponent className="h-4 w-4 mr-1" />}
                        {availableAmenities.find(a => a.key === amenity)?.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Maintenance Info */}
            <div className="space-y-4">
              <div className="bg-[#f8f1e9] p-4 rounded-2xl">
                <h4 className="font-semibold text-[#4b2e1e] mb-3">Thông tin bảo trì</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lần dọn cuối:</span>
                    <span className="font-medium">{formatDate(room.lastCleaned)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bảo trì tiếp theo:</span>
                    <span className="font-medium">{formatDate(room.nextMaintenance)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#f3e5d0] p-4 rounded-2xl">
                <h4 className="font-semibold text-[#4b2e1e] mb-3">Thống kê</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tỷ lệ lấp đầy:</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doanh thu tháng:</span>
                    <span className="font-medium text-[#b68d40]">{formatCurrency(room.price * 25)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AddRoomModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#4b2e1e]">Thêm phòng mới</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên phòng</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
                placeholder="VD: Deluxe 101"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại phòng</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
              >
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giá/đêm (VNĐ)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sức chứa</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
                min="1"
                max="10"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tầng</label>
              <input
                type="number"
                value={formData.floor}
                onChange={(e) => setFormData({...formData, floor: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diện tích (m²)</label>
              <input
                type="number"
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tiện nghi</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableAmenities.map(amenity => {
                const IconComponent = amenity.icon;
                const isSelected = formData.amenities?.includes(amenity.key);
                return (
                  <button
                    key={amenity.key}
                    onClick={() => {
                      const currentAmenities = formData.amenities || [];
                      const newAmenities = isSelected
                        ? currentAmenities.filter(a => a !== amenity.key)
                        : [...currentAmenities, amenity.key];
                      setFormData({...formData, amenities: newAmenities});
                    }}
                    className={`flex items-center p-2 rounded-lg border transition-colors ${
                      isSelected 
                        ? 'bg-[#caa968] text-white border-[#caa968]' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {amenity.label}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={() => {
                // Add room logic here
                onClose();
              }}
              className="px-4 py-2 bg-[#caa968] text-white rounded-lg hover:bg-[#b68d40]"
            >
              Thêm phòng
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Statistics
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-[#f4ede4] text-[#4b2e1e] p-6 md:p-12 font-sans">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <BedDouble className="h-10 w-10 text-[#b68d40]" />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Quản lý Phòng</h1>
            <p className="text-lg text-gray-700 mt-1">
              Quản lý thông tin và trạng thái các phòng trong khách sạn
            </p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="flex gap-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4 text-center min-w-[120px]">
            <p className="text-2xl font-bold text-[#b68d40]">{totalRooms}</p>
            <p className="text-sm text-gray-600">Tổng phòng</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4 text-center min-w-[120px]">
            <p className="text-2xl font-bold text-green-600">{availableRooms}</p>
            <p className="text-sm text-gray-600">Trống</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4 text-center min-w-[120px]">
            <p className="text-2xl font-bold text-red-600">{occupiedRooms}</p>
            <p className="text-sm text-gray-600">Đã đặt</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#d3b98e] rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#caa968]"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-[#d3b98e] rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#caa968]"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="available">Trống</option>
            <option value="occupied">Đã đặt</option>
            <option value="maintenance">Bảo trì</option>
            <option value="cleaning">Đang dọn</option>
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border border-[#d3b98e] rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#caa968]"
          >
            <option value="all">Tất cả loại phòng</option>
            {roomTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-[#caa968] to-[#e4cfa3] text-[#4b2e1e] font-semibold rounded-2xl shadow-md hover:shadow-xl hover:from-[#b68d40] hover:to-[#d6b77a] transition-all duration-300"
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Thêm phòng
          </button>
        </div>
      </div>

      {/* Room List */}
      {filteredRooms.length === 0 ? (
        <div className="text-center py-12">
          <BedDouble className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Không tìm thấy phòng nào</p>
          <p className="text-gray-400">Hãy thêm phòng mới hoặc điều chỉnh bộ lọc</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room, i) => (
            <div
              key={room.id}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Room Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#f3e5d0] to-[#e6d2aa] flex items-center justify-center">
                  <BedDouble className="h-16 w-16 text-[#b68d40]" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                    {getStatusText(room.status)}
                  </span>
                </div>
              </div>

              {/* Room Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#4b2e1e] mb-1">{room.name}</h3>
                    <p className="text-sm text-gray-600">{room.type} • Tầng {room.floor}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setSelectedRoom(room);
                        setShowDetailsModal(true);
                      }}
                      className="p-2 rounded-full hover:bg-[#f3e5d0] transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-4 w-4 text-[#4b2e1e]" />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-[#f3e5d0] transition-colors"
                      title="Sửa"
                    >
                      <Edit className="h-4 w-4 text-[#4b2e1e]" />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-red-100 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sức chứa:</span>
                    <span className="font-medium">{room.capacity} người</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Diện tích:</span>
                    <span className="font-medium">{room.size} m²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Giá/đêm:</span>
                    <span className="font-medium text-[#b68d40]">{formatCurrency(room.price)}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map(amenity => {
                      const IconComponent = getAmenityIcon(amenity);
                      return (
                        <div key={amenity} className="flex items-center bg-[#f3e5d0] px-2 py-1 rounded-full text-xs">
                          {IconComponent && <IconComponent className="h-3 w-3 mr-1" />}
                          {availableAmenities.find(a => a.key === amenity)?.label}
                        </div>
                      );
                    })}
                    {room.amenities.length > 3 && (
                      <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                        +{room.amenities.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {showAddModal && <AddRoomModal onClose={() => setShowAddModal(false)} />}
      {showDetailsModal && selectedRoom && (
        <RoomDetailsModal 
          room={selectedRoom} 
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedRoom(null);
          }} 
        />
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}
