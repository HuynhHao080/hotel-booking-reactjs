import { useState } from "react";
import { Heart, Share2, Star, Wifi, Car, Utensils, Waves, MapPin, Eye } from "lucide-react";
import { useUI } from "../contexts/UIContext";

interface HotelCardProps {
  hotel: {
    id: number;
    name: string;
    rating: number;
    reviewCount: number;
    location: string;
    distance?: string;
    images: string[];
    price: number;
    originalPrice?: number;
    deal?: string;
    amenities: string[];
    description: string;
    isFavorite?: boolean;
  };
  onViewDetails: (hotel: any) => void;
}

export default function EnhancedHotelCard({ hotel, onViewDetails }: HotelCardProps) {
  const { isDark } = useUI();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(hotel.isFavorite || false);

  const amenities = [
    { key: "wifi", label: "WiFi miễn phí", icon: Wifi },
    { key: "parking", label: "Bãi đỗ xe", icon: Car },
    { key: "restaurant", label: "Nhà hàng", icon: Utensils },
    { key: "pool", label: "Hồ bơi", icon: Waves },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getAmenityIcon = (amenity: string) => {
    const amenityData = amenities.find(a => a.key === amenity);
    return amenityData ? amenityData.icon : null;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      {/* Image Gallery */}
      <div className="relative h-48 overflow-hidden group">
        <img
          src={hotel.images[currentImageIndex] || "/images/hotel-placeholder.jpg"}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/hotel-placeholder.jpg";
          }}
        />

        {/* Image Navigation */}
        {hotel.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              ›
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {hotel.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-300"
        >
          <Heart className={`h-5 w-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>

        {/* Deal Badge */}
        {hotel.deal && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {hotel.deal}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
              {hotel.name}
            </h3>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
              <MapPin className="h-4 w-4 mr-1" />
              {hotel.location}
              {hotel.distance && <span className="ml-2">• {hotel.distance}</span>}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
            <Star className="h-3 w-3 mr-1 fill-current" />
            {hotel.rating}
          </div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            ({hotel.reviewCount} đánh giá)
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map(amenity => {
            const IconComponent = getAmenityIcon(amenity);
            return (
              <div key={amenity} className={`flex items-center text-xs px-2 py-1 rounded-full ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                {IconComponent && <IconComponent className="h-3 w-3 mr-1" />}
                {amenities.find(a => a.key === amenity)?.label}
              </div>
            );
          })}
          {hotel.amenities.length > 3 && (
            <div className={`text-xs px-2 py-1 rounded-full ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              +{hotel.amenities.length - 3}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex justify-between items-end">
          <div>
            {hotel.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(hotel.originalPrice)}
              </div>
            )}
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {formatPrice(hotel.price)}
              <span className="text-sm font-normal text-gray-600 dark:text-gray-400">/đêm</span>
            </div>
          </div>

          <button
            onClick={() => onViewDetails(hotel)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
