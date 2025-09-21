import { useState } from "react";
import { UserPlus, Edit, Trash, Search, Filter, Download } from "lucide-react";

export default function Customers() { 
  const [customers] = useState([
    { id: 1, name: "Nguyen Van A", email: "a.nguyen@email.com", phone: "0901234567" },
    { id: 2, name: "Tran Thi B", email: "b.tran@email.com", phone: "0907654321" },
  ]);

  const handleAddCustomer = () => {
    alert("Chức năng Thêm khách hàng sẽ mở form nhập liệu!");
  };

  const handleEditCustomer = () => {
    alert("Chức năng Sửa thông tin sẽ chỉnh sửa khách hàng được chọn!");
  };

  const handleDeleteCustomer = () => {
    alert("Chức năng Xóa khách hàng sẽ xóa khách hàng được chọn!");
  };

  const handleSearchCustomer = () => {
    alert("Chức năng Tìm kiếm sẽ lọc khách hàng theo từ khóa!");
  };

  const handleFilterCustomer = () => {
    alert("Chức năng Lọc khách hàng sẽ áp dụng bộ lọc!");
  };

  const handleExportData = () => {
    alert("Chức năng Xuất dữ liệu sẽ tải file danh sách khách hàng!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f1e9] to-[#fff] dark:from-[#1a1a1a] dark:to-[#2a2a2a] text-[#5a3e2b] dark:text-[#f5f5f5] p-6 md:p-12 font-sans">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-6 animate-fadeInUp">
        Quản lý Khách hàng
      </h1>
      <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 animate-fadeInUp delay-200">
        Theo dõi và quản lý thông tin khách hàng một cách dễ dàng.
      </p>

      {/* Action Buttons */}
      <div className="mb-6 flex flex-wrap gap-4 justify-end">
        <button
          onClick={handleAddCustomer}
          className="flex items-center px-4 py-2 bg-[#d2b48c] dark:bg-gray-700 text-white dark:text-[#f5f5f5] rounded-full hover:bg-[#c9a978] dark:hover:bg-gray-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
        >
          <UserPlus className="mr-2 h-5 w-5" /> Thêm khách hàng
        </button>
        <button
          onClick={handleEditCustomer}
          className="flex items-center px-4 py-2 bg-[#f3e5d0] dark:bg-gray-800 text-[#5a3e2b] dark:text-[#f5f5f5] rounded-full hover:bg-[#e6d2aa] dark:hover:bg-gray-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
        >
          <Edit className="mr-2 h-5 w-5" /> Sửa thông tin
        </button>
        <button
          onClick={handleDeleteCustomer}
          className="flex items-center px-4 py-2 bg-[#e6d2aa] dark:bg-gray-800 text-[#5a3e2b] dark:text-[#f5f5f5] rounded-full hover:bg-[#d2b48c] dark:hover:bg-gray-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
        >
          <Trash className="mr-2 h-5 w-5" /> Xóa khách hàng
        </button>
        <button
          onClick={handleSearchCustomer}
          className="flex items-center px-4 py-2 bg-[#d2b48c] dark:bg-gray-700 text-white dark:text-[#f5f5f5] rounded-full hover:bg-[#c9a978] dark:hover:bg-gray-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
        >
          <Search className="mr-2 h-5 w-5" /> Tìm kiếm
        </button>
        <button
          onClick={handleFilterCustomer}
          className="flex items-center px-4 py-2 bg-[#f3e5d0] dark:bg-gray-800 text-[#5a3e2b] dark:text-[#f5f5f5] rounded-full hover:bg-[#e6d2aa] dark:hover:bg-gray-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
        >
          <Filter className="mr-2 h-5 w-5" /> Lọc khách hàng
        </button>
        <button
          onClick={handleExportData}
          className="flex items-center px-4 py-2 bg-[#e6d2aa] dark:bg-gray-800 text-[#5a3e2b] dark:text-[#f5f5f5] rounded-full hover:bg-[#d2b48c] dark:hover:bg-gray-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
        >
          <Download className="mr-2 h-5 w-5" /> Xuất dữ liệu
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f3e5d0] dark:bg-gray-800 text-[#5a3e2b] dark:text-[#f5f5f5]">
              <tr>
                <th className="p-4 font-semibold">Ảnh</th>
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Tên</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Số điện thoại</th>
                <th className="p-4 font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-[#f3e5d0]/50 dark:border-gray-700 hover:bg-[#f3e5d0]/50 dark:hover:bg-gray-800/50 transition-colors duration-300"
                >
                  <td className="p-4">
                    <img
                      src={`/images/customer-${customer.id}.jpg`}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                      }}
                    />
                  </td>
                  <td className="p-4">{customer.id}</td>
                  <td className="p-4">{customer.name}</td>
                  <td className="p-4">{customer.email}</td>
                  <td className="p-4">{customer.phone}</td>
                  <td className="p-4">
                    <button
                      onClick={handleEditCustomer}
                      className="mr-2 text-[#5a3e2b] dark:text-[#f5f5f5] hover:text-[#c9a978] dark:hover:text-[#c9a978] transition"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleDeleteCustomer}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}