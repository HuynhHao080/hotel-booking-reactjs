import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bed, Users, Wifi, Car, Utensils, Dumbbell, 
  Star, Heart, ArrowLeft, ArrowRight 
} from 'lucide-react';

const CustomerRooms: React.FC = () => {
  const [selectedHotel, setSelectedHotel] = useState('all');
  const [roomType, setRoomType] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});

  const hotels = [
    { id: '1', name: 'Khách sạn Sài Gòn Center' },
    { id: '2', name: 'Khách sạn Hà Nội Old Quarter' },
    { id: '3', name: 'Khách sạn Đà Nẵng Beach Resort' },
  ];

  const rooms = [
    {
      id: '1',
      hotelId: '1',
      name: 'Phòng Deluxe City View',
      type: 'deluxe',
      size: 35,
      capacity: 2,
      price: 1500000,
      originalPrice: 1800000,
      images: ['/images/hotel-1.jpg', '/images/hotel-2.jpg', '/images/hotel-hero.jpg'],
      amenities: ['wifi', 'tv', 'minibar', 'balcony'],
      description: 'Phòng deluxe với tầm nhìn tuyệt đẹp ra thành phố, đầy đủ tiện nghi cao cấp.',
      rating: 4.8,
      reviewCount: 125
    },
    {
      id: '2',
      hotelId: '1',
      name: 'Phòng Executive Suite',
      type: 'suite',
      size: 60,
      capacity: 4,
      price: 3500000,
      originalPrice: 4000000,
      images: ['/images/hotel-2.jpg', '/images/hotel-hero.jpg', '/images/hotel-1.jpg'],
      amenities: ['wifi', 'tv', 'minibar', 'balcony', 'jacuzzi'],
      description: 'Suite hạng sang với phòng khách riêng biệt và bồn tắm jacuzzi.',
      rating: 4.9,
      reviewCount: 89
    },
    {
      id: '3',
      hotelId: '2',
      name: 'Phòng Standard Double',
      type: 'standard',
      size: 25,
      capacity: 2,
      price: 800000,
      images: ['/images/hotel-hero.jpg', '/images/hotel-1.jpg', '/images/hotel-2.jpg'],
      amenities: ['wifi', 'tv', 'air-conditioner'],
      description: 'Phòng standard thoải mái với giá cả hợp lý cho kỳ nghỉ ngắn ngày.',
      rating: 4.5,
      reviewCount: 234
    },
    {
      id: '4',
      hotelId: '2',
      name: 'Phòng Family Room',
      type: 'family',
      size: 45,
      capacity: 4,
      price: 1800000,
      images: ['/images/hotel-1.jpg', '/images/hotel-2.jpg', '/images/hotel-hero.jpg'],
      amenities: ['wifi', 'tv', 'minibar', 'sofa-bed'],
      description: 'Phòng gia đình rộng rãi với ghế sofa giường cho trẻ em.',
      rating: 4.7,
      reviewCount: 156
    },
    {
      id: '5',
      hotelId: '3',
      name: 'Phòng Ocean View Villa',
      type: 'villa',
      size: 80,
      capacity: 6,
      price: 5000000,
      originalPrice: 6000000,
      images: ['/images/hotel-hero.jpg', '/images/hotel-1.jpg', '/images/hotel-2.jpg'],
      amenities: ['wifi', 'pool', 'kitchen', 'balcony', 'beach-access'],
      description: 'Biệt thự riêng với hồ bơi và lối đi thẳng ra bãi biển.',
      rating: 4.9,
      reviewCount: 78
    },
    {
      id: '6',
      hotelId: '3',
      name: 'Phòng Beachfront Bungalow',
      type: 'bungalow',
      size: 40,
      capacity: 3,
      price: 2500000,
      images: ['/images/hotel-2.jpg', '/images/hotel-hero.jpg', '/images/hotel-1.jpg'],
      amenities: ['wifi', 'tv', 'balcony', 'beach-access'],
      description: 'Bungalow sát biển với ban công riêng nhìn ra đại dương.',
      rating: 4.8,
      reviewCount: 145
    }
  ];

  const filteredRooms = rooms.filter(room => {
    if (selectedHotel !== 'all' && room.hotelId !== selectedHotel) return false;
    if (roomType !== 'all' && room.type !== roomType) return false;
    return true;
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'tv': return <div className="w-4 h-4 bg-gray-400 rounded"></div>;
      case 'minibar': return <div className="w-4 h-4 bg-blue-400 rounded"></div>;
      case 'balcony': return <div className="w-4 h-4 bg-green-400 rounded"></div>;
      case 'jacuzzi': return <div className="w-4 h-4 bg-purple-400 rounded"></div>;
      case 'pool': return <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>;
      case 'kitchen': return <Utensils className="h-4 w-4" />;
      case 'beach-access': return <div className="w-4 h-4 bg-yellow-400 rounded"></div>;
      case 'sofa-bed': return <div className="w-4 h-4 bg-orange-400 rounded"></div>;
      case 'air-conditioner': return <div className="w-4 h-4 bg-indigo-400 rounded"></div>;
      default: return null;
    }
  };

  const nextImage = (roomId: string) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % 3
    }));
  };

  const prevImage = (roomId: string) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + 3) % 3
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Chọn phòng nghỉ dưỡng
          </h1>
          <p className="text-xl text-white mb-8">
            Tìm phòng phù hợp với nhu cầu và ngân sách của bạn
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Khách sạn
              </label>
              <select
                value={selectedHotel}
                onChange={(e) => setSelectedHotel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả khách sạn</option>
                {hotels.map(hotel => (
                  <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại phòng
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả loại phòng</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                <option value="family">Family</option>
                <option value="villa">Villa</option>
                <option value="bungalow">Bungalow</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedHotel('all');
                  setRoomType('all');
                }}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image Gallery */}
              <div className="relative h-48">
                <img
                  src={room.images[currentImageIndex[room.id] || 0]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                {room.images.length > 1 && (
                  <>
                    <button
                      onClick={() => prevImage(room.id)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => nextImage(room.id)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {room.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(prev => ({ ...prev, [room.id]: index }))}
                          className={`w-2 h-2 rounded-full ${
                            (currentImageIndex[room.id] || 0) === index ? 'bg-white' : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
                {room.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    Giảm giá
                  </div>
                )}
                <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>🏠 {room.size}m²</span>
                  <span>👥 Tối đa {room.capacity} người</span>
                </div>

                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-semibold">{room.rating}</span>
                  <span className="ml-1 text-gray-600">({room.reviewCount} đánh giá)</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 5).map((amenity) => (
                    <div key={amenity} className="flex items-center text-gray-600">
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                  {room.amenities.length > 5 && (
                    <span className="text-xs text-gray-500">+{room.amenities.length - 5} tiện ích</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-blue-600">
                        {room.price.toLocaleString()} VNĐ
                      </span>
                      <span className="text-sm text-gray-600 ml-1">/đêm</span>
                    </div>
                    {room.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        {room.originalPrice.toLocaleString()} VNĐ
                      </div>
                    )}
                  </div>
                  <Link
                    to={`/rooms/${room.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Đặt phòng
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Không tìm thấy phòng nào phù hợp.</p>
            <button
              onClick={() => {
                setSelectedHotel('all');
                setRoomType('all');
              }}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerRooms;
