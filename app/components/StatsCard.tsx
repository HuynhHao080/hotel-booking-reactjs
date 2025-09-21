import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  color?: string; // gradient hoặc bg
  icon?: React.ReactNode;
}

export default function StatsCard({
  title,
  value,
  color = "from-[#d2b48c] to-[#f3e5d0]",
  icon,
}: StatsCardProps) {
  return (
    <div
      className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition bg-gradient-to-r ${color} flex items-center gap-4`}
    >
      {/* Icon */}
      {icon && (
        <div className="bg-white/30 p-3 rounded-xl text-[#5a3e2b]">
          {icon}
        </div>
      )}

      {/* Nội dung */}
      <div>
        <h3 className="text-sm md:text-base font-medium text-[#5a3e2b]/80">
          {title}
        </h3>
        <p className="mt-1 text-2xl md:text-3xl font-bold text-[#5a3e2b]">
          {value}
        </p>
      </div>
    </div>
  );
}
