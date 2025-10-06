import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUI } from "../contexts/UIContext";
import Header from "../components/Header";
import BookingSystem from "../components/BookingSystem";
import {
  Bed,
  FileText,
  Settings,
  Users,
  Star,
  MapPin,
  Phone,
  Mail,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Calendar,
  User,
  Search,
  Heart,
  Quote,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Grid,
  Eye,
} from "lucide-react";

export default function Home() {
  const { isDark } = useUI();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("2");

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery images
  const galleryImages = [
    "/images/hotel-hero.jpg",
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/hotel-1.jpg",
    "/images/hotel-2.jpg",
    "/images/hotel-hero.jpg",
    "/images/gallery1.jpg",
  ];

  // Hero slides data
  const heroSlides = [
    {
      image: "/images/hotel-hero.jpg",
      title: "Chào mừng đến với Paradise Hotel",
      subtitle: "Trải nghiệm nghỉ dưỡng tuyệt vời",
      description: "Khám phá sự sang trọng và thoải mái tại khách sạn hàng đầu"
    },
    {
      image: "/images/gallery1.jpg",
      title: "Phòng nghỉ cao cấp",
      subtitle: "Thiết kế hiện đại, tiện nghi đầy đủ",
      description: "Không gian sống hoàn hảo cho kỳ nghỉ của bạn"
    },
    {
      image: "/images/gallery2.jpg",
      title: "Dịch vụ spa & wellness",
      subtitle: "Thư giãn và tái tạo năng lượng",
      description: "Trải nghiệm spa chuyên nghiệp với các liệu pháp cao cấp"
    }
  ];

  // Room types
  const roomTypes = [
    {
      name: "Phòng Standard",
      price: "500,000",
      size: "25m²",
      beds: "1 giường đôi",
      amenities: ["WiFi miễn phí", "TV 42 inch", "Minibar"],
      image: "/images/gallery1.jpg",
      popular: false
    },
    {
      name: "Phòng Deluxe",
      price: "800,000",
      size: "35m²",
      beds: "1 giường king",
      amenities: ["WiFi miễn phí", "TV 50 inch", "Ban công", "Bồn tắm"],
      image: "/images/gallery2.jpg",
      popular: true
    },
    {
      name: "Suite Executive",
      price: "1,500,000",
      size: "50m²",
      beds: "1 giường king + sofa",
      amenities: ["WiFi miễn phí", "TV 55 inch", "Phòng khách", "Bồn tắm + vòi sen"],
      image: "/images/gallery3.jpg",
      popular: false
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Nguyễn Thị Lan",
      role: "Khách hàng VIP",
      content: "Khách sạn tuyệt vời! Phòng sạch sẽ, nhân viên thân thiện và dịch vụ spa rất tốt. Tôi sẽ quay lại lần nữa!",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Trần Văn Minh",
      role: "Doanh nhân",
      content: "Vị trí thuận tiện, phòng họp hiện đại. Rất phù hợp cho các chuyến công tác. Đã ở đây 3 lần rồi!",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Lê Thị Hoa",
      role: "Gia đình",
      content: "Gia đình tôi rất thích khách sạn này. Có hồ bơi cho trẻ em và nhà hàng ngon. Phục vụ chu đáo!",
      rating: 5,
      avatar: "👨‍👩‍👧‍👦"
    }
  ];

  // Services
  const services = [
    {
      icon: <Wifi className="h-8 w-8" />,
      title: "WiFi Miễn Phí",
      description: "Kết nối internet tốc độ cao trong toàn bộ khách sạn"
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: "Đỗ Xe",
      description: "Bãi đỗ xe rộng rãi và an ninh 24/7"
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Nhà Hàng",
      description: "Ẩm thực đa dạng từ Á đến Âu"
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "Phòng Gym",
      description: "Trang thiết bị hiện đại cho sức khỏe"
    },
    {
      icon: <Waves className="h-8 w-8" />,
      title: "Spa & Massage",
      description: "Thư giãn với các liệu pháp chuyên nghiệp"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "An Ninh 24/7",
      description: "Hệ thống an ninh hiện đại và đội ngũ bảo vệ"
    }
  ];

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement booking logic
    alert("Tính năng đặt phòng sẽ được tích hợp với backend!");
  };

  const formatPrice = (price: string) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " VNĐ";
  };

  // Lightbox functions
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-[#f8f1e9] to-[#fff] text-gray-900'
    }`}>
      {/* Hero Section with Slideshow */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-6xl px-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-4 animate-fadeInUp delay-200">
              {heroSlides[currentSlide].subtitle}
            </p>
            <p className="text-lg mb-8 animate-fadeInUp delay-400 max-w-2xl mx-auto">
              {heroSlides[currentSlide].description}
            </p>

            {/* Quick Booking Widget */}
            <div className={`inline-block p-6 rounded-2xl shadow-2xl backdrop-blur-md animate-fadeInUp delay-600 ${
              isDark ? 'bg-gray-800/90' : 'bg-white/90'
            }`}>
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold mb-2">Đặt phòng nhanh</h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Hoặc sử dụng hệ thống đặt phòng chi tiết
                </p>
              </div>
              <form onSubmit={handleBooking} className="flex flex-wrap gap-4 items-end justify-center">
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check-out</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Khách</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">1 khách</option>
                    <option value="2">2 khách</option>
                    <option value="3">3 khách</option>
                    <option value="4">4 khách</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="px-8 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Tìm phòng
                </button>
              </form>
              <div className="mt-4 text-center space-x-4">
                <a
                  href="/booking"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 text-sm font-semibold"
                >
                  🏨 Hệ thống đặt phòng chi tiết
                </a>
                <a
                  href="/rooms"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-sm font-semibold"
                >
                  🛏️ Xem tất cả phòng
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-20 px-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Dịch Vụ Cao Cấp</h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Chúng tôi mang đến trải nghiệm nghỉ dưỡng hoàn hảo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`inline-flex p-3 rounded-full mb-4 ${
                  isDark ? 'bg-blue-600' : 'bg-blue-100'
                }`}>
                  <div className="text-white">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={`py-20 px-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Thư Viện Hình Ảnh</h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Khám phá không gian và dịch vụ tại Paradise Hotel
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group ${
                  isDark ? 'shadow-gray-900/50' : 'shadow-gray-200'
                }`}
                onClick={() => openLightbox(index)}
              >
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${image}')` }}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`p-3 rounded-full ${isDark ? 'bg-white/20' : 'bg-black/20'}`}>
                        <ZoomIn className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                  isDark ? 'bg-black/70 text-white' : 'bg-white/90 text-gray-800'
                }`}>
                  {index === 0 && "Sảnh chính"}
                  {index === 1 && "Phòng Standard"}
                  {index === 2 && "Phòng Deluxe"}
                  {index === 3 && "Suite Executive"}
                  {index === 4 && "Nhà hàng"}
                  {index === 5 && "Hồ bơi"}
                  {index === 6 && "Spa"}
                  {index === 7 && "Phòng gym"}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className={`inline-flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
            }`}>
              <Grid className="h-5 w-5 mr-2" />
              Xem tất cả hình ảnh
            </button>
          </div>
        </div>
      </section>

      {/* Room Types Section */}
      <section className={`py-20 px-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Các Loại Phòng</h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Chọn phòng phù hợp với nhu cầu của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomTypes.map((room, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                {room.popular && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    Phổ biến
                  </div>
                )}
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${room.image}')` }}
                ></div>
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
                    {room.beds}
                  </p>
                  <div className="space-y-2 mb-6">
                    {room.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Đặt ngay
                    </button>
                    <Link
                      to="/booking"
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm"
                    >
                      🏨 Đặt online
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 px-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Khách Hàng Nói Gì</h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Những đánh giá chân thực từ khách hàng của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-blue-500 mb-3" />
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonial.content}"
                </p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-20 px-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Liên Hệ Với Chúng Tôi</h2>
              <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Chúng tôi luôn sẵn sàng phục vụ bạn 24/7. Hãy liên hệ để được tư vấn tốt nhất.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-blue-500 mr-4" />
                  <div>
                    <p className="font-semibold">Địa chỉ</p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      123 Đường ABC, Quận 1, TP.HCM
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-500 mr-4" />
                  <div>
                    <p className="font-semibold">Điện thoại</p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      (028) 1234-5678
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-500 mr-4" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      info@paradisehotel.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-blue-500 mr-4" />
                  <div>
                    <p className="font-semibold">Giờ hoạt động</p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      24/7 - Luôn sẵn sàng phục vụ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-xl shadow-lg ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <h3 className="text-2xl font-bold mb-6">Gửi Tin Nhắn</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Họ tên</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder="Nhập họ tên của bạn"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tin nhắn</label>
                  <textarea
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder="Nhập tin nhắn của bạn..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-8 ${isDark ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-900 text-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🏨 Paradise Hotel</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
                Khách sạn cao cấp với dịch vụ hoàn hảo, mang đến trải nghiệm nghỉ dưỡng tuyệt vời cho mọi khách hàng.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Dịch vụ</h4>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
                <li><Link to="/rooms" className="hover:text-blue-500 transition-colors">Phòng nghỉ</Link></li>
                <li><Link to="/restaurants" className="hover:text-blue-500 transition-colors">Nhà hàng</Link></li>
                <li><Link to="/spa" className="hover:text-blue-500 transition-colors">Spa & Wellness</Link></li>
                <li><Link to="/events" className="hover:text-blue-500 transition-colors">Sự kiện</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hỗ trợ</h4>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
                <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Liên hệ</Link></li>
                <li><Link to="/faq" className="hover:text-blue-500 transition-colors">FAQ</Link></li>
                <li><Link to="/booking" className="hover:text-blue-500 transition-colors">Đặt phòng</Link></li>
                <li><Link to="/support" className="hover:text-blue-500 transition-colors">Hỗ trợ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kết nối</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-2xl hover:text-blue-500 transition-colors">📘</a>
                <a href="#" className="text-2xl hover:text-blue-500 transition-colors">📷</a>
                <a href="#" className="text-2xl hover:text-blue-500 transition-colors">🐦</a>
              </div>
            </div>
          </div>
          <div className={`border-t mt-8 pt-8 text-center ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-700 text-gray-500'}`}>
            <p>&copy; 2024 Paradise Hotel. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fadeInUp.delay-200 { animation-delay: 0.2s; }
        .animate-fadeInUp.delay-400 { animation-delay: 0.4s; }
        .animate-fadeInUp.delay-600 { animation-delay: 0.6s; }
      `}</style>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-screen mx-4">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-300"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-300"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-300"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Main image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={galleryImages[currentImageIndex]}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>

            {/* Image caption */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm max-w-md text-center">
              {currentImageIndex === 0 && "Sảnh chính - Không gian sang trọng và chuyên nghiệp"}
              {currentImageIndex === 1 && "Phòng Standard - Thiết kế hiện đại và tiện nghi"}
              {currentImageIndex === 2 && "Phòng Deluxe - Không gian rộng rãi và thoải mái"}
              {currentImageIndex === 3 && "Suite Executive - Sự lựa chọn hoàn hảo cho doanh nhân"}
              {currentImageIndex === 4 && "Nhà hàng - Ẩm thực đa dạng và chất lượng"}
              {currentImageIndex === 5 && "Hồ bơi - Không gian thư giãn tuyệt vời"}
              {currentImageIndex === 6 && "Spa - Trải nghiệm chăm sóc sức khỏe chuyên nghiệp"}
              {currentImageIndex === 7 && "Phòng gym - Trang thiết bị hiện đại"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
