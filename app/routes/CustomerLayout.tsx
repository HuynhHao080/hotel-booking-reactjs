import React from 'react';
import CustomerHeader from '../components/CustomerHeader';
import ChatSupport from '../components/ChatSupport';
import { useAuth } from '../contexts/AuthContext';

interface CustomerLayoutProps {
  children?: React.ReactNode;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerHeader />

      <main className="pt-24">
        {children}
      </main>

      {/* Chat Support chỉ dành cho khách hàng */}
      {isAuthenticated && <ChatSupport />}
    </div>
  );
};

export default CustomerLayout;
