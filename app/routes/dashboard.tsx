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
import { Calendar, DollarSign, BedDouble, Users } from "lucide-react";

export default function Dashboard() {
  const data = [
    { month: "Jan", bookings: 120, revenue: 12000 },
    { month: "Feb", bookings: 160, revenue: 18000 },
    { month: "Mar", bookings: 140, revenue: 15000 },
    { month: "Apr", bookings: 200, revenue: 22000 },
    { month: "May", bookings: 260, revenue: 30000 },
    { month: "Jun", bookings: 240, revenue: 28000 },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#f8f1e9] to-[#fff]">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-[#5a3e2b]">
          📊 Dashboard
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Tổng quan hoạt động khách sạn
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard
          title="Total Bookings"
          value="1,234"
          color="from-blue-400 to-blue-600"
          icon={<Calendar className="w-6 h-6" />}
        />
        <StatsCard
          title="Occupancy Rate"
          value="85%"
          color="from-yellow-400 to-yellow-600"
          icon={<Users className="w-6 h-6" />}
        />
        <StatsCard
          title="Total Revenue"
          value="$120,500"
          color="from-green-400 to-green-600"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <StatsCard
          title="Available Rooms"
          value="56"
          color="from-purple-400 to-purple-600"
          icon={<BedDouble className="w-6 h-6" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Biểu đồ Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-[#5a3e2b] mb-4">
            Số lượng đặt phòng theo tháng
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="bookings"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
                name="Bookings"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Line */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-[#5a3e2b] mb-4">
            Doanh thu theo tháng
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
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
                activeDot={{ r: 8 }}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
