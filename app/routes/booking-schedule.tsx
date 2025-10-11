import { useState, useEffect } from "react";
import { useUI } from "../contexts/UIContext";
import LoadingAnimation from "../components/LoadingAnimation";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Phone,
  MapPin,
  Filter,
  Search,
  Plus,
  RefreshCw,
  Download,
} from "lucide-react";

interface BookingSchedule {
  id: string;
  customerName: string;
  customerPhone: string;
  roomNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled";
  priority: "low" | "medium" | "high";
}

export default function BookingSchedule() {
  const { isDark } = useUI();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<BookingSchedule[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadBookings();
  }, [currentDate]);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockBookings: BookingSchedule[] = [
        {
          id: "BK001",
          customerName: "Nguyễn Văn A",
          customerPhone: "0123456789",
          roomNumber: "201",
          roomType: "Phòng Deluxe",
          checkInDate: "2024-01-15",
          checkOutDate: "2024-01-17",
          status: "confirmed",
          priority: "high"
        },
        {
          id: "BK002",
          customerName: "Trần Thị B",
          customerPhone: "0987654321",
          roomNumber: "305",
          roomType: "Phòng Suite",
          checkInDate: "2024-01-16",
          checkOutDate: "2024-01-18",
          status: "checked-in",
          priority: "medium"
        },
        {
          id: "BK003",
          customerName: "Lê Văn C",
          customerPhone: "0369852147",
          roomNumber: "102",
          roomType: "Phòng Standard",
          checkInDate: "2024-01-14",
          checkOutDate: "2024-01-16",
          status: "pending",
          priority: "low"
        },
        {
          id: "BK004",
          customerName: "Phạm Thị D",
          customerPhone: "0945123789",
          roomNumber: "401",
          roomType: "Phòng Executive",
          checkInDate: "2024-01-17",
          checkOutDate: "2024-01-19",
          status: "confirmed",
          priority: "medium"
        },
        {
          id: "BK005",
          customerName: "Hoàng Văn E",
          customerPhone: "0852369741",
          roomNumber: "203",
          roomType: "Phòng Deluxe",
          checkInDate: "2024-01-20",
          checkOutDate: "2024-01-22",
          status: "pending",
          priority: "high"
        }
      ];
      setBookings(mockBookings);
    } catch (error) {
      console.error("Error loading bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomNumber.includes(searchTerm) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", label: "Chờ xử lý" },
      confirmed: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", label: "Đã xác nhận" },
      "checked-in": { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", label: "Đã nhận phòng" },
      "checked-out": { color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200", label: "Đã trả phòng" },
      cancelled: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", label: "Đã hủy" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200", label: "Thấp" },
      medium: { color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200", label: "Trung bình" },
      high: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", label: "Cao" }
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getBookingsForDate = (date: Date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return filteredBookings.filter(booking => {
      const checkIn = new Date(booking.checkInDate).toISOString().split('T')[0];
      const checkOut = new Date(booking.checkOutDate).toISOString().split('T')[0];
      return dateString >= checkIn && dateString <= checkOut;
    });
  };

  const days = getDaysInMonth(currentDate);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingAnimation size="lg" color="green" text="Đang tải lịch đặt phòng..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Lịch đặt phòng
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("month")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === "month"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Tháng
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === "week"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Tuần
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === "day"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Ngày
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Đặt phòng mới
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, phòng, mã đặt phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="checked-in">Đã nhận phòng</option>
              <option value="checked-out">Đã trả phòng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
              Tổng cộng: {filteredBookings.length} đặt phòng
            </span>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Hôm nay
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              {day}
            </div>
          ))}

          {days.map((day, index) => {
            const dayBookings = day ? getBookingsForDate(day) : [];
            const isToday = day && day.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`min-h-32 p-2 border border-gray-200 dark:border-gray-600 rounded-lg ${
                  day ? 'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer' : ''
                } ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600' : ''}`}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-2 ${
                      isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {day.getDate()}
                    </div>

                    <div className="space-y-1">
                      {dayBookings.slice(0, 3).map(booking => (
                        <div
                          key={booking.id}
                          className={`text-xs p-1 rounded truncate ${
                            booking.priority === 'high'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : booking.priority === 'medium'
                              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}
                          title={`${booking.customerName} - Phòng ${booking.roomNumber}`}
                        >
                          {booking.customerName} - {booking.roomNumber}
                        </div>
                      ))}

                      {dayBookings.length > 3 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          +{dayBookings.length - 3} nữa
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-100 dark:bg-red-900 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">Ưu tiên cao</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-100 dark:bg-orange-900 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">Ưu tiên trung bình</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-100 dark:bg-gray-700 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">Ưu tiên thấp</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-600 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">Hôm nay</span>
          </div>
        </div>
      </div>

      {/* Today's Bookings Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Đặt phòng hôm nay ({new Date().toLocaleDateString('vi-VN')})
        </h3>

        {getBookingsForDate(new Date()).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getBookingsForDate(new Date()).map(booking => (
              <div key={booking.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {booking.customerName}
                  </h4>
                  {getStatusBadge(booking.status)}
                </div>

                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Phòng {booking.roomNumber} - {booking.roomType}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {booking.customerPhone}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                  </div>
                </div>

                <div className="mt-3">
                  {getPriorityBadge(booking.priority)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h4 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Không có đặt phòng hôm nay
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Hôm nay không có khách đặt phòng
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
