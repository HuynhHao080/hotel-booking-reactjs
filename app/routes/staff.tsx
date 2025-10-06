import { useState } from "react";
import { useUI } from "../contexts/UIContext";
import {
  Users, UserPlus, Edit, Trash, Search, Filter, Eye,
  Mail, Phone, MapPin, Calendar, Clock, Award,
  TrendingUp, Activity, Star, CheckCircle, AlertCircle,
  UserCheck, UserX, Shield, Briefcase, GraduationCap,
  Heart, Coffee, Dumbbell, Car, Wifi, Utensils
} from "lucide-react";

interface Staff {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
  performance: {
    rating: number;
    tasksCompleted: number;
    attendance: number;
  };
  skills: string[];
  avatar?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  workSchedule: {
    shift: string;
    days: string[];
    hours: string;
  };
}

export default function Staff() {
  const { isDark } = useUI();
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: 1,
      name: "Nguyễn Văn An",
      position: "Quản lý lễ tân",
      department: "Lễ tân",
      email: "an.nguyen@paradisehotel.com",
      phone: "0901234567",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      joinDate: "2023-01-15",
      salary: 15000000,
      status: "active",
      performance: {
        rating: 4.8,
        tasksCompleted: 245,
        attendance: 98
      },
      skills: ["Chăm sóc khách hàng", "Quản lý đặt phòng", "Tiếng Anh", "Xử lý khiếu nại"],
      avatar: "👨‍💼",
      emergencyContact: {
        name: "Nguyễn Thị Lan",
        phone: "0901234568",
        relationship: "Vợ"
      },
      workSchedule: {
        shift: "Ca sáng",
        days: ["T2", "T3", "T4", "T5", "T6"],
        hours: "7:00 - 15:00"
      }
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      position: "Nhân viên buồng phòng",
      department: "Buồng phòng",
      email: "binh.tran@paradisehotel.com",
      phone: "0902345678",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      joinDate: "2023-03-20",
      salary: 12000000,
      status: "active",
      performance: {
        rating: 4.6,
        tasksCompleted: 189,
        attendance: 95
      },
      skills: ["Dọn phòng", "Sắp xếp", "Kiểm tra thiết bị", "Báo cáo sự cố"],
      avatar: "👩‍🦰",
      emergencyContact: {
        name: "Trần Văn Minh",
        phone: "0902345679",
        relationship: "Chồng"
      },
      workSchedule: {
        shift: "Ca chiều",
        days: ["T2", "T3", "T4", "T5", "T6", "T7"],
        hours: "14:00 - 22:00"
      }
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      position: "Đầu bếp chính",
      department: "Nhà bếp",
      email: "cuong.le@paradisehotel.com",
      phone: "0903456789",
      address: "789 Đường DEF, Quận 3, TP.HCM",
      joinDate: "2022-11-10",
      salary: 18000000,
      status: "on-leave",
      performance: {
        rating: 4.9,
        tasksCompleted: 312,
        attendance: 92
      },
      skills: ["Nấu ăn", "Quản lý bếp", "Đào tạo", "Kiểm soát chất lượng"],
      avatar: "👨‍🍳",
      emergencyContact: {
        name: "Lê Thị Hoa",
        phone: "0903456790",
        relationship: "Vợ"
      },
      workSchedule: {
        shift: "Ca sáng",
        days: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        hours: "6:00 - 14:00"
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const departments = [...new Set(staff.map(s => s.department))];

  // Filter staff
  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || member.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || member.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-300';
      case 'inactive': return 'bg-red-100 text-red-700 border-red-300';
      case 'on-leave': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang làm việc';
      case 'inactive': return 'Nghỉ việc';
      case 'on-leave': return 'Nghỉ phép';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Lễ tân': return UserCheck;
      case 'Buồng phòng': return Users;
      case 'Nhà bếp': return Utensils;
      case 'Bảo vệ': return Shield;
      case 'Kỹ thuật': return Activity;
      default: return Users;
    }
  };

  // Statistics
  const totalStaff = staff.length;
  const activeStaff = staff.filter(s => s.status === 'active').length;
  const onLeaveStaff = staff.filter(s => s.status === 'on-leave').length;
  const avgPerformance = staff.reduce((sum, s) => sum + s.performance.rating, 0) / staff.length;

  const StaffDetailsModal = ({ staffMember, onClose }: { staffMember: Staff; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}>
        <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#4b2e1e]'}`}>
              Thông tin nhân viên
            </h2>
            <button onClick={onClose} className={`transition-colors duration-300 ${
              isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
            }`}>
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{staffMember.avatar}</div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#4b2e1e]'}`}>
                    {staffMember.name}
                  </h3>
                  <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {staffMember.position}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(staffMember.status)}`}>
                    {getStatusText(staffMember.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-700/50' : 'bg-[#f8f1e9]'}`}>
                  <Mail className={`h-6 w-6 mb-2 ${isDark ? 'text-blue-400' : 'text-[#b68d40]'}`} />
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Email
                  </p>
                  <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {staffMember.email}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-700/50' : 'bg-[#f3e5d0]'}`}>
                  <Phone className={`h-6 w-6 mb-2 ${isDark ? 'text-blue-400' : 'text-[#b68d40]'}`} />
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Điện thoại
                  </p>
                  <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {staffMember.phone}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-700/50' : 'bg-[#e6d2aa]'}`}>
                  <MapPin className={`h-6 w-6 mb-2 ${isDark ? 'text-blue-400' : 'text-[#b68d40]'}`} />
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Địa chỉ
                  </p>
                  <p className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {staffMember.address}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-700/50' : 'bg-[#d2b48c]'}`}>
                  <Calendar className={`h-6 w-6 mb-2 ${isDark ? 'text-blue-400' : 'text-white'}`} />
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-white/80'}`}>
                    Ngày gia nhập
                  </p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-white'}`}>
                    {formatDate(staffMember.joinDate)}
                  </p>
                </div>
              </div>

              <div>
                <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#4b2e1e]'}`}>
                  Kỹ năng chuyên môn
                </h4>
                <div className="flex flex-wrap gap-2">
                  {staffMember.skills.map((skill, index) => (
                    <span key={index} className={`px-3 py-2 rounded-full text-sm ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-[#f3e5d0] text-gray-700'
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance & Schedule */}
            <div className="space-y-6">
              <div className={`p-6 rounded-3xl ${isDark ? 'bg-gray-700/50' : 'bg-[#f8f1e9]'}`}>
                <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#4b2e1e]'}`}>
                  Hiệu suất làm việc
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Đánh giá
                      </span>
                    </div>
                    <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {staffMember.performance.rating}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Nhiệm vụ hoàn thành
                      </span>
                    </div>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {staffMember.performance.tasksCompleted}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 text-blue-500 mr-2" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Tỷ lệ chuyên cần
                      </span>
                    </div>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {staffMember.performance.attendance}%
                    </span>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-3xl ${isDark ? 'bg-gray-700/50' : 'bg-[#f3e5d0]'}`}>
                <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#4b2e1e]'}`}>
                  Lịch làm việc
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Ca làm việc
                    </p>
                    <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                      {staffMember.workSchedule.shift}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Giờ làm việc
                    </p>
                    <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                      {staffMember.workSchedule.hours}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Ngày làm việc
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {staffMember.workSchedule.days.map(day => (
                        <span key={day} className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isDark ? 'bg-gray-600 text-gray-300' : 'bg-white text-gray-700'
                        }`}>
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-3xl ${isDark ? 'bg-gray-700/50' : 'bg-[#e6d2aa]'}`}>
                <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#4b2e1e]'}`}>
                  Liên hệ khẩn cấp
                </h4>
                <div className="space-y-2">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Họ tên
                    </p>
                    <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                      {staffMember.emergencyContact.name}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Điện thoại
                    </p>
                    <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                      {staffMember.emergencyContact.phone}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Quan hệ
                    </p>
                    <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                      {staffMember.emergencyContact.relationship}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 p-6 md:p-12 font-sans ${
      isDark
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-b from-[#fdfaf6] to-[#f4ede4] text-[#4b2e1e]'
    }`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Users className={`h-10 w-10 ${isDark ? 'text-blue-400' : 'text-[#b68d40]'}`} />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Quản lý Nhân viên</h1>
            <p className={`text-lg mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Theo dõi và quản lý đội ngũ nhân viên chuyên nghiệp
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4">
          <div className={`backdrop-blur-md rounded-2xl shadow-lg p-4 text-center min-w-[120px] transition-colors duration-300 ${
            isDark ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90'
          }`}>
            <p className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-[#b68d40]'}`}>
              {totalStaff}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Tổng nhân viên
            </p>
          </div>
          <div className={`backdrop-blur-md rounded-2xl shadow-lg p-4 text-center min-w-[120px] transition-colors duration-300 ${
            isDark ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90'
          }`}>
            <p className="text-2xl font-bold text-green-600">{activeStaff}</p>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Đang làm việc
            </p>
          </div>
          <div className={`backdrop-blur-md rounded-2xl shadow-lg p-4 text-center min-w-[120px] transition-colors duration-300 ${
            isDark ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90'
          }`}>
            <p className="text-2xl font-bold text-yellow-600">{onLeaveStaff}</p>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Nghỉ phép
            </p>
          </div>
          <div className={`backdrop-blur-md rounded-2xl shadow-lg p-4 text-center min-w-[120px] transition-colors duration-300 ${
            isDark ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90'
          }`}>
            <p className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {avgPerformance.toFixed(1)}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Đánh giá TB
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`backdrop-blur-md rounded-3xl shadow-lg p-6 mb-6 transition-colors duration-300 ${
        isDark ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90'
      }`}>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
              isDark ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#caa968] transition-colors duration-300 ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white/70 border-[#d3b98e] text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className={`px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#caa968] transition-colors duration-300 ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white/70 border-[#d3b98e] text-gray-900'
            }`}
          >
            <option value="all">Tất cả phòng ban</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#caa968] transition-colors duration-300 ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white/70 border-[#d3b98e] text-gray-900'
            }`}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang làm việc</option>
            <option value="inactive">Nghỉ việc</option>
            <option value="on-leave">Nghỉ phép</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-[#caa968] to-[#e4cfa3] text-[#4b2e1e] font-semibold rounded-2xl shadow-md hover:shadow-xl hover:from-[#b68d40] hover:to-[#d6b77a] transition-all duration-300"
          >
            <UserPlus className="mr-2 h-5 w-5" /> Thêm nhân viên
          </button>
        </div>
      </div>

      {/* Staff Cards */}
      {filteredStaff.length === 0 ? (
        <div className="text-center py-12">
          <Users className={`mx-auto h-12 w-12 mb-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
            Không tìm thấy nhân viên nào
          </p>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
            Hãy thêm nhân viên mới hoặc điều chỉnh bộ lọc
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member, i) => {
            const DeptIcon = getDepartmentIcon(member.department);
            return (
              <div
                key={member.id}
                className={`backdrop-blur-md rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp ${
                  isDark ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Header */}
                <div className="relative p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{member.avatar}</div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {getStatusText(member.status)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <DeptIcon className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#b68d40]'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {member.department}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-[#4b2e1e]'}`}>
                    {member.name}
                  </h3>
                  <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.position}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                        {member.performance.rating}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Lương
                      </p>
                      <p className={`font-bold ${isDark ? 'text-blue-400' : 'text-[#b68d40]'}`}>
                        {formatCurrency(member.salary)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="px-6 pb-4">
                  <div className={`flex justify-between text-xs mb-1 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <span>Hiệu suất</span>
                    <span>{member.performance.tasksCompleted} nhiệm vụ</span>
                  </div>
                  <div className={`rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="bg-gradient-to-r from-[#caa968] to-[#b68d40] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(member.performance.tasksCompleted / 300) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Skills */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className={`px-2 py-1 rounded-full text-xs ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-[#f3e5d0] text-gray-700'
                      }`}>
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                      }`}>
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedStaff(member);
                      setShowDetailsModal(true);
                    }}
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-xl transition-colors ${
                      isDark
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-[#f3e5d0] text-[#4b2e1e] hover:bg-[#e6d2aa]'
                    }`}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Chi tiết
                  </button>
                  <button className={`flex items-center justify-center px-3 py-2 rounded-xl transition-colors ${
                    isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-[#caa968] text-white hover:bg-[#b68d40]'
                  }`}>
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className={`flex items-center justify-center px-3 py-2 rounded-xl transition-colors ${
                    isDark ? 'bg-red-900/50 text-red-300 hover:bg-red-800/50' : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}>
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {showDetailsModal && selectedStaff && (
        <StaffDetailsModal
          staffMember={selectedStaff}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedStaff(null);
          }}
        />
      )}

      {/* CSS Animation */}
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
