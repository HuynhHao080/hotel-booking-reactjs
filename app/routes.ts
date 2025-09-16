import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Layout bọc tất cả route chính
  route("", "routes/Layout.tsx", [
    index("routes/home.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("hotels", "routes/hotels.tsx"),
    route("customers", "routes/customers.tsx"),
    route("reports", "routes/reports.tsx"),
    route("rooms", "routes/rooms.tsx"),
    route("settings", "routes/settings.tsx"),
    route("staff", "routes/staff.tsx"),
  ]),

  // auth pages KHÔNG dùng layout
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
] satisfies RouteConfig;
