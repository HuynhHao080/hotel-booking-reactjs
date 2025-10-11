import { useState, useEffect } from "react";
import { useUI } from "../contexts/UIContext";
import LoadingAnimation from "../components/LoadingAnimation";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  Home,
  Download,
  Filter,
  RefreshCw,
  Eye,
  EyeOff,
  Activity,
  Target,
  Award,
} from "lucide-react";

interface BookingReport {
  period: string;
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  occupancyRate: number;
  newCustomers: number;
  returningCustomers: number;
}

interface ChartData {
  month: string;
  bookings: number;
  revenue: number;
  occupancy: number;
}

export default function BookingReports() {
  const { isDark } = useUI();
  const [reports, setReports] = useState<BookingReport[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<string>("6months");
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    loadReports();
  }, [timeRange]);

  const loadReports = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockReports: BookingReport[] = [
        {
          period: "Tháng 1/2024",
          totalBookings: 245,
          confirmedBookings: 220,
          cancelledBookings: 25,
          totalRevenue: 125000000,
          averageBookingValue: 510000,
          occupancyRate: 78.5,
          newCustomers: 180,
          returningCustomers: 65
        },
        {
          period: "Tháng 12/2023",
          totalBookings: 198,
          confirmedBookings: 175,
          cancelledBookings: 23,
          totalRevenue: 98000000,
          averageBookingValue: 495000,
          occupancyRate: 72.3,
          newCustomers: 145,
          returningCustomers: 53
        },
        {
          period: "Tháng 11/2023",
          totalBookings: 167,
          confirmedBookings: 152,
          cancelledBookings: 15,
          totalRevenue: 85000000,
          averageBookingValue: 509000,
          occupancyRate: 68.7,
          newCustomers: 125,
          returningCustomers: 42
        }
      ];

      const mockChartData: ChartData[] = [
        { month: "Tháng 7", bookings: 145, revenue: 72000000, occupancy: 65.2 },
        { month: "Tháng 8", bookings: 167, revenue: 85000000, occupancy: 68.7 },
        { month: "Tháng 9", bookings: 189, revenue: 94000000, occupancy: 71.3 },
        { month: "Tháng 10", bookings: 203, revenue: 102000000, occupancy: 74.8 },
        { month: "Tháng 11", bookings: 167, revenue: 85000000, occupancy: 68.7 },
        { month: "Tháng 12", bookings: 198, revenue: 98000000, occupancy: 72.3 },
        { month: "Tháng 1", bookings: 245, revenue: 125000000, occupancy: 78.5 }
      ];

      setReports(mockReports);
      setChartData(mockChartData);
    } catch (error) {
      console.error("Error loading reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (current < previous) {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) {
      return "text-green-600";
    } else if (current < previous) {
      return "text-red-600";
    }
    return "text-gray-600";
  };

  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const currentReport = reports[0];
  const previousReport = reports[1];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingAnimation size="lg" color="orange" text="Đang tải báo cáo đặt phòng..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Báo cáo đặt phòng
        </h1>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="1month">1 tháng</option>
            <option value="3months">3 tháng</option>
            <option value="6months">6 tháng</option>
            <option value="1year">1 năm</option>
          </select>

          <button
            onClick={() => setShowChart(!showChart)}
            className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center"
          >
            {showChart ? <EyeOff className="h-5 w-5 mr-2" /> : <Eye className="h-5 w-5 mr-2" />}
            {showChart ? "Ẩn biểu đồ" : "Hiện biểu đồ"}
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng đặt phòng</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {currentReport?.totalBookings.toLocaleString() || 0}
              </p>
              {previousReport && (
                <div className={`flex items-center text-sm ${getTrendColor(currentReport.totalBookings, previousReport.totalBookings)}`}>
                  {getTrendIcon(currentReport.totalBookings, previousReport.totalBookings)}
                  <span className="ml-1">
                    {formatPercentage(Math.abs(calculateTrend(currentReport.totalBookings, previousReport.totalBookings)))} so với tháng trước
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng doanh thu</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(currentReport?.totalRevenue || 0)}
              </p>
              {previousReport && (
                <div className={`flex items-center text-sm ${getTrendColor(currentReport.totalRevenue, previousReport.totalRevenue)}`}>
                  {getTrendIcon(currentReport.totalRevenue, previousReport.totalRevenue)}
                  <span className="ml-1">
                    {formatPercentage(Math.abs(calculateTrend(currentReport.totalRevenue, previousReport.totalRevenue)))} so với tháng trước
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Home className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tỷ lệ lấp đầy</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {formatPercentage(currentReport?.occupancyRate || 0)}
              </p>
              {previousReport && (
                <div className={`flex items-center text-sm ${getTrendColor(currentReport.occupancyRate, previousReport.occupancyRate)}`}>
                  {getTrendIcon(currentReport.occupancyRate, previousReport.occupancyRate)}
                  <span className="ml-1">
                    {formatPercentage(Math.abs(calculateTrend(currentReport.occupancyRate, previousReport.occupancyRate)))} so với tháng trước
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Khách hàng mới</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {currentReport?.newCustomers.toLocaleString() || 0}
              </p>
              {previousReport && (
                <div className={`flex items-center text-sm ${getTrendColor(currentReport.newCustomers, previousReport.newCustomers)}`}>
                  {getTrendIcon(currentReport.newCustomers, previousReport.newCustomers)}
                  <span className="ml-1">
                    {formatPercentage(Math.abs(calculateTrend(currentReport.newCustomers, previousReport.newCustomers)))} so với tháng trước
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      {showChart && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Biểu đồ thống kê 7 tháng gần nhất
          </h3>

          <div className="space-y-6">
            {/* Simple Bar Chart Simulation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Đặt phòng</span>
                <span className="text-gray-600 dark:text-gray-400">Doanh thu (VNĐ)</span>
                <span className="text-gray-600 dark:text-gray-400">Tỷ lệ lấp đầy (%)</span>
              </div>

              {chartData.map((data, index) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-900 dark:text-white">
                    <span>{data.month}</span>
                    <span>{data.bookings} đặt phòng</span>
                    <span>{formatCurrency(data.revenue)}</span>
                    <span>{formatPercentage(data.occupancy)}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Đặt phòng</span>
                        <span>{data.bookings}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(data.bookings / Math.max(...chartData.map(d => d.bookings))) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Doanh thu</span>
                        <span>{formatCurrency(data.revenue)}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(data.revenue / Math.max(...chartData.map(d => d.revenue))) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Lấp đầy</span>
                        <span>{formatPercentage(data.occupancy)}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${data.occupancy}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Reports Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Chi tiết báo cáo theo tháng
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tháng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Đặt phòng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Xác nhận
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Hủy bỏ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Doanh thu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  TB/Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Lấp đầy
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {reports.map((report, index) => (
                <tr key={report.period} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {report.period}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {report.totalBookings.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {report.confirmedBookings.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-red-600 dark:text-red-400">
                      {report.cancelledBookings.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(report.totalRevenue)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatCurrency(report.averageBookingValue)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900 dark:text-white mr-2">
                        {formatPercentage(report.occupancyRate)}
                      </div>
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${report.occupancyRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Tỷ lệ chuyển đổi
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Đặt phòng → Xác nhận</span>
              <span className="text-sm font-medium text-green-600">
                {currentReport ? formatPercentage((currentReport.confirmedBookings / currentReport.totalBookings) * 100) : '0%'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Đặt phòng → Hủy bỏ</span>
              <span className="text-sm font-medium text-red-600">
                {currentReport ? formatPercentage((currentReport.cancelledBookings / currentReport.totalBookings) * 100) : '0%'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Phân loại khách hàng
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Khách hàng mới</span>
              <span className="text-sm font-medium text-blue-600">
                {currentReport?.newCustomers.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Khách hàng quay lại</span>
              <span className="text-sm font-medium text-green-600">
                {currentReport?.returningCustomers.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Hiệu suất kinh doanh
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Doanh thu trung bình/ngày</span>
              <span className="text-sm font-medium text-purple-600">
                {currentReport ? formatCurrency(currentReport.totalRevenue / 30) : formatCurrency(0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Đặt phòng trung bình/ngày</span>
              <span className="text-sm font-medium text-orange-600">
                {currentReport ? Math.round(currentReport.totalBookings / 30).toLocaleString() : '0'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
