import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUI } from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";
import LoadingAnimation from "../components/LoadingAnimation";
import OptimizedImage from "../components/OptimizedImage";
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  Heart,
  Share2,
  Filter,
  Search,
  ChevronDown,
  Award,
  Coffee,
  Bath,
  Tv,
  Wind,
  Camera,
  Palette,
  Zap,
  CheckCircle,
  X,
  Grid,
  List,
  SlidersHorizontal,
  RefreshCw,
  Download,
} from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  distance: string;
  amenities: string[];
  description: string;
  roomTypes: string[];
  badge?: string;
  sustainability?: boolean;
  freeCancellation?: boolean;
}

export default function HotelsNew() {
  const { isDark } = useUI();
  const { isAuthenticated, isAdmin } = useAuth();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);

  useEffect(() => {
    loadHotels();
  }, []);

  useEffect(() => {
    filterHotels();
  }, [hotels, searchTerm, sortBy, priceRange, selectedAmenities, ratingFilter]);

  const loadHotels = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockHotels: Hotel[] = [
        {
          id: "hotel-1",
          name: "Paradise Hotel & Spa",
          location: "Quận 1, TP.HCM",
          rating: 4.8,
          reviewCount: 2847,
          price: 1250000,
          originalPrice: 1500000,
          image: "/images/hotel-hero.jpg",
          images: ["/images/hotel-hero.jpg", "/images/gallery1.jpg", "/images/gallery2.jpg"],
          distance: "2.1 km từ trung tâm",
          amenities: ["WiFi miễn phí", "Hồ bơi", "Spa", "Gym", "Nhà hàng"],
          description: "Khách sạn 5 sao với dịch vụ cao cấp, vị trí đắc địa ngay trung tâm thành phố.",
          roomTypes: ["Standard", "Deluxe", "Suite"],
          badge: "Editor's Choice",
          sustainability: true,
          freeCancellation: true
        },
        {
          id: "hotel-2",
          name: "Grand Plaza Hotel",
          location: "Quận 3, TP.HCM",
          rating: 4.6,
          reviewCount: 1923,
          price: 890000,
          image: "/images/gallery1.jpg",
          images: ["/images/gallery1.jpg", "/images/gallery2.jpg", "/images/gallery3.jpg"],
          distance: "1.8 km từ trung tâm",
          amenities: ["WiFi miễn phí", "Gym", "Business Center"],
          description: "Khách sạn dành cho doanh nhân với phòng họp hiện đại và dịch vụ chuyên nghiệp.",
          roomTypes: ["Business", "Executive", "Suite"],
          sustainability: false,
          freeCancellation: true
        },
        {
          id: "hotel-3",
          name: "Sunset Beach Resort",
          location: "Quận 7, TP.HCM",
          rating: 4.7,
          reviewCount: 3156,
          price: 2100000,
          originalPrice: 2500000,
          image: "/images/gallery2.jpg",
          images: ["/images/gallery2.jpg", "/images/gallery3.jpg", "/images/hotel-1.jpg"],
          distance: "5.2 km từ trung tâm",
          amenities: ["Hồ bơi", "Bãi biển riêng", "Spa", "Nhà hàng"],
          description: "Resort nghỉ dưỡng với bãi biển riêng và không gian yên bình.",
          roomTypes: ["Garden View", "Sea View", "Villa"],
          badge: "Best for Families",
          sustainability: true,
          freeCancellation: false
        },
        {
          id: "hotel-4",
          name: "City Central Hotel",
          location: "Quận Bình Thạnh, TP.HCM",
          rating: 4.4,
          reviewCount: 1247,
          price: 650000,
          image: "/images/gallery3.jpg",
          images: ["/images/gallery3.jpg", "/images/hotel-1.jpg", "/images/hotel-2.jpg"],
          distance: "3.5 km từ trung tâm",
          amenities: ["WiFi miễn phí", "Ăn sáng miễn phí"],
          description: "Khách sạn tiện nghi với giá cả hợp lý, phù hợp cho mọi đối tượng khách hàng.",
          roomTypes: ["Economy", "Standard", "Superior"],
          sustainability: false,
          freeCancellation: true
        }
      ];
      setHotels(mockHotels);
    } catch (error) {
      console.error("Error loading hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterHotels = () => {
    let filtered = hotels;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(hotel =>
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(hotel => hotel.rating >= ratingFilter);
    }

    // Amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(hotel =>
        selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "distance":
        filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      default:
        // Keep original order for "recommended"
        break;
    }

    setFilteredHotels(filtered);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const availableAmenities = [
    "WiFi miễn phí",
    "Hồ bơi",
    "Gym",
    "Spa",
    "Nhà hàng",
    "Bar",
    "Phòng họp",
    "Đỗ xe"
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingAnimation size="lg" color="blue" text="Đang tải danh sách khách sạn..." />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header Section */}
      <div className={`py-8 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Tìm khách sạn hoàn hảo</h1>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Khám phá {hotels.length} khách sạn tuyệt vời tại Việt Nam
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className={`p-2 rounded-lg border transition-colors ${
                  isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                {viewMode === "grid" ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showFilters
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Bộ lọc
              </button>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Tìm kiếm khách sạn, địa điểm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="recommended">Đề xuất</option>
                <option value="price-low">Giá thấp nhất</option>
                <option value="price-high">Giá cao nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="distance">Gần trung tâm</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className={`w-80 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 h-fit`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Bộ lọc</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Khoảng giá</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Đánh giá</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={ratingFilter === rating}
                        onChange={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                        className="mr-2"
                      />
                      <div className="flex items-center mr-2">
                        {renderStars(rating)}
                      </div>
                      <span className="text-sm">trở lên</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Tiện ích</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableAmenities.map(amenity => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAmenities([...selectedAmenities, amenity]);
                          } else {
                            setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setPriceRange([0, 5000000]);
                  setRatingFilter(0);
                  setSelectedAmenities([]);
                }}
                className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}

          {/* Hotels Grid/List */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Hiển thị {filteredHotels.length} kết quả
              </p>
              {!showFilters && (
                <button
                  onClick={() => setShowFilters(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isDark
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </button>
              )}
            </div>

            {/* Hotels */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    {/* Badge */}
                    {hotel.badge && (
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                        {hotel.badge}
                      </div>
                    )}

                    {/* Sustainability Badge */}
                    {hotel.sustainability && (
                      <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs z-10">
                        🌱 Bền vững
                      </div>
                    )}

                    {/* Hotel Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                          isDark ? 'bg-gray-800/80 text-white hover:bg-gray-800' : 'bg-white/80 text-gray-700 hover:bg-white'
                        }`}>
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                          isDark ? 'bg-gray-800/80 text-white hover:bg-gray-800' : 'bg-white/80 text-gray-700 hover:bg-white'
                        }`}>
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Hotel Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {hotel.location} • {hotel.distance}
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {renderStars(hotel.rating)}
                          </div>
                          <span className="font-medium">{hotel.rating}</span>
                          <span className="text-sm text-gray-500">({hotel.reviewCount} đánh giá)</span>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {hotel.amenities.slice(0, 3).map((amenity, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 text-xs rounded-full ${
                              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {amenity}
                          </span>
                        ))}
                        {hotel.amenities.length > 3 && (
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            +{hotel.amenities.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          {hotel.originalPrice && (
                            <span className="text-sm text-gray-500 line-through mr-2">
                              {formatPrice(hotel.originalPrice)}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-blue-600">
                            {formatPrice(hotel.price)}
                          </span>
                          <span className="text-sm text-gray-500">/đêm</span>
                        </div>
                      </div>

                      {/* Free Cancellation */}
                      {hotel.freeCancellation && (
                        <div className="mt-2 text-sm text-green-600 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Hủy miễn phí
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                          Chọn phòng
                        </button>
                        <Link
                          to={`/hotels/${hotel.id}`}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
                        >
                          Chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className={`flex gap-6 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    {/* Hotel Image */}
                    <div className="w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Hotel Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {hotel.location} • {hotel.distance}
                          </div>
                        </div>
                        {hotel.badge && (
                          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                            {hotel.badge}
                          </span>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {renderStars(hotel.rating)}
                        </div>
                        <span className="font-medium">{hotel.rating}</span>
                        <span className="text-sm text-gray-500">({hotel.reviewCount} đánh giá)</span>
                      </div>

                      {/* Description */}
                      <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {hotel.description}
                      </p>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 text-sm rounded-full ${
                              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between">
                        <div>
                          {hotel.originalPrice && (
                            <span className="text-sm text-gray-500 line-through mr-2">
                              {formatPrice(hotel.originalPrice)}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-blue-600">
                            {formatPrice(hotel.price)}
                          </span>
                          <span className="text-sm text-gray-500">/đêm</span>
                          {hotel.freeCancellation && (
                            <div className="text-sm text-green-600 flex items-center mt-1">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Hủy miễn phí
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            Chọn phòng
                          </button>
                          <Link
                            to={`/hotels/${hotel.id}`}
                            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                          >
                            Chi tiết
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏨</div>
                <h3 className="text-xl font-medium mb-2">Không tìm thấy khách sạn nào</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Thử điều chỉnh bộ lọc hoặc tìm kiếm khác
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
