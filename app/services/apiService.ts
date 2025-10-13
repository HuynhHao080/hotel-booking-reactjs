import type {
  ApiResponse,
  PaginatedResponse,
  DashboardStats,
  BookingReport,
  InventoryReport
} from '../types/database';
import { BookingService } from './bookingService';
import { HotelService } from './hotelService';
import { CustomerService } from './customerService';

// Centralized API Service - Tổng hợp tất cả các service calls
export interface SystemHealth {
  status: 'healthy' | 'warning' | 'error';
  services: {
    database: 'online' | 'offline';
    booking: 'online' | 'offline';
    payment: 'online' | 'offline';
    inventory: 'online' | 'offline';
  };
  lastChecked: string;
}

export interface NotificationItem {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export class ApiService {
  // System Health Check
  static async getSystemHealth(): Promise<SystemHealth> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/health`);
      // const data = await response.json();
      // return data;

      // Mock implementation
      return {
        status: 'healthy',
        services: {
          database: 'online',
          booking: 'online',
          payment: 'online',
          inventory: 'online'
        },
        lastChecked: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error checking system health:', error);
      return {
        status: 'error',
        services: {
          database: 'offline',
          booking: 'offline',
          payment: 'offline',
          inventory: 'offline'
        },
        lastChecked: new Date().toISOString()
      };
    }
  }

  // Dashboard tổng hợp
  static async getDashboardData(hotelId?: number): Promise<{
    stats: DashboardStats;
    recentBookings: any[];
    notifications: NotificationItem[];
    systemHealth: SystemHealth;
  }> {
    try {
      // Lấy dữ liệu từ các service khác nhau
      const [revenueData, customersData, systemHealth] = await Promise.all([
        BookingService.getRevenue('2024-01-01', '2024-12-31'),
        CustomerService.getCustomerStats(),
        this.getSystemHealth()
      ]);

      // Mock dashboard data tổng hợp
      const dashboardData = {
        stats: {
          totalBookings: 150,
          totalRevenue: revenueData.totalRevenue,
          totalRooms: 50,
          totalCustomers: customersData.totalCustomers,
          occupancyRate: 75,
          averageBookingValue: revenueData.averageBookingValue,
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
        recentBookings: [], // Từ BookingService
        notifications: [
          {
            id: '1',
            type: 'warning' as const,
            title: 'Phòng cần bảo trì',
            message: 'Phòng 301 cần bảo trì định kỳ',
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: '/rooms/301'
          },
          {
            id: '2',
            type: 'info' as const,
            title: 'Đặt phòng mới',
            message: 'Có 3 đặt phòng mới trong hôm nay',
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: '/bookings'
          },
          {
            id: '3',
            type: 'success' as const,
            title: 'Thanh toán thành công',
            message: 'Đơn hàng #123 đã thanh toán thành công',
            timestamp: new Date().toISOString(),
            read: true
          }
        ],
        systemHealth
      };

      return dashboardData;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Không thể tải dữ liệu dashboard');
    }
  }

  // Báo cáo tổng hợp
  static async getReports(type: 'booking' | 'inventory' | 'customer' | 'financial'): Promise<any> {
    try {
      switch (type) {
        case 'booking':
          // TODO: Thay thế bằng API call thực tế
          return {
            totalBookings: 150,
            confirmedBookings: 120,
            cancelledBookings: 15,
            noShowBookings: 5,
            averageStayDuration: 2.5,
            totalRevenue: 150000000,
            bookingsByRoomType: [
              { roomType: 'Standard', bookings: 80, revenue: 40000000 },
              { roomType: 'Deluxe', bookings: 50, revenue: 60000000 },
              { roomType: 'Suite', bookings: 20, revenue: 50000000 }
            ],
            bookingsByMonth: [
              { month: '2024-01', bookings: 45, revenue: 45000000 },
              { month: '2024-02', bookings: 52, revenue: 52000000 },
              { month: '2024-03', bookings: 48, revenue: 48000000 }
            ]
          };

        case 'inventory':
          // TODO: Thay thế bằng API call thực tế
          return {
            totalItems: 150,
            lowStockItems: 12,
            outOfStockItems: 3,
            totalValue: 75000000,
            itemsByCategory: [
              { category: 'Đồ uống', items: 45, value: 15000000 },
              { category: 'Đồ ăn', items: 38, value: 22000000 },
              { category: 'Vệ sinh', items: 32, value: 18000000 },
              { category: 'Khăn', items: 35, value: 20000000 }
            ],
            recentTransactions: [],
            supplierPerformance: [
              { supplier: 'Công ty TNHH ABC', orders: 15, totalValue: 25000000 },
              { supplier: 'Công ty XYZ', orders: 12, totalValue: 18000000 }
            ]
          };

        case 'customer':
          return await CustomerService.getCustomerStats();

        case 'financial':
          // TODO: Thay thế bằng API call thực tế
          return {
            totalRevenue: 150000000,
            totalCosts: 45000000,
            netProfit: 105000000,
            profitMargin: 70,
            monthlyRevenue: [
              { month: '2024-01', revenue: 45000000, costs: 15000000, profit: 30000000 },
              { month: '2024-02', revenue: 52000000, costs: 16000000, profit: 36000000 },
              { month: '2024-03', revenue: 48000000, costs: 14000000, profit: 34000000 }
            ],
            paymentMethods: [
              { method: 'Tiền mặt', amount: 30000000, percentage: 20 },
              { method: 'Thẻ tín dụng', amount: 90000000, percentage: 60 },
              { method: 'Chuyển khoản', amount: 30000000, percentage: 20 }
            ]
          };

        default:
          throw new Error('Loại báo cáo không hợp lệ');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw new Error('Không thể tải dữ liệu báo cáo');
    }
  }

  // Tìm kiếm toàn hệ thống
  static async searchAll(query: string): Promise<{
    customers: any[];
    bookings: any[];
    rooms: any[];
    hotels: any[];
  }> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
      // const data = await response.json();
      // return data;

      // Mock implementation
      const searchResults = {
        customers: await CustomerService.searchCustomers(query),
        bookings: [], // Từ BookingService
        rooms: [], // Từ RoomService
        hotels: [] // Từ HotelService
      };

      return searchResults;
    } catch (error) {
      console.error('Error searching:', error);
      throw new Error('Không thể tìm kiếm');
    }
  }

  // Thông báo hệ thống
  static async getNotifications(limit: number = 20): Promise<{
    notifications: NotificationItem[];
    unreadCount: number;
  }> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/notifications?limit=${limit}`);
      // const data = await response.json();
      // return data;

