interface StatsCardProps {
  title: string;
  value: string;
  color?: string; // màu nền, mặc định nâu-be
}

export default function StatsCard({
  title,
  value,
  color = "bg-[#d2b48c]",
}: StatsCardProps) {
  return (
    <div
      className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center ${color}`}
    >
      <h3 className="text-lg md:text-xl font-semibold text-[#5a3e2b]">
        {title}
      </h3>
      <p className="mt-2 text-2xl md:text-3xl font-bold text-[#5a3e2b]">
        {value}
      </p>
    </div>
  );
}
