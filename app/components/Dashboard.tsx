import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/apiService';
import type { NotificationItem, SystemHealth } from '../services/apiService';
import type { DashboardStats } from '../types/database';
import StatsCard from './StatsCard';
import LoadingSpinner from './LoadingSpinner';

// Dashboard Component - Trang chủ quản lý khách sạn
export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await ApiService.getDashboardData();
      setStats(data.stats);
      setNotifications(data.notifications);
      setSystemHealth(data.systemHealth);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Không thể tải dữ liệu dashboard');
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await ApiService.markNotificationAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'success': return '✅';
      default: return '📢';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Lỗi</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Tổng quan hệ thống quản lý khách sạn</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* System Health Status */}
          {systemHealth && (
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemHealth.status)}`}>
              Hệ thống: {systemHealth.status === 'healthy' ? 'Bình thường' :
                       systemHealth.status === 'warning' ? 'Cảnh báo' : 'Lỗi'}
            </div>
          )}
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            🔄 Làm mới
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Tổng đặt phòng"
            value={stats.totalBookings.toString()}
            color="bg-blue-100"
          />
          <StatsCard
            title="Doanh thu"
            value={`${(stats.totalRevenue / 1000000).toFixed(1)}M VND`}
            color="bg-green-100"
          />
          <StatsCard
            title="Tỷ lệ lấp đầy"
            value={`${stats.occupancyRate}%`}
            color="bg-purple-100"
          />
          <StatsCard
            title="Khách hàng"
            value={stats.totalCustomers.toString()}
            color="bg-orange-100"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thông báo gần đây */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Thông báo gần đây</h2>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Không có thông báo mới</p>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors ${
                    notification.read
                      ? 'bg-gray-50 border-gray-300'
                      : 'bg-blue-50 border-blue-500 hover:bg-blue-100'
                  }`}
                  onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notification.timestamp).toLocaleString('vi-VN')}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Thống kê trạng thái đặt phòng */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Trạng thái đặt phòng</h2>
          {stats && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Chờ xác nhận</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${(stats.bookingsByStatus.PENDING / stats.totalBookings) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.bookingsByStatus.PENDING}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Đã xác nhận</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(stats.bookingsByStatus.CONFIRMED / stats.totalBookings) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.bookingsByStatus.CONFIRMED}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Đã nhận phòng</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(stats.bookingsByStatus.CHECKED_IN / stats.totalBookings) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.bookingsByStatus.CHECKED_IN}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Đã trả phòng</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(stats.bookingsByStatus.CHECKED_OUT / stats.totalBookings) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.bookingsByStatus.CHECKED_OUT}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Đã hủy</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(stats.bookingsByStatus.CANCELLED / stats.totalBookings) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.bookingsByStatus.CANCELLED}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Biểu đồ doanh thu theo tháng với animation */}
      {stats && stats.revenueByMonth.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📈 Doanh thu theo tháng</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {stats.revenueByMonth.map((item, index) => {
              const maxRevenue = Math.max(...stats.revenueByMonth.map(r => r.revenue));
              const height = (item.revenue / maxRevenue) * 200;
              const revenueInMillions = (item.revenue / 1000000).toFixed(1);

              // Màu gradient đẹp hơn dựa trên giá trị
              const getBarColor = (revenue: number) => {
                if (revenue >= 50000000) return 'from-green-500 to-green-600'; // Xanh lá cho cao
                if (revenue >= 40000000) return 'from-blue-500 to-blue-600';   // Xanh dương cho trung bình
                return 'from-purple-500 to-purple-600';                        // Tím cho thấp
              };

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center group">
                  <div className="relative w-full flex items-end justify-center">
                    <div
                      className={`w-full bg-gradient-to-t ${getBarColor(item.revenue)} rounded-t-lg min-h-[20px] flex items-end justify-center transition-all duration-700 ease-out hover:scale-105 hover:shadow-lg`}
                      style={{
                        height: `${height}px`
                      }}
                    >
                      {/* Tooltip hiển thị khi hover */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {revenueInMillions}M VND
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
                      </div>

                      {/* Giá trị hiển thị trên cột */}
                      <span className="text-xs text-white font-bold mb-1 drop-shadow-lg">
                        {revenueInMillions}M
                      </span>
                    </div>
                  </div>

                  {/* Nhãn tháng với hiệu ứng hover */}
                  <span className="text-xs text-gray-600 mt-2 group-hover:text-blue-600 transition-colors duration-300 font-medium">
                    {new Date(item.month).toLocaleDateString('vi-VN', { month: 'short', year: '2-digit' })}
                  </span>

                  {/* Đường kẻ chỉ báo mức doanh thu */}
                  <div className="absolute bottom-0 w-full h-0.5 bg-gray-200"></div>
                </div>
              );
            })}
          </div>

          {/* Legend và thông tin bổ sung */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
              <span>Doanh thu cao (≥50M VND)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
              <span>Doanh thu trung bình (≥40M VND)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded"></div>
              <span>{`Doanh thu thấp (<40M VND)`}</span>
            </div>
          </div>

          {/* Tổng quan doanh thu */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Tổng doanh thu 3 tháng</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(() => {
                    const total = stats.revenueByMonth.reduce((sum, item) => sum + item.revenue, 0);
                    return (total / 1000000).toFixed(1);
                  })()}M VND
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Trung bình mỗi tháng</p>
                <p className="text-xl font-semibold text-purple-600">
                  {(() => {
                    const total = stats.revenueByMonth.reduce((sum, item) => sum + item.revenue, 0);
                    const average = total / stats.revenueByMonth.length;
                    return (average / 1000000).toFixed(1);
                  })()}M VND
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Health Details */}
      {systemHealth && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Trạng thái hệ thống</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                systemHealth.services.database === 'online' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <p className="text-sm font-medium">Cơ sở dữ liệu</p>
              <p className={`text-xs ${systemHealth.services.database === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                {systemHealth.services.database === 'online' ? 'Hoạt động' : 'Ngừng hoạt động'}
              </p>
            </div>

            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                systemHealth.services.booking === 'online' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <p className="text-sm font-medium">Đặt phòng</p>
              <p className={`text-xs ${systemHealth.services.booking === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                {systemHealth.services.booking === 'online' ? 'Hoạt động' : 'Ngừng hoạt động'}
              </p>
            </div>

            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                systemHealth.services.payment === 'online' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <p className="text-sm font-medium">Thanh toán</p>
              <p className={`text-xs ${systemHealth.services.payment === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                {systemHealth.services.payment === 'online' ? 'Hoạt động' : 'Ngừng hoạt động'}
              </p>
            </div>

            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                systemHealth.services.inventory === 'online' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <p className="text-sm font-medium">Tồn kho</p>
              <p className={`text-xs ${systemHealth.services.inventory === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                {systemHealth.services.inventory === 'online' ? 'Hoạt động' : 'Ngừng hoạt động'}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Cập nhật lần cuối: {new Date(systemHealth.lastChecked).toLocaleString('vi-VN')}
          </p>
        </div>
      )}
    </div>
  );
}
