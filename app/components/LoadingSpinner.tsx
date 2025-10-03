import { useUI } from "../contexts/UIContext";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const { isDark } = useUI();

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-t-transparent ${
        isDark ? 'border-gray-600 border-t-gray-400' : 'border-gray-300 border-t-blue-500'
      }`}></div>
      {text && (
        <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {text}
        </p>
      )}
    </div>
  );
}
