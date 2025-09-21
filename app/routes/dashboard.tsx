"use client";

import StatsCard from "../components/StatsCard";
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
} from "recharts";

export default function Dashboard() {
  // Dữ liệu mẫu
  const data = [
    { month: "Jan", bookings: 120, revenue: 12000 },
    { month: "Feb", bookings: 160, revenue: 18000 },
    { month: "Mar", bookings: 140, revenue: 15000 },
    { month: "Apr", bookings: 200, revenue: 22000 },
    { month: "May", bookings: 260, revenue: 30000 },
    { month: "Jun", bookings: 240, revenue: 28000 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Tổng quan tình hình hoạt động khách sạn 📊
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Bookings" value="1,234" color="bg-blue-500" />
        <StatsCard title="Occupancy Rate" value="85%" color="bg-yellow-500" />
        <StatsCard title="Total Revenue" value="$120,500" color="bg-green-500" />
        <StatsCard title="Available Rooms" value="56" color="bg-purple-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Biểu đồ Bar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Số lượng đặt phòng theo tháng
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="bookings"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                name="Bookings"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Line */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Doanh thu theo tháng
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 6 }}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
