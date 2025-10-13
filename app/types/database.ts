///////////////////////////////////////////////////////////
// HOTEL MANAGEMENT SYSTEM TYPESCRIPT TYPES
// Generated from DBML schema
///////////////////////////////////////////////////////////

// Enums
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  RECEPTIONIST = 'RECEPTIONIST',
  HOUSEKEEPING = 'HOUSEKEEPING',
  STAFF = 'STAFF'
}

export enum RoomStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  CLEANING = 'CLEANING',
  MAINTENANCE = 'MAINTENANCE',
  OUT_OF_ORDER = 'OUT_OF_ORDER'
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIAL = 'PARTIAL'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  DIGITAL_WALLET = 'DIGITAL_WALLET',
  CHEQUE = 'CHEQUE'
}

export enum GuestRequestStatus {
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED'
}

export enum PriorityLevel {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  EMERGENCY = 'EMERGENCY'
}

export enum ShiftType {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  NIGHT = 'NIGHT',
  GRAVEYARD = 'GRAVEYARD'
}

export enum ReviewType {
  ROOM = 'ROOM',
  SERVICE = 'SERVICE',
  OVERALL = 'OVERALL',
  FACILITIES = 'FACILITIES',
  STAFF = 'STAFF'
}

export enum InventoryTransactionType {
  STOCK_IN = 'STOCK_IN',
  STOCK_OUT = 'STOCK_OUT',
  TRANSFER = 'TRANSFER',
  ADJUSTMENT = 'ADJUSTMENT',
  RETURN_TO_SUPPLIER = 'RETURN_TO_SUPPLIER'
}

// Core Models
export interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  password_hash: string;
  full_name: string;
  role: UserRole;
  email?: string;
  phone?: string;
  hire_date: string;
  hotel_id: number;
  created_at: string;
  updated_at: string;
}

