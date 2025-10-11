import { useEffect, useState } from "react";

interface LoadingAnimationProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "purple" | "orange";
  text?: string;
}

export default function LoadingAnimation({
  size = "md",
  color = "blue",
  text = "Đang tải..."
}: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Modern Spinner */}
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}>
          <div className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-transparent border-t-current ${colorClasses[color]} rounded-full animate-spin`}></div>
        </div>

        {/* Progress Ring */}
        <svg className={`absolute top-0 left-0 ${sizeClasses[size]} transform -rotate-90`} viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="100, 100"
            className={`${colorClasses[color]} opacity-20`}
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${progress}, 100`}
            className={colorClasses[color]}
          />
        </svg>
      </div>

      {/* Loading Text */}
      {text && (
        <div className="text-center">
          <p className={`text-sm ${colorClasses[color]} font-medium`}>
            {text}
          </p>
          <div className="flex justify-center mt-2">
            <div className={`flex space-x-1 ${colorClasses[color]}`}>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
