import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, MapPin, Calendar, Users, Star, 
  Wifi, Car, Utensils, Dumbbell, Heart 
} from 'lucide-react';

const CustomerHome: React.FC = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  const featuredHotels = [
    {
      id: '1',
      name: 'Khách sạn Sài Gòn Center',
      location: 'Quận 1, TP.HCM',
      rating: 4.8,
      reviewCount: 1250,
      price: 1500000,
      originalPrice: 1800000,
      image: '/images/hotel-1.jpg',
      amenities: ['wifi', 'pool', 'gym', 'spa']
    },
    {
      id: '2',
      name: 'Khách sạn Hà Nội Old Quarter',
      location: 'Hoàn Kiếm, Hà Nội',
      rating: 4.6,
      reviewCount: 890,
      price: 1200000,
      image: '/images/hotel-2.jpg',
      amenities: ['wifi', 'restaurant', 'parking']
    },
    {
      id: '3',
      name: 'Khách sạn Đà Nẵng Beach Resort',
      location: 'Ngũ Hành Sơn, Đà Nẵng',
      rating: 4.9,
      reviewCount: 2100,
      price: 2000000,
      originalPrice: 2500000,
      image: '/images/hotel-hero.jpg',
      amenities: ['wifi', 'pool', 'beach', 'spa']
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'pool': return <div className="w-4 h-4 bg-blue-400 rounded-full"></div>;
      case 'gym': return <Dumbbell className="h-4 w-4" />;
      case 'spa': return <div className="w-4 h-4 bg-green-400 rounded-full"></div>;
      case 'restaurant': return <Utensils className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hotel-hero.jpg)' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Tìm khách sạn
            <span className="block text-yellow-400">hoàn hảo</span>
          </h1>
          <p className="text-xl mb-8">
            Khám phá những khách sạn tốt nhất với giá ưu đãi
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Điểm đến
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Nhập điểm đến..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchData.destination}
                    onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nhận phòng
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchData.checkIn}
                    onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trả phòng
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchData.checkOut}
                    onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khách
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchData.guests}
                    onChange={(e) => setSearchData({...searchData, guests: parseInt(e.target.value)})}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} khách</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Tìm kiếm khách sạn</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Khách sạn nổi bật
            </h2>
            <p className="text-lg text-gray-600">
              Những lựa chọn tốt nhất dành cho kỳ nghỉ của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  {hotel.originalPrice && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      Giảm giá
                    </div>
                  )}
                  <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold">{hotel.rating}</span>
                      <span className="ml-1 text-gray-600">({hotel.reviewCount})</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <div key={amenity} className="flex items-center text-gray-600">
                        {getAmenityIcon(amenity)}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-blue-600">
                          {hotel.price.toLocaleString()} VNĐ
                        </span>
                        <span className="text-sm text-gray-600 ml-1">/đêm</span>
                      </div>
                      {hotel.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {hotel.originalPrice.toLocaleString()} VNĐ
                        </div>
                      )}
                    </div>
                    <Link
                      to={`/hotels/${hotel.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Đặt ngay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/hotels"
              className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center space-x-2"
            >
              <span>Xem tất cả khách sạn</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tìm kiếm dễ dàng</h3>
              <p className="text-gray-600">Tìm khách sạn phù hợp với nhu cầu của bạn</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Đánh giá chân thực</h3>
              <p className="text-gray-600">Xem đánh giá từ khách hàng đã trải nghiệm</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ưu đãi đặc biệt</h3>
              <p className="text-gray-600">Nhận những ưu đãi tốt nhất cho kỳ nghỉ</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerHome;
