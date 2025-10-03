import { useState } from "react";
import { 
  FileText, Download, Filter, BarChart3, TrendingUp, 
  Calendar, Users, DollarSign, Bed, Activity,
  PieChart, LineChart, ArrowUp, ArrowDown, Eye,
  RefreshCw
} from "lucide-react";

interface ReportData {
  revenue: {
    total: number;
    monthly: number[];
    growth: number;
  };
  occupancy: {
    rate: number;
    totalRooms: number;
    occupiedRooms: number;
    growth: number;
  };
  bookings: {
    total: number;
    confirmed: number;
    cancelled: number;
    pending: number;
    growth: number;
  };
  customers: {
    total: number;
    new: number;
    returning: number;
    satisfaction: number;
  };
}

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReportType, setSelectedReportType] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app this would come from API
  const reportData: ReportData = {
    revenue: {
      total: 125000000,
      monthly: [85000000, 95000000, 110000000, 125000000],
      growth: 15.2
    },
    occupancy: {
      rate: 78.5,
      totalRooms: 50,
      occupiedRooms: 39,
      growth: 5.8
    },
    bookings: {
      total: 245,
      confirmed: 198,
      cancelled: 12,
      pending: 35,
      growth: 8.3
    },
    customers: {
      total: 189,
      new: 45,
      returning: 144,
      satisfaction: 4.6
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

  const handleExportReport = async (format: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    // In real app, this would trigger download
    console.log(`Exporting report as ${format}`);
  };

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const MetricCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    trend, 
    color = "blue" 
  }: { 
    title: string; 
    value: string; 
    subtitle: string; 
    icon: any; 
    trend: number; 
    color?: string;
  }) => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${
          color === 'green' ? 'bg-green-100 text-green-600' :
          color === 'red' ? 'bg-red-100 text-red-600' :
          color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
          'bg-blue-100 text-blue-600'
        }`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-[#4b2e1e] mb-1">{value}</h3>
      <p className="text-gray-600 text-sm mb-2">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );

  const ChartPlaceholder = ({ title, height = "h-64" }: { title: string; height?: string }) => (
    <div className={`${height} bg-gradient-to-br from-[#f3e5d0] to-[#fdf8f3] rounded-2xl flex items-center justify-center border border-dashed border-[#d3b98e]/70`}>
      <div className="text-center">
        <BarChart3 className="mx-auto h-8 w-8 text-[#b68d40] mb-2" />
        <span className="text-[#6e4b33]/60 font-medium text-sm">{title}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-[#f4ede4] text-[#4b2e1e] p-6 md:p-12 font-sans">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <FileText className="h-10 w-10 text-[#b68d40]" />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Báo cáo & Phân tích</h1>
            <p className="text-lg text-gray-700 mt-1">
              Theo dõi hiệu suất và phân tích dữ liệu kinh doanh
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-white/90 text-[#4b2e1e] rounded-2xl hover:bg-white transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Làm mới
          </button>
          <button className="flex items-center px-4 py-2 bg-[#d2b48c] text-white rounded-2xl hover:bg-[#c9a978] transition-all duration-300">
            <Filter className="mr-2 h-4 w-4" /> Lọc
          </button>
          <button 
            onClick={() => handleExportReport('pdf')}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-[#e6d2aa] text-[#4b2e1e] rounded-2xl hover:bg-[#d2b48c] transition-all duration-300 disabled:opacity-50"
          >
            <Download className="mr-2 h-4 w-4" /> Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#b68d40]" />
            <span className="font-medium">Thời gian:</span>
          </div>
          <div className="flex gap-2">
            {[
              { key: "week", label: "Tuần này" },
              { key: "month", label: "Tháng này" },
              { key: "quarter", label: "Quý này" },
              { key: "year", label: "Năm nay" }
            ].map(period => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key)}
                className={`px-4 py-2 rounded-2xl transition-all duration-300 ${
                  selectedPeriod === period.key
                    ? 'bg-[#caa968] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Doanh thu"
          value={formatCurrency(reportData.revenue.total)}
          subtitle="Tổng doanh thu"
          icon={DollarSign}
          trend={reportData.revenue.growth}
          color="green"
        />
        <MetricCard
          title="Tỷ lệ lấp đầy"
          value={formatPercentage(reportData.occupancy.rate)}
          subtitle={`${reportData.occupancy.occupiedRooms}/${reportData.occupancy.totalRooms} phòng`}
          icon={Bed}
          trend={reportData.occupancy.growth}
          color="blue"
        />
        <MetricCard
          title="Đặt phòng"
          value={reportData.bookings.total.toString()}
          subtitle={`${reportData.bookings.confirmed} đã xác nhận`}
          icon={Calendar}
          trend={reportData.bookings.growth}
          color="yellow"
        />
        <MetricCard
          title="Khách hàng"
          value={reportData.customers.total.toString()}
          subtitle={`${reportData.customers.new} khách mới`}
          icon={Users}
          trend={12.5}
          color="red"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#4b2e1e]">Doanh thu theo tháng</h3>
              <p className="text-gray-600 text-sm">Biểu đồ cột thể hiện doanh thu hàng tháng</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <BarChart3 className="h-5 w-5 text-[#b68d40]" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <LineChart className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <ChartPlaceholder title="Biểu đồ doanh thu" height="h-64" />
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#4b2e1e]">Tỷ lệ lấp đầy</h3>
              <p className="text-gray-600 text-sm">Biểu đồ tròn thể hiện trạng thái phòng</p>
            </div>
            <PieChart className="h-8 w-8 text-[#b68d40]" />
          </div>
          <ChartPlaceholder title="Biểu đồ tỷ lệ lấp đầy" height="h-64" />
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#4b2e1e]">Báo cáo chi tiết</h3>
          <div className="flex gap-2">
            {[
              { key: "overview", label: "Tổng quan" },
              { key: "revenue", label: "Doanh thu" },
              { key: "occupancy", label: "Lấp đầy" },
              { key: "customers", label: "Khách hàng" }
            ].map(type => (
              <button
                key={type.key}
                onClick={() => setSelectedReportType(type.key)}
                className={`px-4 py-2 rounded-2xl text-sm transition-all duration-300 ${
                  selectedReportType === type.key
                    ? 'bg-[#caa968] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Report Content */}
        <div className="space-y-6">
          {selectedReportType === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#f8f1e9] p-4 rounded-2xl">
                <h4 className="font-semibold text-[#4b2e1e] mb-3">Hiệu suất hoạt động</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tỷ lệ hài lòng:</span>
                    <span className="font-medium">{reportData.customers.satisfaction}/5 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tỷ lệ hủy:</span>
                    <span className="font-medium">{formatPercentage((reportData.bookings.cancelled / reportData.bookings.total) * 100)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doanh thu trung bình/phòng:</span>
                    <span className="font-medium">{formatCurrency(reportData.revenue.total / reportData.occupancy.totalRooms)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#f3e5d0] p-4 rounded-2xl">
                <h4 className="font-semibold text-[#4b2e1e] mb-3">Xu hướng</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                    <span>Doanh thu tăng {formatPercentage(reportData.revenue.growth)}</span>
                  </div>
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Lấp đầy tăng {formatPercentage(reportData.occupancy.growth)}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Khách hàng mới tăng 12.5%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#e6d2aa] p-4 rounded-2xl">
                <h4 className="font-semibold text-[#4b2e1e] mb-3">Cảnh báo</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    <span>5 phòng cần bảo trì</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    <span>3 đặt phòng chờ xác nhận</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>2 khách hàng phàn nàn</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedReportType === "revenue" && (
            <ChartPlaceholder title="Báo cáo chi tiết doanh thu" height="h-96" />
          )}

          {selectedReportType === "occupancy" && (
            <ChartPlaceholder title="Báo cáo chi tiết tỷ lệ lấp đầy" height="h-96" />
          )}

          {selectedReportType === "customers" && (
            <ChartPlaceholder title="Báo cáo chi tiết khách hàng" height="h-96" />
          )}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}
