import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Shield, Camera, Save } from "lucide-react";
import authService from "../services/authService";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || ''
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);

    // Refresh thông tin user trong Header bằng cách dispatch custom event
    window.dispatchEvent(new Event('userUpdated'));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#d2b48c]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#5a3e2b] dark:text-white">
            Thông tin cá nhân
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-[#d2b48c] text-white rounded-lg hover:bg-[#c9a978] transition-colors duration-300 flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className="relative inline-block">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#d2b48c] mx-auto"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-[#d2b48c] flex items-center justify-center mx-auto border-4 border-[#c9a978]">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-[#d2b48c] text-white p-2 rounded-full hover:bg-[#c9a978] transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-semibold text-[#5a3e2b] dark:text-white mt-4">
                {user.name}
              </h2>
              <p className="text-[#d2b48c] font-medium">{user.role}</p>
            </div>
          </div>

          {/* Information Section */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center text-sm font-medium text-[#5a3e2b] dark:text-white mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Tên đầy đủ
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-[#c9a978] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2b48c] dark:focus:ring-gray-500 bg-white dark:bg-gray-700 text-[#5a3e2b] dark:text-white transition-colors duration-300"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-[#5a3e2b] dark:text-white">
                    {user.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-sm font-medium text-[#5a3e2b] dark:text-white mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-[#c9a978] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2b48c] dark:focus:ring-gray-500 bg-white dark:bg-gray-700 text-[#5a3e2b] dark:text-white transition-colors duration-300"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-[#5a3e2b] dark:text-white">
                    {user.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center text-sm font-medium text-[#5a3e2b] dark:text-white mb-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Số điện thoại
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    className="w-full p-3 border-2 border-[#c9a978] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2b48c] dark:focus:ring-gray-500 bg-white dark:bg-gray-700 text-[#5a3e2b] dark:text-white transition-colors duration-300"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-[#5a3e2b] dark:text-white">
                    {user.phone || 'Chưa cập nhật'}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center text-sm font-medium text-[#5a3e2b] dark:text-white mb-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Địa chỉ
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Nhập địa chỉ"
                    className="w-full p-3 border-2 border-[#c9a978] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2b48c] dark:focus:ring-gray-500 bg-white dark:bg-gray-700 text-[#5a3e2b] dark:text-white transition-colors duration-300"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-[#5a3e2b] dark:text-white">
                    {user.address || 'Chưa cập nhật'}
                  </p>
                )}
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-[#d2b48c] text-white rounded-lg hover:bg-[#c9a978] transition-colors duration-300 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Lưu thay đổi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
