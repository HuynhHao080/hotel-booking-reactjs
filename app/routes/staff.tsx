import { Users, UserPlus, Edit, Trash } from "lucide-react";

export default function Staff() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-[#f4ede4] text-[#4b2e1e] p-6 md:p-12 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 animate-fadeInUp">
        <Users className="h-10 w-10 text-[#b68d40]" />
        <h1 className="text-4xl font-extrabold tracking-tight">Quản lý Nhân viên</h1>
      </div>
      <p className="text-lg mb-10 text-gray-700 animate-fadeInUp delay-200">
        Theo dõi và quản lý thông tin nhân viên trong khách sạn.
      </p>

      {/* Action Buttons */}
      <div className="mb-6 flex justify-end">
        <button
          className="flex items-center px-5 py-3 bg-gradient-to-r from-[#caa968] to-[#e4cfa3] 
                     text-[#4b2e1e] font-semibold rounded-2xl shadow-md hover:shadow-xl 
                     hover:from-[#b68d40] hover:to-[#d6b77a] transition-all duration-300"
        >
          <UserPlus className="mr-2 h-5 w-5" /> Thêm nhân viên
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 animate-fadeInUp delay-300">
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f3e5d0] text-[#4b2e1e]">
              <tr>
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Tên</th>
                <th className="p-4 font-semibold">Chức vụ</th>
                <th className="p-4 font-semibold text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-[#faf7f2] hover:bg-[#f3e5d0]/40 transition-colors duration-300">
                <td className="p-4">1</td>
                <td className="p-4">Nguyen Van C</td>
                <td className="p-4">Nhân viên lễ tân</td>
                <td className="p-4 text-center">
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#f3e5d0] transition"
                    title="Sửa"
                  >
                    <Edit className="h-5 w-5 text-[#4b2e1e]" />
                  </button>
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-100 transition ml-2"
                    title="Xóa"
                  >
                    <Trash className="h-5 w-5 text-red-600" />
                  </button>
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-[#faf7f2] hover:bg-[#f3e5d0]/40 transition-colors duration-300">
                <td className="p-4">2</td>
                <td className="p-4">Tran Thi D</td>
                <td className="p-4">Quản lý</td>
                <td className="p-4 text-center">
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#f3e5d0] transition"
                    title="Sửa"
                  >
                    <Edit className="h-5 w-5 text-[#4b2e1e]" />
                  </button>
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-100 transition ml-2"
                    title="Xóa"
                  >
                    <Trash className="h-5 w-5 text-red-600" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-[#6e4b33]/70 text-center text-lg">
          Dữ liệu nhân viên sẽ được cập nhật khi backend tích hợp!
        </p>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fadeInUp.delay-200 { animation-delay: 0.2s; }
        .animate-fadeInUp.delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}
