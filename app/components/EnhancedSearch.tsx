import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Users, Filter, X } from "lucide-react";
import { useUI } from "../contexts/UIContext";

interface SearchFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  priceRange: [number, number];
  amenities: string[];
  rating: number;
}

export default function EnhancedSearch() {
  const { isDark } = useUI();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState<SearchFilters>({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
    priceRange: [0, 10000000],
    amenities: [],
    rating: 0
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const popularDestinations = [
    "Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Nha Trang", "Phú Quốc", "Hội An"
  ];

  const amenities = [
    { id: "wifi", label: "WiFi miễn phí", icon: "📶" },
    { id: "pool", label: "Hồ bơi", icon: "🏊‍♀️" },
    { id: "parking", label: "Bãi đỗ xe", icon: "🅿️" },
    { id: "restaurant", label: "Nhà hàng", icon: "🍽️" },
    { id: "gym", label: "Phòng gym", icon: "💪" },
    { id: "spa", label: "Spa", icon: "🧘‍♀️" },
    { id: "pet", label: "Thú cưng", icon: "🐕" },
    { id: "breakfast", label: "Bữa sáng", icon: "🥐" }
  ];

  const handleSearch = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle search results
    }, 1000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`transition-colors duration-300 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    } rounded-2xl shadow-lg p-4 mb-6`}>
      {/* Main Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Destination */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Bạn muốn đi đâu?"
            value={filters.destination}
            onChange={(e) => setFilters({...filters, destination: e.target.value})}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          />
          {filters.destination && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
              {popularDestinations
                .filter(dest => dest.toLowerCase().includes(filters.destination.toLowerCase()))
                .map(dest => (
                  <button
                    key={dest}
                    onClick={() => setFilters({...filters, destination: dest})}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                  >
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {dest}
                  </button>
                ))
              }
            </div>
          )}
        </div>

        {/* Check-in Date */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="date"
            value={filters.checkIn}
            onChange={(e) => setFilters({...filters, checkIn: e.target.value})}
            className={`pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          />
        </div>

        {/* Check-out Date */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="date"
            value={filters.checkOut}
            onChange={(e) => setFilters({...filters, checkOut: e.target.value})}
            className={`pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          />
        </div>

        {/* Guests & Rooms */}
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-left ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            {filters.guests} khách, {filters.rooms} phòng
          </button>

          {/* Guest Selection Dropdown */}
          {isExpanded && (
            <div className={`absolute top-full left-0 right-0 mt-1 border rounded-xl shadow-lg z-10 ${
              isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Số phòng</label>
                  <select
                    value={filters.rooms}
                    onChange={(e) => setFilters({...filters, rooms: Number(e.target.value)})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                    }`}
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} phòng</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Số khách</label>
                  <select
                    value={filters.guests}
                    onChange={(e) => setFilters({...filters, guests: Number(e.target.value)})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                    }`}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} khách</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-w-[120px]"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Tìm kiếm
            </>
          )}
        </button>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mt-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={`w-full py-3 border rounded-xl flex items-center justify-center ${
            isDark ? 'border-gray-600 text-white' : 'border-gray-300'
          }`}
        >
          <Filter className="h-5 w-5 mr-2" />
          Bộ lọc nâng cao
        </button>
      </div>

      {/* Filters Panel */}
      <div className={`mt-4 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-2">Khoảng giá</label>
            <select
              value={`${filters.priceRange[0]}-${filters.priceRange[1]}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-').map(Number);
                setFilters({...filters, priceRange: [min, max]});
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="0-10000000">Tất cả giá</option>
              <option value="0-500000">Dưới 500k</option>
              <option value="500000-1000000">500k - 1tr</option>
              <option value="1000000-2000000">1tr - 2tr</option>
              <option value="2000000-5000000">2tr - 5tr</option>
              <option value="5000000-10000000">Trên 5tr</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">Đánh giá</label>
            <select
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: Number(e.target.value)})}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value={0}>Tất cả đánh giá</option>
              <option value={3}>Từ 3 sao</option>
              <option value={4}>Từ 4 sao</option>
              <option value={5}>5 sao</option>
            </select>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium mb-2">Tiện nghi</label>
            <div className="flex flex-wrap gap-1">
              {amenities.slice(0, 4).map(amenity => (
                <button
                  key={amenity.id}
                  onClick={() => {
                    const newAmenities = filters.amenities.includes(amenity.id)
                      ? filters.amenities.filter(a => a !== amenity.id)
                      : [...filters.amenities, amenity.id];
                    setFilters({...filters, amenities: newAmenities});
                  }}
                  className={`px-2 py-1 rounded-full text-xs ${
                    filters.amenities.includes(amenity.id)
                      ? 'bg-blue-500 text-white'
                      : isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {amenity.icon} {amenity.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}
