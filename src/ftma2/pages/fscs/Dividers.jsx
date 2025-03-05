import React from "react";
import { Calendar, Building2, MapPin, Map } from "lucide-react";

const StatCard = ({ icon, title, value, hasDivider = true }) => (
  <div className="relative flex flex-col items-center justify-center py-4 px-2">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    </div>
    <p className="text-xl font-bold text-gray-800">{value}</p>
    {hasDivider && (
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gray-200"></div>
    )}
  </div>
);
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const Dividers = ({
  totalFscs,
  totalCounties,
  totalSubcounties,
  totalWards,
}) => {
  const totalDistinctCounties = totalCounties ? totalCounties.length : 0;

  const totalDistinctSubCounties = totalSubcounties
    ? totalSubcounties.length
    : 0;
  const totalDistinctWards = totalWards ? totalWards.length : 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 bg-white rounded-xl shadow-sm mb-6 overflow-hidden border border-gray-100">
      <StatCard
        icon={<Calendar className="w-4 h-4 text-amber-600" />}
        title="Today"
        value={formattedDate}
      />

      <StatCard
        icon={<Building2 className="w-4 h-4 text-amber-600" />}
        title="Total FSCs"
        value={totalFscs}
      />

      <StatCard
        icon={<MapPin className="w-4 h-4 text-amber-600" />}
        title="Total Counties"
        value={totalDistinctCounties}
      />

      <StatCard
        icon={<Map className="w-4 h-4 text-amber-600" />}
        title="Total Subcounties"
        value={totalDistinctSubCounties}
      />

      <StatCard
        icon={<MapPin className="w-4 h-4 text-amber-600" />}
        title="Total Wards"
        value={totalDistinctWards}
        hasDivider={false}
      />
    </div>
  );
};

export default Dividers;