      // Mock implementation
      const notifications: NotificationItem[] = [
        {
          id: '1',
          type: 'warning',
          title: 'Cảnh báo tồn kho thấp',
          message: 'Một số mặt hàng sắp hết hàng',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 phút trước
          read: false,
          actionUrl: '/inventory'
        },
        {
          id: '2',
          type: 'info',
          title: 'Đặt phòng mới',
          message: 'Khách hàng Nguyễn Văn A vừa đặt phòng',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 giờ trước
          read: false,
          actionUrl: '/bookings'
        },
        {
          id: '3',
          type: 'success',
          title: 'Thanh toán thành công',
          message: 'Đơn hàng #BK2024001 đã thanh toán',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 giờ trước
          read: true
        }
      ];

      return {
        notifications: notifications.slice(0, limit),
        unreadCount: notifications.filter(n => !n.read).length
      };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new Error('Không thể tải thông báo');
    }
  }

  // Đánh dấu thông báo đã đọc
  static async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      //   method: 'POST'
      // });

      // Mock implementation - không cần làm gì đặc biệt
      console.log(`Marked notification ${notificationId} as read`);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw new Error('Không thể cập nhật trạng thái thông báo');
    }
  }

  // Lấy cấu hình hệ thống
  static async getSystemConfig(): Promise<{
    hotelName: string;
    checkInTime: string;
    checkOutTime: string;
    currency: string;
    timezone: string;
    language: string;
    features: {
      booking: boolean;
      inventory: boolean;
      housekeeping: boolean;
      reports: boolean;
      loyalty: boolean;
    };
  }> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/config`);
      // const data = await response.json();
      // return data;

      // Mock implementation
      return {
        hotelName: "Khách sạn Sài Gòn Center",
        checkInTime: "14:00",
        checkOutTime: "12:00",
        currency: "VND",
        timezone: "Asia/Ho_Chi_Minh",
        language: "vi",
        features: {
          booking: true,
          inventory: true,
          housekeeping: true,
          reports: true,
          loyalty: true
        }
      };
    } catch (error) {
      console.error('Error fetching system config:', error);
      throw new Error('Không thể tải cấu hình hệ thống');
    }
  }
}
