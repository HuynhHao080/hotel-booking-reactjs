import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // route gốc `/`
  index("routes/home.tsx"),

  // route `/dashboard`
  route("dashboard", "routes/dashboard.tsx"),

  // route `/hotels`
  route("hotels", "routes/hotels.tsx"),

  // auth routes
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
] satisfies RouteConfig;
