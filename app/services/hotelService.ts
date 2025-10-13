import type {
  Hotel,
  CreateHotelRequest,
  ApiResponse,
  PaginatedResponse,
  User,
  Room,
  Booking,
  DashboardStats
} from '../types/database';
import { UserRole } from '../types/database';

// Hotel Service - Quản lý thông tin khách sạn
export interface HotelWithStats extends Hotel {
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  totalStaff: number;
  activeBookings: number;
  monthlyRevenue: number;
}

export interface HotelDashboardData {
  hotel: Hotel;
  stats: DashboardStats;
  recentBookings: Booking[];
  staffOnDuty: User[];
  roomsNeedAttention: Room[];
}

// Mock data
const mockHotels: Hotel[] = [
  {
    id: 1,
    name: "Khách sạn Sài Gòn Center",
    address: "123 Nguyễn Huệ, Quận 1",
    city: "Thành phố Hồ Chí Minh",
    country: "Việt Nam",
    phone: "028 3822 3344",
    email: "info@saigoncenter.com",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Khách sạn Hà Nội Riverside",
    address: "456 Lý Thường Kiệt, Hoàn Kiếm",
    city: "Hà Nội",
    country: "Việt Nam",
    phone: "024 3825 5566",
    email: "info@hanoiriverside.com",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

const mockUsers: User[] = [
  {
    id: 1,
    username: "admin",
    password_hash: "hashed_password",
    full_name: "Nguyễn Văn Admin",
    role: UserRole.ADMIN,
    email: "admin@hotel.com",
    phone: "0123456789",
    hire_date: "2024-01-01",
    hotel_id: 1,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    username: "manager1",
    password_hash: "hashed_password",
    full_name: "Trần Thị Manager",
    role: UserRole.MANAGER,
    email: "manager@hotel.com",
    phone: "0987654321",
    hire_date: "2024-01-01",
    hotel_id: 1,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export class HotelService {
  // Lấy danh sách khách sạn
  static async getHotels(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Hotel>> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/hotels?page=${page}&limit=${limit}`);
      // const data = await response.json();
      // return data;

      // Mock implementation
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedHotels = mockHotels.slice(startIndex, endIndex);

      return {
        success: true,
        data: paginatedHotels,
        pagination: {
          page,
          limit,
          total: mockHotels.length,
          totalPages: Math.ceil(mockHotels.length / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw new Error('Không thể tải danh sách khách sạn');
    }
  }

  // Lấy thông tin khách sạn theo ID
  static async getHotelById(id: number): Promise<Hotel> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
      // const data = await response.json();
      // return data.hotel;

      // Mock implementation
      const hotel = mockHotels.find(h => h.id === id);
      if (!hotel) throw new Error('Không tìm thấy khách sạn');

      return hotel;
    } catch (error) {
      console.error('Error fetching hotel:', error);
      throw new Error('Không thể tải thông tin khách sạn');
    }
  }

  // Lấy thông tin khách sạn với thống kê
  static async getHotelWithStats(id: number): Promise<HotelWithStats> {
    try {
      const hotel = await this.getHotelById(id);

      // Mock stats - trong thực tế sẽ lấy từ API
      return {
        ...hotel,
        totalRooms: 50,
        availableRooms: 35,
        occupiedRooms: 15,
        totalStaff: 25,
        activeBookings: 12,
        monthlyRevenue: 150000000
      };
    } catch (error) {
      console.error('Error fetching hotel with stats:', error);
      throw new Error('Không thể tải thông tin khách sạn');
    }
  }

  // Lấy dashboard data cho khách sạn
  static async getHotelDashboard(id: number): Promise<HotelDashboardData> {
    try {
      const hotel = await this.getHotelById(id);

      // Mock dashboard data
      return {
        hotel,
        stats: {
          totalBookings: 150,
          totalRevenue: 150000000,
          totalRooms: 50,
          totalCustomers: 120,
          occupancyRate: 75,
          averageBookingValue: 1000000,
          bookingsByStatus: {
            PENDING: 5,
            CONFIRMED: 12,
            CHECKED_IN: 8,
            CHECKED_OUT: 125,
            CANCELLED: 3,
            NO_SHOW: 2
          },
          revenueByMonth: [
            { month: '2024-01', revenue: 45000000 },
            { month: '2024-02', revenue: 52000000 },
            { month: '2024-03', revenue: 48000000 }
          ],
          topServices: [
            { service: 'Massage', bookings: 45, revenue: 22500000 },
            { service: 'Spa', bookings: 32, revenue: 16000000 },
            { service: 'Gym', bookings: 28, revenue: 8400000 }
          ]
        },
        recentBookings: [], // Mock data
        staffOnDuty: mockUsers.filter(u => u.hotel_id === id),
        roomsNeedAttention: [] // Mock data
      };
    } catch (error) {
      console.error('Error fetching hotel dashboard:', error);
      throw new Error('Không thể tải dữ liệu dashboard');
    }
  }

  // Tạo khách sạn mới
  static async createHotel(hotelData: CreateHotelRequest): Promise<Hotel> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/hotels`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(hotelData)
      // });
      // const data = await response.json();
      // return data.hotel;

      // Mock implementation
      const newHotel: Hotel = {
        id: Math.max(...mockHotels.map(h => h.id)) + 1,
        ...hotelData,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockHotels.push(newHotel);
      return newHotel;
    } catch (error) {
      console.error('Error creating hotel:', error);
      throw new Error('Không thể tạo khách sạn mới');
    }
  }

  // Cập nhật thông tin khách sạn
  static async updateHotel(id: number, hotelData: Partial<CreateHotelRequest>): Promise<Hotel> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/hotels/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(hotelData)
      // });
      // const data = await response.json();
      // return data.hotel;

      // Mock implementation
      const hotelIndex = mockHotels.findIndex(h => h.id === id);
      if (hotelIndex === -1) throw new Error('Không tìm thấy khách sạn');

      mockHotels[hotelIndex] = {
        ...mockHotels[hotelIndex],
        ...hotelData,
        updated_at: new Date().toISOString()
      };

      return mockHotels[hotelIndex];
    } catch (error) {
      console.error('Error updating hotel:', error);
      throw new Error('Không thể cập nhật thông tin khách sạn');
    }
  }

  // Xóa khách sạn
  static async deleteHotel(id: number): Promise<void> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // await fetch(`${API_BASE_URL}/hotels/${id}`, {
      //   method: 'DELETE'
      // });

      // Mock implementation
      const hotelIndex = mockHotels.findIndex(h => h.id === id);
      if (hotelIndex === -1) throw new Error('Không tìm thấy khách sạn');

      mockHotels.splice(hotelIndex, 1);
    } catch (error) {
      console.error('Error deleting hotel:', error);
      throw new Error('Không thể xóa khách sạn');
    }
  }

  // Lấy danh sách nhân viên của khách sạn
  static async getHotelStaff(hotelId: number): Promise<User[]> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/hotels/${hotelId}/staff`);
      // const data = await response.json();
      // return data.staff;

      // Mock implementation
      return mockUsers.filter(user => user.hotel_id === hotelId);
    } catch (error) {
      console.error('Error fetching hotel staff:', error);
      throw new Error('Không thể tải danh sách nhân viên');
    }
  }
}
