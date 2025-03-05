import React, { useState } from "react";
import { Download, Plus, SlidersHorizontal } from "lucide-react";
import { FaEllipsis } from "react-icons/fa6";
import PrriceRangeFilters from "./PrriceRangeFilters";
import PriceRangeHeader from "./PriceRangeHeader";

const PriceRanges = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  return (
    <div className="bg-slate-100 p-2">
      <PriceRangeHeader />

      <div className="flex justify-between mb-2">
        <button className="flex items-center gap-2 px-4 py-2 border bg-white text-black rounded-lg hover:bg-amber-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Price</span>
        </button>
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
          <button className="flex items-center cursor-pointer">
            <Download className="w-4 h-4" />
            <span className="ml-2 mr-2">Export Csv</span>
          </button>
        </div>
      </div>

      {/* Filters*/}
      <PrriceRangeFilters showAdvancedFilters={showAdvancedFilters} />

      {/* table */}
      <div className="mt-4 p-2 rounded-lg bg-white ">
        <table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-3 py-3">ID</th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Unit of Measure</th>
              <th className="px-3 py-3">Min Price</th>
              <th className="px-3 py-3">Max price </th>
              <th className="px-3 py-3">Created By</th>
              <th className="px-3 py-3">Date Created</th>
              <th className="px-3 py-3">Status</th>
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

export default PriceRanges;
