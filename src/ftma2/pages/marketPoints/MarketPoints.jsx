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
      <div className="mt-4 p-2 rounded-lg bg-white ">
        <table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-3 py-3">User</th>
              <th className="px-3 py-3">County</th>
              <th className="px-3 py-3">Market</th>
              <th className="px-3 py-3">Mobile</th>
              <th className="px-3 py-3">Points</th>
              <th className="px-3 py-3">Equivalent</th>
              <th className="px-3 py-3">Reward</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              key=""
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td
                scope="row"
                className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate"
              >
                10
              </td>
              <td className="px-3 py-2 truncate">John Doe</td>
              <td className="px-3 py-2 truncate"> 25467864666</td>
              <td className="px-3 py-2 truncate">Maguna</td>
              <td className="px-3 py-2 truncate"> Tharaka Nith</td>
              <td className="px-3 py-2 truncate">Maara</td>
              <td className="px-3 py-2 truncate">Marima</td>
              <td className="px-4 py-3 whitespace-nowrap">78</td>
              <td className="px-3 py-2 truncate"> 207865543</td>
              <td className="px-3 py-2 flex justify-center items-center">
                <button
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="More actions"
                >
                  <FaEllipsis />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketPoints;
