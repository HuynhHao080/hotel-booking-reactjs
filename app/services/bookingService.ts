import type {
  Booking,
  Customer,
  Room,
  CreateBookingRequest,
  CreateCustomerRequest,
  ApiResponse,
  PaginatedResponse,
  DashboardStats,
  BookingReport,
  RoomType
} from '../types/database';
import { BookingStatus, RoomStatus } from '../types/database';

// Booking Service - Updated to use database types
export interface BookingRequest {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
}

export interface RoomWithDetails extends Room {
  type: string;
  name: string;
  price: number;
  size: string;
  beds: string;
  amenities: string[];
  images: string[];
  available: boolean;
  maxGuests: number;
  roomType?: RoomType;
}

export interface BookingWithDetails extends Booking {
  customer?: Customer;
  rooms?: Room[];
  customerName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
}

// Mock data - sẽ được thay thế bằng API calls thực tế
const mockRoomTypes: RoomType[] = [
  {
    id: 1,
    name: "Standard",
    max_guests: 2,
    price: 500000,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Deluxe",
    max_guests: 2,
    price: 800000,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Suite",
    max_guests: 4,
    price: 1500000,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

const mockRooms: Room[] = [
  {
    id: 1,
    number: "101",
    floor: 1,
    hotel_id: 1,
    type_id: 1,
    status: RoomStatus.AVAILABLE,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    number: "201",
    floor: 2,
    hotel_id: 1,
    type_id: 2,
    status: RoomStatus.AVAILABLE,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    number: "301",
    floor: 3,
    hotel_id: 1,
    type_id: 3,
    status: RoomStatus.OCCUPIED,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

const mockCustomers: Customer[] = [
  {
    id: 1,
    full_name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    nationality: "Vietnamese",
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z"
  },
  {
    id: 2,
    full_name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0987654321",
    nationality: "Vietnamese",
    created_at: "2024-01-12T14:30:00Z",
    updated_at: "2024-01-12T14:30:00Z"
  }
];

const mockBookings: Booking[] = [
  {
    id: 1,
    customer_id: 1,
    hotel_id: 1,
    check_in: "2024-01-15",
    check_out: "2024-01-17",
    total_cost: 1000000,
    status: BookingStatus.CONFIRMED,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z"
  },
  {
    id: 2,
    customer_id: 2,
    hotel_id: 1,
    check_in: "2024-01-20",
    check_out: "2024-01-22",
    total_cost: 1600000,
    status: BookingStatus.PENDING,
    created_at: "2024-01-12T14:30:00Z",
    updated_at: "2024-01-12T14:30:00Z"
  }
];

// API Base URL - sẽ được cấu hình theo môi trường
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Utility function để format date
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Utility function để tính số đêm
const calculateNights = (checkIn: string, checkOut: string): number => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Booking Service Class
export class BookingService {
  // Lấy danh sách phòng có sẵn với thông tin chi tiết
  static async getAvailableRooms(
    checkInDate: string,
    checkOutDate: string,
    guests: number
  ): Promise<RoomWithDetails[]> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/rooms/availability`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ checkInDate, checkOutDate, guests })
      // });
      // const data = await response.json();
      // return data.rooms;

      // Mock implementation
      const nights = calculateNights(checkInDate, checkOutDate);
      const availableRooms: RoomWithDetails[] = [];

      for (const room of mockRooms) {
        if (room.status !== RoomStatus.AVAILABLE) continue;

        const roomType = mockRoomTypes.find(rt => rt.id === room.type_id);
        if (!roomType || roomType.max_guests < guests) continue;

        const roomWithDetails: RoomWithDetails = {
          ...room,
          type: roomType.name,
          name: `${roomType.name} Room ${room.number}`,
          price: roomType.price * nights,
          size: "25m²", // Mock data
          beds: "1 giường đôi", // Mock data
          amenities: ["WiFi miễn phí", "TV 42 inch", "Minibar"], // Mock data
          images: ["/images/gallery1.jpg"], // Mock data
          available: room.status === RoomStatus.AVAILABLE,
          maxGuests: roomType.max_guests,
          roomType
        };

        availableRooms.push(roomWithDetails);
      }

      return availableRooms;
    } catch (error) {
      console.error('Error fetching available rooms:', error);
      throw new Error('Không thể tải danh sách phòng');
    }
  }

  // Tạo booking mới
  static async createBooking(bookingRequest: BookingRequest): Promise<Booking> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/bookings`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(bookingRequest)
      // });
      // const data = await response.json();
      // return data.booking;

      // Mock implementation
      const nights = calculateNights(bookingRequest.checkInDate, bookingRequest.checkOutDate);
      const roomType = mockRoomTypes.find(rt => rt.name === bookingRequest.roomType);
      if (!roomType) throw new Error('Loại phòng không hợp lệ');

      // Create or find customer
      let customer = mockCustomers.find(c =>
        c.email === bookingRequest.customerInfo.email ||
        c.phone === bookingRequest.customerInfo.phone
      );

      if (!customer) {
        const newCustomerId = Math.max(...mockCustomers.map(c => c.id)) + 1;
        customer = {
          id: newCustomerId,
          full_name: bookingRequest.customerInfo.name,
          email: bookingRequest.customerInfo.email,
          phone: bookingRequest.customerInfo.phone,
          nationality: "Vietnamese",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        mockCustomers.push(customer);
      }

      const newBooking: Booking = {
        id: Math.max(...mockBookings.map(b => b.id)) + 1,
        customer_id: customer.id,
        hotel_id: 1, // Default hotel
        check_in: bookingRequest.checkInDate,
        check_out: bookingRequest.checkOutDate,
        total_cost: roomType.price * nights,
        status: BookingStatus.PENDING,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockBookings.push(newBooking);
      return newBooking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Không thể tạo booking');
    }
  }

  // Lấy danh sách bookings
  static async getBookings(status?: BookingStatus): Promise<Booking[]> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const params = status ? `?status=${status}` : '';
      // const response = await fetch(`${API_BASE_URL}/bookings${params}`);
      // const data = await response.json();
      // return data.bookings;

      // Mock implementation
      if (status) {
        return mockBookings.filter(booking => booking.status === status);
      }
      return mockBookings;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw new Error('Không thể tải danh sách bookings');
    }
  }

  // Cập nhật trạng thái booking
  static async updateBookingStatus(bookingId: string, status: BookingStatus): Promise<Booking> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status })
      // });
      // const data = await response.json();
      // return data.booking;

      // Mock implementation
      const bookingIdNum = parseInt(bookingId);
      const booking = mockBookings.find(b => b.id === bookingIdNum);
      if (!booking) throw new Error('Booking không tồn tại');

      booking.status = status;
      return booking;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw new Error('Không thể cập nhật trạng thái booking');
    }
  }

  // Hủy booking
  static async cancelBooking(bookingId: string): Promise<void> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
      //   method: 'POST'
      // });

      // Mock implementation
      const bookingIdNum = parseInt(bookingId);
      const booking = mockBookings.find(b => b.id === bookingIdNum);
      if (!booking) throw new Error('Booking không tồn tại');

      booking.status = BookingStatus.CANCELLED;
    } catch (error) {
      console.error('Error canceling booking:', error);
      throw new Error('Không thể hủy booking');
    }
  }

  // Tính tổng doanh thu
  static async getRevenue(startDate: string, endDate: string): Promise<{
    totalRevenue: number;
    totalBookings: number;
    averageBookingValue: number;
  }> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch(`${API_BASE_URL}/reports/revenue`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ startDate, endDate })
      // });
      // const data = await response.json();
      // return data;

      // Mock implementation
      const bookings = mockBookings.filter((b: Booking) =>
        b.status === BookingStatus.CONFIRMED ||
        b.status === BookingStatus.CHECKED_IN ||
        b.status === BookingStatus.CHECKED_OUT
      );

      const totalRevenue = bookings.reduce((sum: number, booking: Booking) => sum + booking.total_cost, 0);
      const totalBookings = bookings.length;
      const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

      return {
        totalRevenue,
        totalBookings,
        averageBookingValue
      };
    } catch (error) {
      console.error('Error fetching revenue:', error);
      throw new Error('Không thể tải dữ liệu doanh thu');
    }
  }
}
