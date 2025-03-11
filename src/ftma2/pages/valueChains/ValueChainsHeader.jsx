import React from "react";
import { GiCorn } from "react-icons/gi";

const ValueChainsHeader = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6 border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 p-3 bg-amber-50 rounded-lg">
          <GiCorn className="w-6 h-6 text-amber-600" />{" "}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Value Chains</h2>
          <p className="text-sm text-gray-600">
            Providing agricultural support and resources to local farmers
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValueChainsHeader;
