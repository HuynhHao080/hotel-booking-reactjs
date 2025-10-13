import type {
  Customer,
  CreateCustomerRequest,
  ApiResponse,
  PaginatedResponse,
  Booking,
  Loyalty,
  Review
} from '../types/database';
import { BookingStatus, ReviewType } from '../types/database';

// Customer Service - Quản lý thông tin khách hàng
export interface CustomerWithStats extends Customer {
  totalBookings: number;
  totalSpent: number;
  lastBookingDate?: string;
  loyaltyPoints: number;
  loyaltyTier: string;
  averageRating: number;
}

export interface CustomerHistory {
  customer: Customer;
  bookings: Booking[];
  reviews: Review[];
  loyalty: Loyalty | null;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: 1,
    full_name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    nationality: "Việt Nam",
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z"
  },
  {
    id: 2,
    full_name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0987654321",
    nationality: "Việt Nam",
    created_at: "2024-01-12T14:30:00Z",
    updated_at: "2024-01-12T14:30:00Z"
  },
  {
    id: 3,
    full_name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    nationality: "USA",
    created_at: "2024-01-15T09:15:00Z",
    updated_at: "2024-01-15T09:15:00Z"
  }
];

const mockLoyaltyPrograms: Loyalty[] = [
  {
    id: 1,
    customer_id: 1,
    points: 2500,
    level: "GOLD",
    tier_expiry: "2024-12-31T23:59:59Z",
    points_earned: 3000,
    points_redeemed: 500,
    joined_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z"
  },
  {
    id: 2,
    customer_id: 2,
    points: 800,
    level: "SILVER",
    tier_expiry: "2024-12-31T23:59:59Z",
    points_earned: 1000,
    points_redeemed: 200,
    joined_at: "2024-01-12T14:30:00Z",
    updated_at: "2024-01-18T14:30:00Z"
  }
];

