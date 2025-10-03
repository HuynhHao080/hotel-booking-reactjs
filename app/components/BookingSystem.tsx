import { useState, useEffect } from "react";
import { useUI } from "../contexts/UIContext";
import { BookingService, type Room, type BookingRequest } from "../services/bookingService";
import {
  Calendar,
  Users,
  Search,
  Star,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  Shield,
  CheckCircle,
  CreditCard,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Filter,
  SlidersHorizontal,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface BookingSystemProps {
  onBookingComplete?: (booking: any) => void;
}

export default function BookingSystem({ onBookingComplete }: BookingSystemProps) {
  const { isDark } = useUI();
  const [currentStep, setCurrentStep] = useState(1);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: "2",
    roomType: "all"
  });

  const [bookingForm, setBookingForm] = useState({
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      specialRequests: ""
    },
    paymentInfo: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolder: ""
    }
  });

  const [bookingResult, setBookingResult] = useState<any>(null);

  // Room amenities icons
  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes("WiFi")) return <Wifi className="h-4 w-4" />;
    if (amenity.includes("TV")) return <div className="h-4 w-4 bg-gray-400 rounded"></div>;
    if (amenity.includes("Bồn tắm") || amenity.includes("tắm")) return <div className="h-4 w-4 bg-blue-400 rounded"></div>;
    if (amenity.includes("Ban công")) return <div className="h-4 w-4 bg-green-400 rounded"></div>;
    return <CheckCircle className="h-4 w-4" />;
  };

  // Search for available rooms
  const handleSearch = async () => {
    if (!searchFilters.checkInDate || !searchFilters.checkOutDate) {
      alert("Vui lòng chọn ngày check-in và check-out");
      return;
    }

    setLoading(true);
    try {
      const rooms = await BookingService.getAvailableRooms(
        searchFilters.checkInDate,
        searchFilters.checkOutDate,
        parseInt(searchFilters.guests)
      );
      setAvailableRooms(rooms);
      setCurrentStep(2);
    } catch (error) {
      console.error("Error searching rooms:", error);
      alert("Có lỗi xảy ra khi tìm phòng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Handle room selection
  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setCurrentStep(3);
  };

  // Handle booking submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    setLoading(true);
    try {
      const bookingRequest: BookingRequest = {
        checkInDate: searchFilters.checkInDate,
        checkOutDate: searchFilters.checkOutDate,
        guests: parseInt(searchFilters.guests),
        roomType: selectedRoom.type,
        customerInfo: bookingForm.customerInfo
      };

      const booking = await BookingService.createBooking(bookingRequest);
      setBookingResult(booking);
      setCurrentStep(4);
      onBookingComplete?.(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Có lỗi xảy ra khi đặt phòng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedRoom || !searchFilters.checkInDate || !searchFilters.checkOutDate) return 0;

    const nights = Math.ceil(
      (new Date(searchFilters.checkOutDate).getTime() - new Date(searchFilters.checkInDate).getTime()) /
      (1000 * 60 * 60 * 24)
    );

    return selectedRoom.price * nights;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: "Tìm phòng", description: "Chọn ngày và số khách" },
      { number: 2, title: "Chọn phòng", description: "Lựa chọn phòng phù hợp" },
      { number: 3, title: "Thông tin", description: "Điền thông tin đặt phòng" },
      { number: 4, title: "Hoàn tất", description: "Xác nhận đặt phòng" }
    ];

    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300 ${
                currentStep >= step.number
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : isDark
                    ? 'border-gray-600 text-gray-400'
                    : 'border-gray-300 text-gray-500'
              }`}>
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 transition-colors duration-300 ${
                  currentStep > step.number
                    ? 'bg-blue-500'
                    : isDark
                      ? 'bg-gray-600'
                      : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className={`max-w-2xl mx-auto p-8 rounded-xl shadow-lg transition-colors duration-300 ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <h2 className="text-2xl font-bold mb-6 text-center">Tìm Phòng Nghỉ</h2>

      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ngày nhận phòng</label>
            <input
              type="date"
              value={searchFilters.checkInDate}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, checkInDate: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ngày trả phòng</label>
            <input
              type="date"
              value={searchFilters.checkOutDate}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, checkOutDate: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Số khách</label>
            <select
              value={searchFilters.guests}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, guests: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="1">1 khách</option>
              <option value="2">2 khách</option>
              <option value="3">3 khách</option>
              <option value="4">4 khách</option>
              <option value="5">5+ khách</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Loại phòng</label>
            <select
              value={searchFilters.roomType}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, roomType: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="all">Tất cả loại phòng</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          ) : (
            <Search className="h-5 w-5 mr-2" />
          )}
          {loading ? 'Đang tìm phòng...' : 'Tìm phòng có sẵn'}
        </button>
      </form>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Chọn Phòng Phù Hợp</h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {availableRooms.length} phòng có sẵn cho {searchFilters.guests} khách từ {searchFilters.checkInDate} đến {searchFilters.checkOutDate}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRooms.map((room) => (
          <div
            key={room.id}
            className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
            onClick={() => handleRoomSelect(room)}
          >
            <div
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${room.images[0] || '/images/gallery1.jpg'}')` }}
            >
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Có sẵn
              </div>
            </div>

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

              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <Calendar className="h-4 w-4 mr-2" />
                Chọn phòng này
              </button>
            </div>
          </div>
        ))}
      </div>

      {availableRooms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏨</div>
          <h3 className="text-xl font-bold mb-2">Không tìm thấy phòng nào</h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Thử thay đổi ngày hoặc số khách để tìm thêm lựa chọn
          </p>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-2xl mx-auto">
      <div className={`p-8 rounded-xl shadow-lg transition-colors duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className="text-2xl font-bold mb-6">Thông Tin Đặt Phòng</h2>

        {selectedRoom && (
          <div className={`p-4 rounded-lg mb-6 transition-colors duration-300 ${
            isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'
          }`}>
            <h3 className="font-bold mb-2">Phòng đã chọn: {selectedRoom.name}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Check-in:</span> {searchFilters.checkInDate}
              </div>
              <div>
                <span className="font-medium">Check-out:</span> {searchFilters.checkOutDate}
              </div>
              <div>
                <span className="font-medium">Số khách:</span> {searchFilters.guests}
              </div>
              <div>
                <span className="font-medium">Tổng tiền:</span> {formatPrice(calculateTotalPrice())}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleBookingSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Họ và tên</label>
              <input
                type="text"
                value={bookingForm.customerInfo.name}
                onChange={(e) => setBookingForm(prev => ({
                  ...prev,
                  customerInfo: { ...prev.customerInfo, name: e.target.value }
                }))}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Số điện thoại</label>
              <input
                type="tel"
                value={bookingForm.customerInfo.phone}
                onChange={(e) => setBookingForm(prev => ({
                  ...prev,
                  customerInfo: { ...prev.customerInfo, phone: e.target.value }
                }))}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="0901234567"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={bookingForm.customerInfo.email}
              onChange={(e) => setBookingForm(prev => ({
                ...prev,
                customerInfo: { ...prev.customerInfo, email: e.target.value }
              }))}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Yêu cầu đặc biệt (tùy chọn)</label>
            <textarea
              value={bookingForm.customerInfo.specialRequests}
              onChange={(e) => setBookingForm(prev => ({
                ...prev,
                customerInfo: { ...prev.customerInfo, specialRequests: e.target.value }
              }))}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              rows={3}
              placeholder="Ghi chú đặc biệt về phòng, dịch vụ..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`flex-1 px-6 py-3 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ← Quay lại
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <CreditCard className="h-5 w-5 mr-2" />
              )}
              {loading ? 'Đang xử lý...' : 'Xác nhận đặt phòng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className={`p-8 rounded-xl shadow-lg transition-colors duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-2xl font-bold mb-4">Đặt phòng thành công!</h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          Cảm ơn bạn đã đặt phòng tại Paradise Hotel. Chúng tôi sẽ gửi email xác nhận trong vài phút tới.
        </p>

        {bookingResult && (
          <div className={`p-4 rounded-lg mb-6 transition-colors duration-300 ${
            isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'
          }`}>
            <h3 className="font-bold mb-2">Thông tin đặt phòng</h3>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Mã đặt phòng:</span> {bookingResult.id}</p>
              <p><span className="font-medium">Khách hàng:</span> {bookingResult.customerName}</p>
              <p><span className="font-medium">Tổng tiền:</span> {formatPrice(bookingResult.totalAmount)}</p>
              <p><span className="font-medium">Trạng thái:</span>
                <span className="text-yellow-600 font-medium ml-1">Đang xử lý</span>
              </p>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={() => {
              setCurrentStep(1);
              setSelectedRoom(null);
              setBookingResult(null);
            }}
            className={`flex-1 px-6 py-3 rounded-lg border transition-colors duration-300 ${
              isDark
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Đặt phòng khác
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Chia sẻ
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {renderStepIndicator()}

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>
    </div>
  );
}
