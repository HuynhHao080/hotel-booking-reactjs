"use client";

import { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import { useUI } from "../contexts/UIContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Bed,
  Wifi,
  Car,
  Utensils,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
  Star,
} from "lucide-react";

export default function Dashboard() {
  const { isDark } = useUI();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedValues, setAnimatedValues] = useState({
    bookings: 0,
    revenue: 0,
    occupancy: 0,
    rooms: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Dữ liệu mẫu mở rộng
  const monthlyData = [
    { month: "Jan", bookings: 120, revenue: 12000, occupancy: 75 },
    { month: "Feb", bookings: 160, revenue: 18000, occupancy: 82 },
    { month: "Mar", bookings: 140, revenue: 15000, occupancy: 78 },
    { month: "Apr", bookings: 200, revenue: 22000, occupancy: 88 },
    { month: "May", bookings: 260, revenue: 30000, occupancy: 92 },
    { month: "Jun", bookings: 240, revenue: 28000, occupancy: 85 },
  ];

  const roomTypeData = [
    { name: "Standard", value: 45, color: "#3b82f6" },
    { name: "Deluxe", value: 30, color: "#10b981" },
    { name: "Suite", value: 15, color: "#f59e0b" },
    { name: "Presidential", value: 10, color: "#ef4444" },
  ];

  const serviceData = [
    { service: "WiFi", usage: 95 },
    { service: "Parking", usage: 78 },
    { service: "Restaurant", usage: 65 },
    { service: "Spa", usage: 45 },
    { service: "Gym", usage: 32 },
  ];

  const recentBookings = [
    { id: "#1234", guest: "Nguyễn Văn A", room: "201", status: "confirmed", amount: "$250" },
    { id: "#1235", guest: "Trần Thị B", room: "305", status: "pending", amount: "$180" },
    { id: "#1236", guest: "Lê Văn C", room: "102", status: "checked-in", amount: "$320" },
    { id: "#1237", guest: "Phạm Thị D", room: "401", status: "cancelled", amount: "$200" },
  ];

  const targetValues = {
    bookings: 1234,
    revenue: 120500,
    occupancy: 85,
    rooms: 56,
  };

  // Animation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const animateValues = () => {
      setAnimatedValues(prev => ({
        bookings: Math.min(prev.bookings + 50, targetValues.bookings),
        revenue: Math.min(prev.revenue + 5000, targetValues.revenue),
        occupancy: Math.min(prev.occupancy + 3, targetValues.occupancy),
        rooms: Math.min(prev.rooms + 2, targetValues.rooms),
      }));
    };

    const animationTimer = setInterval(animateValues, 100);

    return () => {
      clearInterval(timer);
      clearInterval(animationTimer);
    };
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-[#f8f1e9] to-[#fff] text-gray-900'
    }`}>
      {/* Header Section */}
      <div className={`p-6 border-b transition-colors duration-300 ${
        isDark ? 'border-gray-700 bg-gray-800' : 'border-[#c9a978]/20 bg-white/80'
      }`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">🏨 Hotel Management Dashboard</h1>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Tổng quan hoạt động - {currentTime.toLocaleDateString('vi-VN')}
            </p>
          </div>
          <div className={`text-right ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className="text-2xl font-mono font-bold">{formatTime(currentTime)}</div>
            <div className="text-sm">Cập nhật liên tục</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Live Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-[#c9a978]/20'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tổng đặt phòng
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {animatedValues.bookings.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+12.5%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-[#c9a978]/20'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tỷ lệ lấp đầy
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {animatedValues.occupancy}%
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+5.2%</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Activity className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-[#c9a978]/20'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tổng doanh thu
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(animatedValues.revenue)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+18.7%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-[#c9a978]/20'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Phòng trống
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {animatedValues.rooms}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">-3.1%</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Bed className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className={`xl:col-span-2 p-6 rounded-xl shadow-lg transition-colors duration-300 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-[#c9a978]/20'
          }`}>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-green-500" />
              Doanh thu & Đặt phòng theo tháng
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="month" stroke={isDark ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Doanh thu (VNĐ)"
                />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorBookings)"
                  name="Đặt phòng"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Room Types Pie Chart */}
          <div className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-[#c9a978]/20'
          }`}>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Bed className="h-6 w-6 mr-2 text-purple-500" />
              Phân bố loại phòng
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Usage & Recent Bookings */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Service Usage */}
          <div className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-[#c9a978]/20'
          }`}>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Wifi className="h-6 w-6 mr-2 text-blue-500" />
              Tỷ lệ sử dụng dịch vụ
            </h3>
            <div className="space-y-4">
              {serviceData.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      service.service === 'WiFi' ? 'bg-blue-500' :
                      service.service === 'Parking' ? 'bg-green-500' :
                      service.service === 'Restaurant' ? 'bg-yellow-500' :
                      service.service === 'Spa' ? 'bg-purple-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="font-medium">{service.service}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                      <div
                        className={`h-2 rounded-full ${
                          service.service === 'WiFi' ? 'bg-blue-500' :
                          service.service === 'Parking' ? 'bg-green-500' :
                          service.service === 'Restaurant' ? 'bg-yellow-500' :
                          service.service === 'Spa' ? 'bg-purple-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${service.usage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold w-10 text-right">{service.usage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-[#c9a978]/20'
          }`}>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-orange-500" />
              Đặt phòng gần đây
            </h3>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className={`p-3 rounded-lg border transition-colors duration-300 ${
                  isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <span className="font-bold text-sm">{booking.id}</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          booking.status === 'checked-in' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {booking.status === 'confirmed' ? 'Đã xác nhận' :
                           booking.status === 'pending' ? 'Chờ xử lý' :
                           booking.status === 'checked-in' ? 'Đã nhận phòng' :
                           'Đã hủy'}
                        </span>
                      </div>
                      <p className="text-sm font-medium mt-1">{booking.guest}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Phòng {booking.room}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{booking.amount}</p>
                      <div className="flex items-center mt-1">
                        {booking.status === 'confirmed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {booking.status === 'pending' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                        {booking.status === 'cancelled' && <AlertCircle className="h-4 w-4 text-red-500" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-[#c9a978]/20'
        }`}>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-500" />
            Hành động nhanh
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 transform hover:scale-105 flex flex-col items-center">
              <Users className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Thêm khách</span>
            </button>
            <button className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 transform hover:scale-105 flex flex-col items-center">
              <Bed className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Check-in</span>
            </button>
            <button className="p-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-300 transform hover:scale-105 flex flex-col items-center">
              <Calendar className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Đặt phòng</span>
            </button>
            <button className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300 transform hover:scale-105 flex flex-col items-center">
              <DollarSign className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Thanh toán</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
