// Booking Service - Tương thích với backend API
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

export interface Room {
  id: string;
  type: string;
  name: string;
  price: number;
  size: string;
  beds: string;
  amenities: string[];
  images: string[];
  available: boolean;
  maxGuests: number;
}

export interface Booking {
  id: string;
  roomId: string;
  customerName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  createdAt: string;
}

// Mock data - sẽ được thay thế bằng API calls thực tế
const mockRooms: Room[] = [
  {
    id: "room-001",
    type: "standard",
    name: "Phòng Standard",
    price: 500000,
    size: "25m²",
    beds: "1 giường đôi",
    amenities: ["WiFi miễn phí", "TV 42 inch", "Minibar"],
    images: ["/images/gallery1.jpg"],
    available: true,
    maxGuests: 2
  },
  {
    id: "room-002",
    type: "deluxe",
    name: "Phòng Deluxe",
    price: 800000,
    size: "35m²",
    beds: "1 giường king",
    amenities: ["WiFi miễn phí", "TV 50 inch", "Ban công", "Bồn tắm"],
    images: ["/images/gallery2.jpg"],
    available: true,
    maxGuests: 2
  },
  {
    id: "room-003",
    type: "suite",
    name: "Suite Executive",
    price: 1500000,
    size: "50m²",
    beds: "1 giường king + sofa",
    amenities: ["WiFi miễn phí", "TV 55 inch", "Phòng khách", "Bồn tắm + vòi sen"],
    images: ["/images/gallery3.jpg"],
    available: false,
    maxGuests: 4
  }
];

const mockBookings: Booking[] = [
  {
    id: "booking-001",
    roomId: "room-001",
    customerName: "Nguyễn Văn A",
    checkInDate: "2024-01-15",
    checkOutDate: "2024-01-17",
    guests: 2,
    totalAmount: 1000000,
    status: "confirmed",
    createdAt: "2024-01-10T10:00:00Z"
  },
  {
    id: "booking-002",
    roomId: "room-002",
    customerName: "Trần Thị B",
    checkInDate: "2024-01-20",
    checkOutDate: "2024-01-22",
    guests: 2,
    totalAmount: 1600000,
    status: "pending",
    createdAt: "2024-01-12T14:30:00Z"
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
  // Lấy danh sách phòng có sẵn
  static async getAvailableRooms(
    checkInDate: string,
    checkOutDate: string,
    guests: number
  ): Promise<Room[]> {
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
      return mockRooms
        .filter(room => room.available && room.maxGuests >= guests)
        .map(room => ({
          ...room,
          price: room.price * nights // Tính giá theo số đêm
        }));
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
      const room = mockRooms.find(r => r.type === bookingRequest.roomType);
      if (!room) throw new Error('Loại phòng không hợp lệ');

      const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        roomId: room.id,
        customerName: bookingRequest.customerInfo.name,
        checkInDate: bookingRequest.checkInDate,
        checkOutDate: bookingRequest.checkOutDate,
        guests: bookingRequest.guests,
        totalAmount: room.price * nights,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      mockBookings.push(newBooking);
      return newBooking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Không thể tạo booking');
    }
  }

  // Lấy danh sách bookings
  static async getBookings(status?: string): Promise<Booking[]> {
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
  static async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<Booking> {
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
      const booking = mockBookings.find(b => b.id === bookingId);
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
      const booking = mockBookings.find(b => b.id === bookingId);
      if (!booking) throw new Error('Booking không tồn tại');

      booking.status = 'cancelled';
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
      const bookings = mockBookings.filter(b =>
        b.status === 'confirmed' || b.status === 'checked-in' || b.status === 'checked-out'
      );

      const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
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
