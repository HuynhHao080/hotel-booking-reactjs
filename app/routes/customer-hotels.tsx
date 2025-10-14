import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Heart, SlidersHorizontal } from 'lucide-react';

const CustomerHotels: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const hotels = [
    {
      id: '1',
      name: 'Khách sạn Sài Gòn Center',
      location: 'Quận 1, TP.HCM',
      rating: 4.8,
      reviewCount: 1250,
      price: 1500000,
      image: '/images/hotel-1.jpg',
      amenities: ['wifi', 'pool', 'gym'],
      description: 'Khách sạn hiện đại với vị trí đắc địa ngay trung tâm thành phố.'
    },
    {
      id: '2',
      name: 'Khách sạn Hà Nội Old Quarter',
      location: 'Hoàn Kiếm, Hà Nội',
      rating: 4.6,
      reviewCount: 890,
      price: 1200000,
      image: '/images/hotel-2.jpg',
      amenities: ['wifi', 'restaurant', 'parking'],
      description: 'Trải nghiệm văn hóa Hà Nội cổ kính với tiện nghi hiện đại.'
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
      amenities: ['wifi', 'pool', 'beach', 'spa'],
      description: 'Resort nghỉ dưỡng bên bãi biển với dịch vụ cao cấp.'
    },
    {
      id: '4',
      name: 'Khách sạn Nha Trang Ocean View',
      location: 'Nha Trang, Khánh Hòa',
      rating: 4.7,
      reviewCount: 1500,
      price: 1800000,
      image: '/images/hotel-1.jpg',
      amenities: ['wifi', 'pool', 'spa', 'restaurant'],
      description: 'Tầm nhìn tuyệt đẹp ra vịnh Nha Trang xinh đẹp.'
    },
    {
      id: '5',
      name: 'Khách sạn Hội An Riverside',
      location: 'Hội An, Quảng Nam',
      rating: 4.5,
      reviewCount: 750,
      price: 900000,
      image: '/images/hotel-2.jpg',
      amenities: ['wifi', 'restaurant', 'parking'],
      description: 'Nghỉ dưỡng bên sông Hoài thơ mộng của phố cổ Hội An.'
    },
    {
      id: '6',
      name: 'Khách sạn Phú Quốc Luxury',
      location: 'Phú Quốc, Kiên Giang',
      rating: 4.9,
      reviewCount: 1800,
      price: 3500000,
      originalPrice: 4000000,
      image: '/images/hotel-hero.jpg',
      amenities: ['wifi', 'pool', 'spa', 'beach', 'gym'],
      description: 'Khu nghỉ dưỡng cao cấp với bãi biển riêng tuyệt đẹp.'
    }
  ];

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Tìm khách sạn hoàn hảo
          </h1>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Nhập điểm đến..."
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="date"
                placeholder="Nhận phòng"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                placeholder="Trả phòng"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hotels List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {searchTerm ? `Kết quả tìm kiếm cho "${searchTerm}"` : 'Tất cả khách sạn'}
          </h2>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="popular">Phổ biến</option>
              <option value="price-low">Giá thấp đến cao</option>
              <option value="price-high">Giá cao đến thấp</option>
              <option value="rating">Đánh giá cao</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Bộ lọc</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khoảng giá
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Tất cả</option>
                  <option>Dưới 1 triệu</option>
                  <option>1 - 2 triệu</option>
                  <option>2 - 3 triệu</option>
                  <option>Trên 3 triệu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Tất cả</option>
                  <option>5 sao</option>
                  <option>4 sao trở lên</option>
                  <option>3 sao trở lên</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiện ích
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Tất cả</option>
                  <option>Có hồ bơi</option>
                  <option>Có gym</option>
                  <option>Có spa</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
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
                <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{hotel.location}</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-semibold">{hotel.rating}</span>
                  <span className="ml-1 text-gray-600">({hotel.reviewCount} đánh giá)</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>

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
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Không tìm thấy khách sạn nào phù hợp.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Xóa bộ lọc tìm kiếm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerHotels;
