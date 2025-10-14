import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const location = useLocation();
  const isDevToolsRequest = location.pathname.includes('.well-known') ||
                           location.pathname.includes('chrome-devtools') ||
                           location.pathname.includes('com.chrome');

  // Nếu là request từ Chrome DevTools, trả về response rỗng
  if (isDevToolsRequest) {
    return (
      <div style={{ display: 'none' }}>
        {/* Hidden page for DevTools requests */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full text-center">
        <div className="modern-card p-8">
          <div className="mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Không tìm thấy trang
            </h2>
            <p className="text-gray-600 mb-8">
              Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="w-full btn-modern btn-primary-modern inline-flex items-center justify-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Về trang chủ</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full btn-modern btn-secondary-modern inline-flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại</span>
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
