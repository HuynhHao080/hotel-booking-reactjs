import DarkModeToggle from "./DarkModeToggle";

export default function LocalDarkModeExample() {
  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Ví dụ Dark Mode Cục Bộ</h1>

      {/* Ví dụ 1: Card sản phẩm */}
      <div className="border-2 border-gray-300 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Card Sản Phẩm</h2>
          <DarkModeToggle targetElement="product-card" mode="local" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card thường */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-medium mb-2">Card thường</h3>
            <p className="text-gray-600 text-sm">Card này không bị ảnh hưởng bởi dark mode cục bộ.</p>
            <div className="mt-3 p-3 bg-gray-100 rounded">
              <p className="text-gray-700">Nội dung bên trong card thường.</p>
            </div>
          </div>

          {/* Card với dark mode cục bộ */}
          <div id="product-card" className="border rounded-lg p-4 bg-white shadow-sm transition-all duration-300">
            <h3 className="font-medium mb-2">Card với dark mode cục bộ</h3>
            <p className="text-gray-600 text-sm">Card này sẽ chuyển sang dark mode khi bật toggle phía trên.</p>
            <div className="mt-3 p-3 bg-gray-100 rounded">
              <p className="text-gray-700">Nội dung bên trong cũng sẽ chuyển sang dark mode.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ví dụ 2: Panel thông tin */}
      <div className="border-2 border-gray-300 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Panel Thông Tin</h2>
          <DarkModeToggle targetElement="info-panel" mode="local" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Thông tin chung</h3>
            <p className="text-blue-700 text-sm">Panel này giữ nguyên giao diện sáng.</p>
          </div>

          <div id="info-panel" className="p-4 bg-white border-2 border-green-300 rounded-lg transition-all duration-300">
            <h3 className="font-medium text-gray-900 mb-2">Panel dark mode</h3>
            <p className="text-gray-600 text-sm">Panel này sẽ chuyển sang dark mode cục bộ.</p>
            <ul className="mt-2 space-y-1">
              <li className="text-gray-600 text-sm">• Thông tin chi tiết</li>
              <li className="text-gray-600 text-sm">• Dữ liệu thống kê</li>
              <li className="text-gray-600 text-sm">• Báo cáo tổng hợp</li>
            </ul>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-purple-900 mb-2">Thông báo</h3>
            <p className="text-purple-700 text-sm">Panel này cũng giữ nguyên giao diện sáng.</p>
          </div>
        </div>
      </div>

      {/* Ví dụ 3: Modal/Dialog */}
      <div className="border-2 border-gray-300 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Modal/Dialog</h2>
          <DarkModeToggle targetElement="modal-content" mode="local" />
        </div>

        <div className="space-y-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Mở Modal (Giao diện thường)
          </button>

          <div className="relative">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
              Mở Modal Dark Mode
            </button>

            {/* Modal với dark mode cục bộ */}
            <div id="modal-content" className="absolute top-full left-0 mt-2 w-80 p-4 bg-white border rounded-lg shadow-lg transition-all duration-300 z-10">
              <h3 className="font-medium text-gray-900 mb-3">Modal với Dark Mode Cục Bộ</h3>
              <p className="text-gray-600 text-sm mb-3">
                Modal này sẽ có giao diện tối khi bật dark mode cục bộ phía trên.
              </p>
              <div className="p-3 bg-gray-100 rounded mb-3">
                <p className="text-gray-700 text-sm">Nội dung bên trong modal cũng sẽ chuyển sang dark mode.</p>
              </div>
              <div className="flex justify-end space-x-2">
                <button className="px-3 py-1 text-gray-600 border rounded hover:bg-gray-50">
                  Hủy
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hướng dẫn sử dụng */}
      <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Cách sử dụng Dark Mode Cục Bộ</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
            <div>
              <p className="font-medium">Sử dụng DarkModeToggle component</p>
              <p className="text-gray-600">Import và sử dụng component DarkModeToggle với các props phù hợp.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
            <div>
              <p className="font-medium">Thiết lập targetElement</p>
              <p className="text-gray-600">Chỉ định ID của element cần áp dụng dark mode thông qua prop targetElement.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
            <div>
              <p className="font-medium">Chế độ local</p>
              <p className="text-gray-600">Đặt mode="local" để kích hoạt dark mode cục bộ thay vì toàn cục.</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white rounded border-l-4 border-blue-500">
          <p className="text-sm text-gray-700">
            <strong>Lưu ý:</strong> Dark mode cục bộ chỉ ảnh hưởng đến element được chỉ định và các element con bên trong nó,
            không ảnh hưởng đến toàn bộ trang web như dark mode toàn cục.
          </p>
        </div>
      </div>
    </div>
  );
}
