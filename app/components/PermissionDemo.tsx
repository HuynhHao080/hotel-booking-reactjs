import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function PermissionDemo() {
  const { isAuthenticated, isAdmin, user, canAccessAdminPanel, canManageHotels, canManageCustomers } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const permissions = [
    {
      category: '👑 Quản trị hệ thống',
      items: [
        { name: 'Truy cập Dashboard', permission: 'dashboard.view', granted: canAccessAdminPanel },
        { name: 'Quản lý khách sạn', permission: 'hotels.manage', granted: canManageHotels },
        { name: 'Quản lý khách hàng', permission: 'customers.manage', granted: canManageCustomers },
        { name: 'Quản lý đặt phòng', permission: 'bookings.manage', granted: canAccessAdminPanel },
        { name: 'Xem báo cáo', permission: 'reports.view', granted: canAccessAdminPanel },
        { name: 'Quản lý nhân viên', permission: 'users.manage', granted: canAccessAdminPanel },
      ]
    },
    {
      category: '👤 Khách hàng',
      items: [
        { name: 'Tạo đặt phòng', permission: 'booking.create', granted: isAuthenticated },
        { name: 'Xem đặt phòng của mình', permission: 'booking.view_own', granted: isAuthenticated },
        { name: 'Xem thông tin cá nhân', permission: 'profile.view', granted: isAuthenticated },
        { name: 'Chỉnh sửa thông tin', permission: 'profile.edit', granted: isAuthenticated },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🛡️ Hệ thống Phân quyền</h1>
          <p className="text-xl text-gray-600">
            Hiểu rõ về cách hệ thống kiểm soát quyền truy cập
          </p>
        </div>

        {/* User Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">👤 Trạng thái hiện tại</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-4xl mb-2 ${isAuthenticated ? 'text-green-500' : 'text-red-500'}`}>
                {isAuthenticated ? '🔓' : '🔒'}
              </div>
              <p className="font-semibold">Trạng thái đăng nhập</p>
              <p className={`text-sm ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
                {isAuthenticated ? 'Đã đăng nhập' : 'Chưa đăng nhập'}
              </p>
            </div>

            <div className="text-center">
              <div className={`text-4xl mb-2 ${isAdmin ? 'text-purple-500' : 'text-blue-500'}`}>
                {isAdmin ? '👑' : '👤'}
              </div>
              <p className="font-semibold">Vai trò</p>
              <p className={`text-sm ${isAdmin ? 'text-purple-600' : 'text-blue-600'}`}>
                {isAdmin ? 'Quản trị viên' : 'Khách hàng'}
              </p>
            </div>

            <div className="text-center">
              <div className={`text-4xl mb-2 ${canAccessAdminPanel ? 'text-green-500' : 'text-gray-500'}`}>
                {canAccessAdminPanel ? '✅' : '❌'}
              </div>
              <p className="font-semibold">Quyền quản lý</p>
              <p className={`text-sm ${canAccessAdminPanel ? 'text-green-600' : 'text-gray-600'}`}>
                {canAccessAdminPanel ? 'Có quyền' : 'Không có quyền'}
              </p>
            </div>
          </div>

          {user && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Thông tin tài khoản:</h3>
              <p><strong>Tên:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user.id}</p>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 Tổng quan
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'permissions'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🔐 Chi tiết quyền
            </button>
            <button
              onClick={() => setActiveTab('testing')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'testing'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🧪 Hướng dẫn test
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-bold mb-4">🎯 Tổng quan hệ thống phân quyền</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">👑 Vai trò Admin</h4>
                    <p className="text-blue-800 text-sm">
                      Có quyền truy cập tất cả các chức năng quản lý: Dashboard, Quản lý khách sạn,
                      Quản lý khách hàng, Báo cáo, và các chức năng hệ thống khác.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">👤 Vai trò Khách hàng</h4>
                    <p className="text-green-800 text-sm">
                      Chỉ có quyền cơ bản: Đặt phòng, xem thông tin cá nhân,
                      và các chức năng liên quan đến trải nghiệm người dùng.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">🔒 Bảo mật</h4>
                    <p className="text-purple-800 text-sm">
                      Hệ thống sử dụng Role-Based Access Control (RBAC) để đảm bảo
                      người dùng chỉ truy cập được những chức năng được phép.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'permissions' && (
              <div>
                <h3 className="text-xl font-bold mb-4">🔐 Chi tiết quyền hạn</h3>
                <div className="space-y-6">
                  {permissions.map((category, index) => (
                    <div key={index}>
                      <h4 className="text-lg font-semibold mb-3">{category.category}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              item.granted ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-gray-600">{item.permission}</p>
                            </div>
                            <div className={`text-xl ${item.granted ? 'text-green-500' : 'text-gray-400'}`}>
                              {item.granted ? '✅' : '❌'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testing' && (
              <div>
                <h3 className="text-xl font-bold mb-4">🧪 Hướng dẫn test hệ thống</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">📝 Các bước test:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-yellow-800">
                      <li>Đăng nhập với tài khoản Admin (admin@hotel.com / admin123)</li>
                      <li>Kiểm tra các nút quản lý xuất hiện trên trang chủ</li>
                      <li>Truy cập các trang quản lý và test chức năng CRUD</li>
                      <li>Đăng xuất và đăng nhập với tài khoản Customer</li>
                      <li>Kiểm tra các nút quản lý không xuất hiện</li>
                      <li>Thử truy cập trực tiếp URL quản lý (sẽ bị chuyển hướng)</li>
                    </ol>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">🔵 Test với Admin</h4>
                      <ul className="space-y-1 text-blue-800 text-sm">
                        <li>• Có thể truy cập: /dashboard</li>
                        <li>• Có thể truy cập: /hotels/manage</li>
                        <li>• Có thể truy cập: /customers/manage</li>
                        <li>• Hiển thị các nút quản lý trên Header</li>
                        <li>• Hiển thị badge "Admin" trên Header</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">🟢 Test với Customer</h4>
                      <ul className="space-y-1 text-green-800 text-sm">
                        <li>• Không thể truy cập: /dashboard</li>
                        <li>• Không thể truy cập: /hotels/manage</li>
                        <li>• Không thể truy cập: /customers/manage</li>
                        <li>• Không hiển thị các nút quản lý</li>
                        <li>• Chỉ có thể đặt phòng và xem profile</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">⚠️ Lưu ý quan trọng</h4>
                    <ul className="space-y-1 text-red-800 text-sm">
                      <li>• Customer không thể truy cập các trang quản lý</li>
                      <li>• Các nút quản lý sẽ bị ẩn với Customer</li>
                      <li>• Truy cập trực tiếp URL sẽ bị chuyển hướng</li>
                      <li>• Chỉ Admin mới có quyền quản lý hệ thống</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            🔐 Đăng nhập để test
          </a>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
          >
            🏠 Về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
}