const mockReviews: Review[] = [
  {
    id: 1,
    customer_id: 1,
    booking_id: 1,
    review_type: ReviewType.ROOM,
    room_id: 1,
    rating: 5,
    title: "Phòng tuyệt vời",
    comment: "Phòng sạch sẽ, view đẹp, dịch vụ tốt",
    is_approved: true,
    is_visible: true,
    created_at: "2024-01-18T10:00:00Z",
    updated_at: "2024-01-18T10:00:00Z"
  },
  {
    id: 2,
    customer_id: 2,
    booking_id: 2,
    review_type: ReviewType.SERVICE,
    service_id: 1,
    rating: 4,
    title: "Dịch vụ tốt",
    comment: "Nhân viên thân thiện, phục vụ nhanh chóng",
    is_approved: true,
    is_visible: true,
    created_at: "2024-01-20T14:30:00Z",
    updated_at: "2024-01-20T14:30:00Z"
  }
];

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export class CustomerService {
  // Lấy danh sách khách hàng với phân trang
  static async getCustomers(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<PaginatedResponse<Customer>> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const params = new URLSearchParams({
      //   page: page.toString(),
      //   limit: limit.toString(),
      //   ...(search && { search })
      // });
      // const response = await fetch(`${API_BASE_URL}/customers?${params}`);
      // const data = await response.json();
      // return data;

      // Mock implementation
      let filteredCustomers = mockCustomers;

      if (search) {
        const searchLower = search.toLowerCase();
        filteredCustomers = mockCustomers.filter(customer =>
          customer.full_name.toLowerCase().includes(searchLower) ||
          customer.email?.toLowerCase().includes(searchLower) ||
          customer.phone?.includes(search)
        );
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

      return {
        success: true,
        data: paginatedCustomers,
        pagination: {
          page,
          limit,
          total: filteredCustomers.length,
          totalPages: Math.ceil(filteredCustomers.length / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw new Error('Không thể tải danh sách khách hàng');
    }
  }

  // Lấy thông tin khách hàng theo ID
  static async getCustomerById(id: number): Promise<Customer> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/customers/${id}`);
      // const data = await response.json();
      // return data.customer;

      // Mock implementation
      const customer = mockCustomers.find(c => c.id === id);
      if (!customer) throw new Error('Không tìm thấy khách hàng');

      return customer;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw new Error('Không thể tải thông tin khách hàng');
    }
  }

  // Lấy thông tin khách hàng với thống kê
  static async getCustomerWithStats(id: number): Promise<CustomerWithStats> {
    try {
      const customer = await this.getCustomerById(id);
      const loyalty = mockLoyaltyPrograms.find(l => l.customer_id === id);
      const customerReviews = mockReviews.filter(r => r.customer_id === id);

      // Mock stats - trong thực tế sẽ tính từ dữ liệu thực
      return {
        ...customer,
        totalBookings: 5,
        totalSpent: 15000000,
        lastBookingDate: "2024-01-20",
        loyaltyPoints: loyalty?.points || 0,
        loyaltyTier: loyalty?.level || "BRONZE",
        averageRating: customerReviews.length > 0
          ? customerReviews.reduce((sum, r) => sum + r.rating, 0) / customerReviews.length
          : 0
      };
    } catch (error) {
      console.error('Error fetching customer with stats:', error);
      throw new Error('Không thể tải thông tin khách hàng');
    }
  }

  // Lấy lịch sử khách hàng (bookings, reviews, loyalty)
  static async getCustomerHistory(id: number): Promise<CustomerHistory> {
    try {
      const customer = await this.getCustomerById(id);

      // Mock data - trong thực tế sẽ lấy từ API
      return {
        customer,
        bookings: [], // Sẽ được tích hợp với BookingService
        reviews: mockReviews.filter(r => r.customer_id === id),
        loyalty: mockLoyaltyPrograms.find(l => l.customer_id === id) || null
      };
    } catch (error) {
      console.error('Error fetching customer history:', error);
      throw new Error('Không thể tải lịch sử khách hàng');
    }
  }

  // Tạo khách hàng mới
  static async createCustomer(customerData: CreateCustomerRequest): Promise<Customer> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/customers`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(customerData)
      // });
      // const data = await response.json();
      // return data.customer;

      // Mock implementation
      const newCustomer: Customer = {
        id: Math.max(...mockCustomers.map(c => c.id)) + 1,
        ...customerData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockCustomers.push(newCustomer);
      return newCustomer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Không thể tạo khách hàng mới');
    }
  }

  // Cập nhật thông tin khách hàng
  static async updateCustomer(id: number, customerData: Partial<CreateCustomerRequest>): Promise<Customer> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(customerData)
      // });
      // const data = await response.json();
      // return data.customer;

      // Mock implementation
      const customerIndex = mockCustomers.findIndex(c => c.id === id);
      if (customerIndex === -1) throw new Error('Không tìm thấy khách hàng');

      mockCustomers[customerIndex] = {
        ...mockCustomers[customerIndex],
        ...customerData,
        updated_at: new Date().toISOString()
      };

      return mockCustomers[customerIndex];
    } catch (error) {
      console.error('Error updating customer:', error);
      throw new Error('Không thể cập nhật thông tin khách hàng');
    }
  }

  // Xóa khách hàng
  static async deleteCustomer(id: number): Promise<void> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // await fetch(`${API_BASE_URL}/customers/${id}`, {
      //   method: 'DELETE'
      // });

      // Mock implementation
      const customerIndex = mockCustomers.findIndex(c => c.id === id);
      if (customerIndex === -1) throw new Error('Không tìm thấy khách hàng');

      mockCustomers.splice(customerIndex, 1);
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw new Error('Không thể xóa khách hàng');
    }
  }

  // Tìm kiếm khách hàng
  static async searchCustomers(query: string): Promise<Customer[]> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/customers/search?q=${encodeURIComponent(query)}`);
      // const data = await response.json();
      // return data.customers;

      // Mock implementation
      const queryLower = query.toLowerCase();
      return mockCustomers.filter(customer =>
        customer.full_name.toLowerCase().includes(queryLower) ||
        customer.email?.toLowerCase().includes(queryLower) ||
        customer.phone?.includes(query)
      );
    } catch (error) {
      console.error('Error searching customers:', error);
      throw new Error('Không thể tìm kiếm khách hàng');
    }
  }

  // Lấy khách hàng VIP (có điểm loyalty cao)
  static async getVipCustomers(limit: number = 10): Promise<CustomerWithStats[]> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/customers/vip?limit=${limit}`);
      // const data = await response.json();
      // return data.customers;

      // Mock implementation
      return mockCustomers.slice(0, limit).map(customer => ({
        ...customer,
        totalBookings: 5,
        totalSpent: 15000000,
        lastBookingDate: "2024-01-20",
        loyaltyPoints: 2500,
        loyaltyTier: "GOLD",
        averageRating: 4.5
      }));
    } catch (error) {
      console.error('Error fetching VIP customers:', error);
      throw new Error('Không thể tải danh sách khách hàng VIP');
    }
  }

  // Lấy thống kê khách hàng
  static async getCustomerStats(): Promise<{
    totalCustomers: number;
    newCustomersThisMonth: number;
    vipCustomers: number;
    averageRating: number;
    topNationalities: Array<{ nationality: string; count: number }>;
  }> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/customers/stats`);
      // const data = await response.json();
      // return data.stats;

      // Mock implementation
      return {
        totalCustomers: mockCustomers.length,
        newCustomersThisMonth: 15,
        vipCustomers: 8,
        averageRating: 4.2,
        topNationalities: [
          { nationality: "Việt Nam", count: 45 },
          { nationality: "USA", count: 12 },
          { nationality: "Japan", count: 8 },
          { nationality: "Korea", count: 6 },
          { nationality: "Singapore", count: 4 }
        ]
      };
    } catch (error) {
      console.error('Error fetching customer stats:', error);
      throw new Error('Không thể tải thống kê khách hàng');
    }
  }
}
