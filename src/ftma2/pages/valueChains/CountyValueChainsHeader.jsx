import React from "react";
import { GiWheat } from "react-icons/gi";

const CountyValueChainsHeader = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6 border">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 p-3 bg-amber-50 rounded-lg">
          <GiWheat className="w-6 h-6 text-amber-600" />{" "}
          {/* Replaced Home icon with Corn icon */}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            County Value Chains
          </h2>
          <p className="text-sm text-gray-600">
            Providing agricultural support and resources to local farmers
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountyValueChainsHeader;
