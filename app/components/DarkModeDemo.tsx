import DarkModeToggle from "./DarkModeToggle";

export default function DarkModeDemo() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Dark Mode Demo</h1>

      {/* Dark Mode toàn cục */}
      <div className="border-2 border-gray-300 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Dark Mode Toàn Cục</h2>
          <DarkModeToggle mode="global" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Dark mode này sẽ áp dụng cho toàn bộ trang web. Khi bật, toàn bộ giao diện sẽ chuyển sang chế độ tối.
        </p>
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p className="text-gray-800 dark:text-gray-200">
            Đây là nội dung ví dụ với background sáng/tối tùy theo chế độ dark mode toàn cục.
          </p>
        </div>
      </div>

      {/* Dark Mode cục bộ */}
      <div className="border-2 border-gray-300 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Dark Mode Cục Bộ</h2>
          <DarkModeToggle targetElement="local-dark-section" mode="local" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Dark mode này chỉ áp dụng cho phần tử cụ thể bên dưới. Chỉ phần này sẽ chuyển sang chế độ tối khi bật.
        </p>

        {/* Phần tử áp dụng dark mode cục bộ */}
        <div id="local-dark-section" className="mt-4 p-4 bg-white border-2 border-blue-300 rounded transition-all duration-300">
          <p className="text-gray-800">
            Đây là nội dung ví dụ với background sáng. Khi bật dark mode cục bộ, chỉ phần tử này sẽ chuyển sang chế độ tối.
          </p>
          <div className="mt-2 p-2 bg-gray-100 rounded">
            <p className="text-gray-700">Phần tử bên trong cũng sẽ được áp dụng dark mode cục bộ.</p>
          </div>
        </div>
      </div>

      {/* So sánh */}
      <div className="border-2 border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">So Sánh</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border rounded">
            <h3 className="font-medium mb-2">Bên ngoài dark mode cục bộ</h3>
            <p className="text-gray-600">Phần này luôn giữ nguyên giao diện sáng.</p>
          </div>
          <div id="local-dark-section" className="p-4 bg-white border rounded">
            <h3 className="font-medium mb-2">Bên trong dark mode cục bộ</h3>
            <p className="text-gray-600">Phần này sẽ chuyển sang tối khi bật dark mode cục bộ.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
