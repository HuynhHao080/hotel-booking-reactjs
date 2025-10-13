import React from 'react';
import { CustomerManagement } from '../components/CustomerManagement';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function CustomersManagePage() {
  const { isAuthenticated, canManageCustomers } = useAuth();

  // Kiểm tra quyền truy cập
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!canManageCustomers) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">❌ Truy cập bị từ chối</h2>
          <p className="text-gray-600 mb-4">Bạn không có quyền truy cập trang này</p>
          <a
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Quay về trang chủ
          </a>
        </div>
      </div>
    );
  }

  return <CustomerManagement />;
}
