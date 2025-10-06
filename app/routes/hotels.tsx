import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus, Trash2, Hotel, Search, Filter, Edit, Eye, MapPin,
  Star, Wifi, Car, Utensils, Waves, Phone, Mail, Calendar,
  Users, Bed, DollarSign, Navigation, Camera, Coffee
} from "lucide-react";

interface Hotel {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  rating: number;
  totalRooms: number;
  availableRooms: number;
  priceRange: {
    min: number;
    max: number;
  };
  amenities: string[];
  images: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  checkInTime: string;
  checkOutTime: string;
  policies: string[];
  status: 'active' | 'inactive' | 'maintenance';
}

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: 1,
      name: "Khách sạn Grand Plaza",
      description: "Khách sạn 5 sao sang trọng tại trung tâm thành phố với dịch vụ đẳng cấp quốc tế",
      address: "123 Nguyễn Huệ",
      city: "Hồ Chí Minh",
      country: "Việt Nam",
      rating: 4.8,
      totalRooms: 150,
      availableRooms: 45,
      priceRange: { min: 2000000, max: 8000000 },
      amenities: ["wifi", "pool", "gym", "spa", "restaurant", "parking", "concierge"],
      images: ["/images/hotel-1.jpg", "/images/hotel-2.jpg", "/images/hotel-3.jpg"],
      contact: {
        phone: "028 3822 4866",
        email: "info@grandplaza.com",
        website: "www.grandplaza.com"
      },
      checkInTime: "14:00",
      checkOutTime: "12:00",
      policies: ["Không hút thuốc", "Thú cưng được cho phép", "Hủy miễn phí trước 24h"],
      status: "active"
    },
    {
      id: 2,
      name: "Boutique Hotel Sài Gòn",
      description: "Khách sạn boutique với thiết kế độc đáo và dịch vụ cá nhân hóa",
      address: "456 Lê Lợi",
      city: "Hồ Chí Minh",
      country: "Việt Nam",
      rating: 4.6,
      totalRooms: 80,
      availableRooms: 25,
      priceRange: { min: 1500000, max: 5000000 },
      amenities: ["wifi", "restaurant", "bar", "rooftop", "concierge"],
      images: ["/images/hotel-2.jpg", "/images/hotel-3.jpg"],
      contact: {
        phone: "028 3827 2828",
        email: "reservations@boutiquehotel.com",
        website: "www.boutiquehotel.com"
      },
      checkInTime: "15:00",
      checkOutTime: "11:00",
      policies: ["Không hút thuốc", "Không thú cưng", "Hủy miễn phí trước 48h"],
      status: "active"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCity, setFilterCity] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Form states for adding/editing
  const [formData, setFormData] = useState<Partial<Hotel>>({
    name: "",
    description: "",
    address: "",
    city: "",
    country: "Việt Nam",
    rating: 5,
    totalRooms: 0,
    availableRooms: 0,
    priceRange: { min: 0, max: 0 },
    amenities: [],
    contact: { phone: "", email: "", website: "" },
    checkInTime: "14:00",
    checkOutTime: "12:00",
    policies: [],
    status: "active"
  });

  const availableAmenities = [
    { key: "wifi", label: "WiFi miễn phí", icon: Wifi },
    { key: "pool", label: "Hồ bơi", icon: Waves },
    { key: "gym", label: "Phòng gym", icon: Users },
    { key: "spa", label: "Spa", icon: Waves },
    { key: "restaurant", label: "Nhà hàng", icon: Utensils },
    { key: "parking", label: "Bãi đỗ xe", icon: Car },
    { key: "concierge", label: "Lễ tân 24/7", icon: Users },
    { key: "bar", label: "Quầy bar", icon: Coffee },
    { key: "rooftop", label: "Rooftop", icon: Camera }
  ];

  const cities = [...new Set(hotels.map(h => h.city))];

  // Filter hotels
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || hotel.status === filterStatus;
    const matchesCity = filterCity === "all" || hotel.city === filterCity;
    
    return matchesSearch && matchesStatus && matchesCity;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-300';
      case 'inactive': return 'bg-red-100 text-red-700 border-red-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang hoạt động';
      case 'inactive': return 'Tạm ngưng';
      case 'maintenance': return 'Bảo trì';
      default: return status;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const amenityData = availableAmenities.find(a => a.key === amenity);
    return amenityData ? amenityData.icon : null;
  };

  const HotelDetailsModal = ({ hotel, onClose }: { hotel: Hotel; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#4b2e1e]">Chi tiết khách sạn</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative h-64 bg-gradient-to-br from-[#f3e5d0] to-[#e6d2aa] rounded-2xl overflow-hidden">
                <img 
                  src={hotel.images[0] || "/images/hotel-placeholder.jpg"} 
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hotel-placeholder.jpg";
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(hotel.status)}`}>
                    {getStatusText(hotel.status)}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-gradient-to-br from-[#f3e5d0] to-[#e6d2aa] rounded-2xl overflow-hidden">
                <img 
                  src={hotel.images[1] || "/images/hotel-placeholder.jpg"} 
                  alt={`${hotel.name} - 2`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hotel-placeholder.jpg";
                  }}
                />
              </div>
              <div className="h-32 bg-gradient-to-br from-[#f3e5d0] to-[#e6d2aa] rounded-2xl overflow-hidden">
                <img 
                  src={hotel.images[2] || "/images/hotel-placeholder.jpg"} 
                  alt={`${hotel.name} - 3`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hotel-placeholder.jpg";
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hotel Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-[#4b2e1e]">{hotel.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{hotel.description}</p>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#f8f1e9] p-4 rounded-2xl">
                  <Bed className="h-6 w-6 text-[#b68d40] mb-2" />
                  <p className="text-sm text-gray-600">Tổng phòng</p>
                  <p className="font-bold text-lg">{hotel.totalRooms}</p>
                </div>
                <div className="bg-[#f3e5d0] p-4 rounded-2xl">
                  <Users className="h-6 w-6 text-[#b68d40] mb-2" />
                  <p className="text-sm text-gray-600">Còn trống</p>
                  <p className="font-bold text-lg text-green-600">{hotel.availableRooms}</p>
                </div>
                <div className="bg-[#e6d2aa] p-4 rounded-2xl">
                  <DollarSign className="h-6 w-6 text-[#b68d40] mb-2" />
                  <p className="text-sm text-gray-600">Giá từ</p>
                  <p className="font-bold text-lg">{formatCurrency(hotel.priceRange.min)}</p>
                </div>
                <div className="bg-[#d2b48c] p-4 rounded-2xl">
                  <Calendar className="h-6 w-6 text-white mb-2" />
                  <p className="text-sm text-white/80">Check-in</p>
                  <p className="font-bold text-lg text-white">{hotel.checkInTime}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#4b2e1e] mb-3">Tiện nghi</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hotel.amenities.map(amenity => {
                    const IconComponent = getAmenityIcon(amenity);
                    return (
                      <div key={amenity} className="flex items-center bg-[#f3e5d0] px-3 py-2 rounded-full text-sm">
                        {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
                        {availableAmenities.find(a => a.key === amenity)?.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#4b2e1e] mb-3">Chính sách</h4>
                <div className="space-y-2">
                  {hotel.policies.map((policy, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-[#b68d40] rounded-full mr-3"></span>
                      {policy}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact & Booking Info */}
            <div className="space-y-6">
              <div className="bg-[#f8f1e9] p-6 rounded-3xl">
                <h4 className="font-semibold text-[#4b2e1e] mb-4">Thông tin liên hệ</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-[#b68d40] mr-3" />
                    <span className="text-sm">{hotel.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-[#b68d40] mr-3" />
                    <span className="text-sm">{hotel.contact.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Navigation className="h-5 w-5 text-[#b68d40] mr-3" />
                    <span className="text-sm">{hotel.contact.website}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#f3e5d0] p-6 rounded-3xl">
                <h4 className="font-semibold text-[#4b2e1e] mb-4">Thời gian</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Check-in</p>
                    <p className="font-semibold">{hotel.checkInTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Check-out</p>
                    <p className="font-semibold">{hotel.checkOutTime}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#e6d2aa] p-6 rounded-3xl">
                <h4 className="font-semibold text-[#4b2e1e] mb-4">Giá phòng</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Từ:</span>
                    <span className="font-medium">{formatCurrency(hotel.priceRange.min)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Đến:</span>
                    <span className="font-medium">{formatCurrency(hotel.priceRange.max)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Trung bình:</span>
                    <span className="font-medium text-[#b68d40]">
                      {formatCurrency((hotel.priceRange.min + hotel.priceRange.max) / 2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AddHotelModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#4b2e1e]">Thêm khách sạn mới</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên khách sạn</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
                placeholder="Nhập tên khách sạn"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
              >
                {[1, 2, 3, 4, 5].map(rating => (
                  <option key={rating} value={rating}>{rating} ⭐</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
              rows={3}
              placeholder="Mô tả về khách sạn"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
                placeholder="Số nhà, đường"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thành phố</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
                placeholder="Thành phố"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quốc gia</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caa968]"
                placeholder="Quốc gia"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={() => {
                // Add hotel logic here
                onClose();
              }}
              className="px-4 py-2 bg-[#caa968] text-white rounded-lg hover:bg-[#b68d40]"
            >
              Thêm khách sạn
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Statistics
  const totalHotels = hotels.length;
  const activeHotels = hotels.filter(h => h.status === 'active').length;
  const totalRooms = hotels.reduce((sum, h) => sum + h.totalRooms, 0);
  const availableRooms = hotels.reduce((sum, h) => sum + h.availableRooms, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-[#f4ede4] text-[#4b2e1e] p-6 md:p-12 font-sans">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Hotel className="h-10 w-10 text-[#b68d40]" />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Quản lý Khách sạn</h1>
            <p className="text-lg text-gray-700 mt-1">
              Quản lý thông tin và hoạt động của các khách sạn trong hệ thống
            </p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="flex gap-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4 text-center min-w-[120px]">
            <p className="text-2xl font-bold text-[#b68d40]">{totalHotels}</p>
            <p className="text-sm text-gray-600">Tổng khách sạn</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4 text-center min-w-[120px]">
            <p className="text-2xl font-bold text-green-600">{activeHotels}</p>
            <p className="text-sm text-gray-600">Đang hoạt động</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4 text-center min-w-[120px]">
            <p className="text-2xl font-bold text-blue-600">{totalRooms}</p>
            <p className="text-sm text-gray-600">Tổng phòng</p>
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
              placeholder="Tìm kiếm khách sạn..."
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
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Tạm ngưng</option>
            <option value="maintenance">Bảo trì</option>
          </select>
          
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="px-4 py-3 border border-[#d3b98e] rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#caa968]"
          >
            <option value="all">Tất cả thành phố</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-[#caa968] to-[#e4cfa3] text-[#4b2e1e] font-semibold rounded-2xl shadow-md hover:shadow-xl hover:from-[#b68d40] hover:to-[#d6b77a] transition-all duration-300"
            >
              <Plus className="mr-2 h-5 w-5" /> Thêm khách sạn
            </button>
            <Link
              to="/booking"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl shadow-md hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            >
              🏨 Đặt phòng ngay
            </Link>
          </div>
        </div>
      </div>

      {/* Hotel List */}
      {filteredHotels.length === 0 ? (
        <div className="text-center py-12">
          <Hotel className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Không tìm thấy khách sạn nào</p>
          <p className="text-gray-400">Hãy thêm khách sạn mới hoặc điều chỉnh bộ lọc</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel, i) => (
            <div
              key={hotel.id}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Hotel Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.images[0] || "/images/hotel-placeholder.jpg"}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hotel-placeholder.jpg";
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hotel.status)}`}>
                    {getStatusText(hotel.status)}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="flex items-center bg-white/90 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
              </div>

              {/* Hotel Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#4b2e1e] mb-1">{hotel.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{hotel.city}, {hotel.country}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{hotel.description}</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => {
                        setSelectedHotel(hotel);
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

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phòng:</span>
                    <span className="font-medium">{hotel.availableRooms}/{hotel.totalRooms} trống</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Giá từ:</span>
                    <span className="font-medium text-[#b68d40]">{formatCurrency(hotel.priceRange.min)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">{hotel.checkInTime}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {hotel.amenities.slice(0, 4).map(amenity => {
                      const IconComponent = getAmenityIcon(amenity);
                      return (
                        <div key={amenity} className="flex items-center bg-[#f3e5d0] px-2 py-1 rounded-full text-xs">
                          {IconComponent && <IconComponent className="h-3 w-3 mr-1" />}
                          {availableAmenities.find(a => a.key === amenity)?.label}
                        </div>
                      );
                    })}
                    {hotel.amenities.length > 4 && (
                      <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                        +{hotel.amenities.length - 4}
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
      {showAddModal && <AddHotelModal onClose={() => setShowAddModal(false)} />}
      {showDetailsModal && selectedHotel && (
        <HotelDetailsModal 
          hotel={selectedHotel} 
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedHotel(null);
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
