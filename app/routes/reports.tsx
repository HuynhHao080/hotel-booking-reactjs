import { FileText, Download, Filter, BarChart3 } from "lucide-react";

export default function Reports() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-[#f4ede4] text-[#4b2e1e] p-6 md:p-12 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 animate-fadeInUp">
        <FileText className="h-10 w-10 text-[#b68d40]" />
        <h1 className="text-4xl font-extrabold tracking-tight">Báo cáo</h1>
      </div>
      <p className="text-lg mb-10 text-gray-700 animate-fadeInUp delay-200">
        Xem và quản lý các báo cáo chi tiết về khách sạn.
      </p>

      {/* Action Buttons */}
      <div className="mb-8 flex flex-wrap gap-4 justify-end">
        <button className="flex items-center px-5 py-3 bg-[#d2b48c] text-white rounded-2xl hover:bg-[#c9a978] transition-all duration-300 font-medium shadow-md hover:shadow-xl">
          <Filter className="mr-2 h-5 w-5" /> Lọc báo cáo
        </button>
        <button className="flex items-center px-5 py-3 bg-[#e6d2aa] text-[#4b2e1e] rounded-2xl hover:bg-[#d2b48c] transition-all duration-300 font-medium shadow-md hover:shadow-xl">
          <Download className="mr-2 h-5 w-5" /> Xuất báo cáo
        </button>
      </div>

      {/* Reports Placeholder */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-8 animate-fadeInUp delay-300">
        <div className="text-center mb-6">
          <BarChart3 className="mx-auto h-12 w-12 text-[#b68d40] mb-3" />
          <p className="text-[#6e4b33]/70 text-lg">
            Chưa có dữ liệu báo cáo. Vui lòng chờ backend tích hợp!
          </p>
        </div>

        {/* Placeholder for future charts/tables */}
        <div className="mt-6 h-72 bg-gradient-to-br from-[#f3e5d0] to-[#fdf8f3] rounded-2xl flex items-center justify-center border border-dashed border-[#d3b98e]/70">
          <span className="text-[#6e4b33]/60 font-medium">
            Biểu đồ hoặc bảng báo cáo sẽ hiển thị tại đây
          </span>
        </div>
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
