import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protectedroute";
import AdminRoute from "./components/protectedroute";

import Login from "./pages/login";
import Register from "./pages/register";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import AdminCompanies from "./pages/admin/companies";

// 🆕 NEW PAGES
import Home from "./pages/home";
import CompanyProducts from "./pages/companyp";

import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminUsers from "./pages/admin/users";

import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* Public */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🏠 HOME – COMPANIES */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* 🏢 COMPANY PRODUCTS */}
            <Route
              path="/company/:companyId"
              element={
                <ProtectedRoute>
                  <CompanyProducts />
                </ProtectedRoute>
              }
            />

            {/* Customer (Protected) */}
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

            {/* Admin (Protected + Role-based) */}
            <Route
  path="/admin/companies"
  element={
    <AdminRoute>
      <AdminCompanies />
    </AdminRoute>
  }
/>

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
