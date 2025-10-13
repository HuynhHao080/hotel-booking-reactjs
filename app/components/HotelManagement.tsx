import React, { useState, useEffect } from 'react';
import { HotelService } from '../services/hotelService';
import type { Hotel, CreateHotelRequest } from '../types/database';
import LoadingSpinner from './LoadingSpinner';

// Hotel Management Component - Quản lý khách sạn
export function HotelManagement() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  // Form state
  const [formData, setFormData] = useState<CreateHotelRequest>({
    name: '',
    address: '',
    city: '',
    country: 'Việt Nam',
    phone: '',
    email: ''
  });

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await HotelService.getHotels();
      setHotels(response.data);
    } catch (err) {
      console.error('Error loading hotels:', err);
      setError('Không thể tải danh sách khách sạn');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHotel) {
        await HotelService.updateHotel(editingHotel.id, formData);
      } else {
        await HotelService.createHotel(formData);
      }
      await loadHotels();
      setShowAddForm(false);
      setEditingHotel(null);
      resetForm();
    } catch (err) {
      console.error('Error saving hotel:', err);
      setError('Không thể lưu thông tin khách sạn');
    }
  };

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      address: hotel.address,
      city: hotel.city,
      country: hotel.country,
      phone: hotel.phone,
      email: hotel.email
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa khách sạn này?')) return;

    try {
      await HotelService.deleteHotel(id);
      await loadHotels();
    } catch (err) {
      console.error('Error deleting hotel:', err);
      setError('Không thể xóa khách sạn');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      country: 'Việt Nam',
      phone: '',
      email: ''
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Lỗi</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadHotels}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Khách sạn</h1>
          <p className="text-gray-600 mt-1">Quản lý danh sách khách sạn trong hệ thống</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={loadHotels}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            🔄 Làm mới
          </button>
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingHotel(null);
              resetForm();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            ➕ Thêm khách sạn
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingHotel ? 'Chỉnh sửa khách sạn' : 'Thêm khách sạn mới'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tên khách sạn</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên khách sạn"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Quốc gia</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập quốc gia"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Thành phố</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập thành phố"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Địa chỉ</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Nhập địa chỉ chi tiết"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {editingHotel ? '💾 Cập nhật' : '➕ Thêm mới'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingHotel(null);
                  resetForm();
                }}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ❌ Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Hotels List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Danh sách Khách sạn ({hotels.length})</h2>
        </div>

        {hotels.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>Chưa có khách sạn nào trong hệ thống</p>
          </div>
        ) : (
          <div className="divide-y">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{hotel.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        hotel.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {hotel.is_active ? '✅ Hoạt động' : '❌ Ngừng hoạt động'}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📍 {hotel.address}, {hotel.city}, {hotel.country}</p>
                      <p>📞 {hotel.phone} | ✉️ {hotel.email}</p>
                      <p className="text-xs text-gray-500">
                        Tạo: {new Date(hotel.created_at).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(hotel)}
                      className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors"
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(hotel.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
