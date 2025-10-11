import { useState, useEffect } from "react";
import { BookingService } from "../services/bookingService";
import { useUI } from "../contexts/UIContext";
import LoadingAnimation from "../components/LoadingAnimation";
import {
  Calendar,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Download,
  Plus,
} from "lucide-react";

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled";
  specialRequests?: string;
}

export default function BookingAll() {
  const { isDark } = useUI();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockBookings: Booking[] = [
        {
          id: "BK001",
          customerName: "Nguyễn Văn A",
          customerPhone: "0123456789",
          customerEmail: "nguyenvana@email.com",
          roomType: "Phòng Deluxe",
          checkInDate: "2024-01-15",
          checkOutDate: "2024-01-17",
          totalAmount: 2000000,
          status: "confirmed",
          specialRequests: "Phòng yên tĩnh, không hút thuốc"
        },
        {
          id: "BK002",
          customerName: "Trần Thị B",
          customerPhone: "0987654321",
          customerEmail: "tranthib@email.com",
          roomType: "Phòng Suite",
          checkInDate: "2024-01-16",
          checkOutDate: "2024-01-18",
          totalAmount: 3500000,
          status: "checked-in"
        },
        {
          id: "BK003",
          customerName: "Lê Văn C",
          customerPhone: "0369852147",
          customerEmail: "levanc@email.com",
          roomType: "Phòng Standard",
          checkInDate: "2024-01-14",
          checkOutDate: "2024-01-16",
          totalAmount: 1500000,
          status: "pending"
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
        booking.customerPhone.includes(searchTerm) ||
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingAnimation size="lg" color="blue" text="Đang tải danh sách đặt phòng..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Tất cả đặt phòng
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Tổng cộng: {filteredBookings.length} đặt phòng
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, SĐT, mã đặt phòng..."
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

          <button
            onClick={loadBookings}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Tải lại
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Thông tin đặt phòng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Phòng & Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {booking.id}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatPrice(booking.totalAmount)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {booking.customerName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {booking.customerPhone}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {booking.customerEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {booking.roomType}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                    </div>
                    {booking.specialRequests && (
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        📝 {booking.specialRequests}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="Xóa"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Không có đặt phòng nào
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm || statusFilter !== "all"
                ? "Không tìm thấy đặt phòng phù hợp với bộ lọc"
                : "Chưa có đặt phòng nào trong hệ thống"}
            </p>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Chi tiết đặt phòng {selectedBooking.id}
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Khách hàng
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {selectedBooking.customerName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Liên hệ
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    📞 {selectedBooking.customerPhone} | 📧 {selectedBooking.customerEmail}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phòng & Thời gian
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    🏨 {selectedBooking.roomType}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    📅 {formatDate(selectedBooking.checkInDate)} - {formatDate(selectedBooking.checkOutDate)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tổng tiền
                  </label>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    {formatPrice(selectedBooking.totalAmount)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Trạng thái
                  </label>
                  {getStatusBadge(selectedBooking.status)}
                </div>

                {selectedBooking.specialRequests && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Yêu cầu đặc biệt
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedBooking.specialRequests}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                >
                  Đóng
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