export interface RoomType {
  id: number;
  name: string;
  max_guests: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: number;
  number: string;
  floor?: number;
  hotel_id: number;
  type_id: number;
  status: RoomStatus;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: number;
  full_name: string;
  email?: string;
  phone?: string;
  nationality?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: number;
  customer_id: number;
  hotel_id: number;
  check_in: string;
  check_out: string;
  total_cost: number;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

export interface BookingRoom {
  booking_id: number;
  room_id: number;
  price: number;
}

export interface Payment {
  id: number;
  booking_id: number;
  amount: number;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  payment_reference?: string;
  payment_date: string;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookingService {
  booking_id: number;
  service_id: number;
  quantity: number;
  unit_price: number;
  created_at: string;
}

export interface Guest {
  id: number;
  booking_id: number;
  full_name: string;
  identification?: string;
  contact_phone?: string;
  nationality?: string;
  created_at: string;
}

export interface Review {
  id: number;
  customer_id: number;
  booking_id: number;
  review_type: ReviewType;
  room_id?: number;
  service_id?: number;
  rating: number;
  title: string;
  comment?: string;
  is_approved: boolean;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Loyalty {
  id: number;
  customer_id: number;
  points: number;
  level: string;
  tier_expiry?: string;
  points_earned: number;
  points_redeemed: number;
  joined_at: string;
  updated_at: string;
}

export interface GuestRequest {
  id: number;
  booking_id: number;
  room_id: number;
  request_type: string;
  priority: PriorityLevel;
  processing_status: GuestRequestStatus;
  title: string;
  description: string;
  requested_by: string;
  assigned_to: number;
  requested_at: string;
  assigned_at?: string;
  completed_at?: string;
  cost_incurred: number;
  resolution_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface HousekeepingTask {
  id: number;
  room_id: number;
  booking_id?: number;
  task_type: string;
  priority: PriorityLevel;
  task_status: string;
  scheduled_date: string;
  scheduled_time: string;
  assigned_to: number;
  work_started_at?: string;
  work_completed_at?: string;
  quality_check: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  id: number;
  hotel_id: number;
  name: string;
  category: string;
  current_stock: number;
  min_stock_level: number;
  unit_cost: number;
  unit_price: number;
  reorder_point: number;
  sku?: string;
  barcode?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InventoryTransaction {
  id: number;
  item_id: number;
  transaction_type: InventoryTransactionType;
  quantity: number;
  unit_value: number;
  performed_by_user_id: number;
  booking_context?: number;
  room_context?: number;
  transaction_date: string;
  reference_note?: string;
  created_at: string;
}

export interface RoomInventory {
  room_id: number;
  item_id: number;
  allocated: number;
  last_restocked?: string;
}

export interface BookingHistory {
  id: number;
  booking_id: number;
  old_status: BookingStatus;
  new_status: BookingStatus;
  changed_by: number;
  changed_at: string;
  reason?: string;
  created_at: string;
}

export interface PaymentHistory {
  id: number;
  payment_id: number;
  old_status: PaymentStatus;
  new_status: PaymentStatus;
  changed_by: number;
  changed_at: string;
  reason?: string;
  created_at: string;
}

export interface RoomStatusHistory {
  id: number;
  room_id: number;
  old_status: RoomStatus;
  new_status: RoomStatus;
  changed_by: number;
  booking_context?: number;
  reason?: string;
  notes?: string;
  created_at: string;
}

export interface Supplier {
  id: number;
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  tax_id?: string;
  payment_terms: string;
  lead_time?: number;
  is_active: boolean;
  reliability_score: number;
  created_at: string;
  updated_at: string;
}

export interface SupplierItem {
  id: number;
  supplier_id: number;
  inventory_item_id: number;
  supplier_item_code?: string;
  supplier_unit_cost: number;
  minimum_order_qty: number;
  lead_time?: number;
  last_purchased_at?: string;
  preferred_supplier: boolean;
  created_at: string;
  updated_at: string;
}

export interface ShiftDuty {
  id: number;
  user_id: number;
  hotel_id: number;
  shift_type: ShiftType;
  shift_date: string;
  start_time: string;
  end_time: string;
  clock_in_time?: string;
  clock_out_time?: string;
  break_duration: number;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SystemPolicy {
  id: number;
  hotel_id?: number;
  title: string;
  category: string;
  content: string;
  priority: number;
  is_active: boolean;
  last_updated_by?: number;
  effective_date: string;
  expiry_date?: string;
  version: string;
  requires_acknowledgement: boolean;
  acknowledgement_required: boolean;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

// Form types for creating/updating entities
export interface CreateHotelRequest {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  full_name: string;
  role: UserRole;
  email?: string;
  phone?: string;
  hire_date: string;
  hotel_id: number;
}

export interface CreateBookingRequest {
  customer_id: number;
  hotel_id: number;
  check_in: string;
  check_out: string;
  room_ids: number[];
  guest_info?: {
    full_name: string;
    identification?: string;
    contact_phone?: string;
    nationality?: string;
  }[];
}

export interface CreateCustomerRequest {
  full_name: string;
  email?: string;
  phone?: string;
  nationality?: string;
}

export interface CreateRoomRequest {
  number: string;
  floor?: number;
  hotel_id: number;
  type_id: number;
}

export interface CreatePaymentRequest {
  booking_id: number;
  amount: number;
  payment_method: PaymentMethod;
  payment_reference?: string;
}

export interface CreateGuestRequestRequest {
  booking_id: number;
  room_id: number;
  request_type: string;
  priority: PriorityLevel;
  title: string;
  description: string;
  requested_by: string;
}

export interface CreateInventoryItemRequest {
  hotel_id: number;
  name: string;
  category: string;
  current_stock: number;
  min_stock_level: number;
  unit_cost: number;
  unit_price: number;
  reorder_point: number;
  sku?: string;
  barcode?: string;
}

export interface CreateServiceRequest {
  name: string;
  price: number;
  description: string;
}

// Dashboard and reporting types
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalRooms: number;
  totalCustomers: number;
  occupancyRate: number;
  averageBookingValue: number;
  bookingsByStatus: Record<BookingStatus, number>;
  revenueByMonth: Array<{ month: string; revenue: number }>;
  topServices: Array<{ service: string; bookings: number; revenue: number }>;
}

export interface BookingReport {
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  noShowBookings: number;
  averageStayDuration: number;
  totalRevenue: number;
  bookingsByRoomType: Array<{ roomType: string; bookings: number; revenue: number }>;
  bookingsByMonth: Array<{ month: string; bookings: number; revenue: number }>;
}

export interface InventoryReport {
  totalItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalValue: number;
  itemsByCategory: Array<{ category: string; items: number; value: number }>;
  recentTransactions: InventoryTransaction[];
  supplierPerformance: Array<{ supplier: string; orders: number; totalValue: number }>;
}
