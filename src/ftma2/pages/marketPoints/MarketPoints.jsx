import React, { useState } from "react";
import { GiCorn } from "react-icons/gi";
import Select from "react-select";
import { Download, Plus, SlidersHorizontal } from "lucide-react";
import { FaEllipsis } from "react-icons/fa6";
import customSelectStyles2 from "../../../styles/CustomSelectStyles2";
import MarketPointFilters from "./MarketPointFilters";

const MarketPoints = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  return (
    <div className="bg-slate-100 p-2">
      {/* header */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 p-3 bg-amber-50 rounded-lg">
            <GiCorn className="w-6 h-6 text-amber-600" />{" "}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Market Points
            </h2>
            <p className="text-sm text-gray-600">
              Providing agricultural support and resources to local farmers
            </p>
          </div>
        </div>
      </div>
      <div className="justify-end flex">
        <button
          className="flex items-center cursor-pointer"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="ml-2 mr-2">
            {showAdvancedFilters ? "Hide Filters" : "Show Filters"}
          </span>
        </button>
      </div>
      {/* Filters Row */}
      <MarketPointFilters showAdvancedFilters={showAdvancedFilters} />

      {/* table */}
    </div>
  );
};

export default MarketPoints;
