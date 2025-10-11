import { useState, useEffect } from "react";
import { useUI } from "../contexts/UIContext";
import LoadingAnimation from "../components/LoadingAnimation";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Edit,
  Save,
  RefreshCw,
  AlertTriangle,
  LogIn,
  LogOut,
  Download,
  Filter,
} from "lucide-react";

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  roomNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled";
  priority: "low" | "medium" | "high";
  notes?: string;
}

export default function BookingManage() {
  const { isDark } = useUI();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingBooking, setEditingBooking] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, statusFilter]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockBookings: Booking[] = [
        {
          id: "BK001",
          customerName: "Nguyễn Văn A",
          customerPhone: "0123456789",
          roomNumber: "201",
          roomType: "Phòng Deluxe",
          checkInDate: "2024-01-15",
          checkOutDate: "2024-01-17",
          status: "confirmed",
          priority: "high",
          notes: "Khách VIP, cần chuẩn bị hoa và rượu vang"
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
          priority: "low",
          notes: "Yêu cầu phòng không hút thuốc"
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
          priority: "medium",
          notes: "Có trẻ nhỏ, cần phòng rộng"
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
    if (statusFilter === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(booking => booking.status === statusFilter));
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: Booking["status"]) => {
    setBookings(prev => prev.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const saveNotes = (bookingId: string) => {
    setBookings(prev => prev.map(booking =>
      booking.id === bookingId ? { ...booking, notes: editNotes } : booking
    ));
    setEditingBooking(null);
    setEditNotes("");
  };

  const startEditNotes = (booking: Booking) => {
    setEditingBooking(booking.id);
    setEditNotes(booking.notes || "");
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

  const getActionButtons = (booking: Booking) => {
    switch (booking.status) {
      case "pending":
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => updateBookingStatus(booking.id, "confirmed")}
              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 flex items-center"
              title="Xác nhận đặt phòng"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Xác nhận
            </button>
            <button
              onClick={() => updateBookingStatus(booking.id, "cancelled")}
              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 flex items-center"
              title="Hủy đặt phòng"
            >
              <XCircle className="h-3 w-3 mr-1" />
              Hủy
            </button>
          </div>
        );
      case "confirmed":
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => updateBookingStatus(booking.id, "checked-in")}
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 flex items-center"
              title="Check-in"
            >
              <LogIn className="h-3 w-3 mr-1" />
              Nhận phòng
            </button>
            <button
              onClick={() => updateBookingStatus(booking.id, "cancelled")}
              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 flex items-center"
              title="Hủy đặt phòng"
            >
              <XCircle className="h-3 w-3 mr-1" />
              Hủy
            </button>
          </div>
        );
      case "checked-in":
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => updateBookingStatus(booking.id, "checked-out")}
              className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 flex items-center"
              title="Check-out"
            >
              <LogOut className="h-3 w-3 mr-1" />
              Trả phòng
            </button>
          </div>
        );
      default:
        return (
          <span className="text-xs text-gray-500">Hoàn thành</span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingAnimation size="lg" color="purple" text="Đang tải quản lý đặt phòng..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Quản lý đặt phòng
        </h1>
        <div className="flex space-x-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="checked-in">Đã nhận phòng</option>
            <option value="checked-out">Đã trả phòng</option>
          </select>
          <button
            onClick={loadBookings}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Tải lại
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Chờ xử lý</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {bookings.filter(b => b.status === "pending").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đã xác nhận</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {bookings.filter(b => b.status === "confirmed").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <User className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đã nhận phòng</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {bookings.filter(b => b.status === "checked-in").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ưu tiên cao</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {bookings.filter(b => b.priority === "high").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Management Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Thông tin đặt phòng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Khách hàng & Phòng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ưu tiên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ghi chú
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
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {booking.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {booking.customerName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      📞 {booking.customerPhone}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      🏨 Phòng {booking.roomNumber} - {booking.roomType}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      📅 {formatDate(booking.checkInDate)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      📅 {formatDate(booking.checkOutDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(booking.priority)}
                  </td>
                  <td className="px-6 py-4">
                    {editingBooking === booking.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          rows={2}
                          placeholder="Nhập ghi chú..."
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => saveNotes(booking.id)}
                            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 flex items-center"
                          >
                            <Save className="h-3 w-3 mr-1" />
                            Lưu
                          </button>
                          <button
                            onClick={() => setEditingBooking(null)}
                            className="px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                          {booking.notes || "Chưa có ghi chú"}
                        </div>
                        <button
                          onClick={() => startEditNotes(booking)}
                          className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                          <Edit className="h-3 w-3 inline mr-1" />
                          Chỉnh sửa
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {getActionButtons(booking)}
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
              {statusFilter !== "all"
                ? `Không có đặt phòng với trạng thái "${getStatusBadge(statusFilter).props.children}"`
                : "Chưa có đặt phòng nào trong hệ thống"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
