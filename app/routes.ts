import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // route gốc `/`
  index("routes/home.tsx"),

  // route `/demo` - Hướng dẫn phân quyền
  route("demo", "routes/demo.tsx"),

  // route `/dashboard`
  route("dashboard", "routes/dashboard.tsx"),

  // route `/hotels`
  route("hotels", "routes/hotels-new.tsx"),
  route("booking", "routes/booking.tsx"),  // Route `/booking`
  route("booking/all", "routes/booking-all.tsx"),  // Route `/booking/all`
  route("booking/manage", "routes/booking-manage.tsx"),  // Route `/booking/manage`
  route("booking/schedule", "routes/booking-schedule.tsx"),  // Route `/booking/schedule`
  route("booking/reports", "routes/booking-reports.tsx"),  // Route `/booking/reports`
  route('rooms', 'routes/rooms.tsx'),  // Route `/rooms`
  route('reports', 'routes/reports.tsx'),  // Route `/reports`
  route('settings', 'routes/settings.tsx'),  // Route `/settings`
  route('staff', 'routes/staff.tsx'),  // Route `/staff`
  route('customers', 'routes/customers.tsx'),  // Route `/customers`

  // auth routes
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("profile", "routes/profile.tsx"),
] satisfies RouteConfig;
