import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logoLight from '../welcome/logo-light.svg';
import logoDark from '../welcome/logo-dark.svg';

const CustomerHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/hotels', label: 'Khách sạn' },
    { to: '/rooms', label: 'Phòng' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            {isScrolled ? (
              <img src={logoDark} alt="Logo" className="w-32" />
            ) : (
              <img src={logoLight} alt="Logo" className="w-32" />
            )}
          </Link>

          {/* Navigation */}
          <nav className={`hidden md:flex items-center space-x-8 ${
            isScrolled ? 'text-gray-900' : 'text-white'
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === link.to ? 'text-blue-600' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className={`font-medium ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Xin chào, {user?.name}
                </span>
                <button
                  onClick={logout}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isScrolled
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isScrolled
                      ? 'border border-gray-300 text-gray-900 hover:bg-gray-50'
                      : 'border border-white text-white hover:bg-white hover:text-gray-900'
                  }`}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isScrolled
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
