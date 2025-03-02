import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { ClipLoader } from "react-spinners";

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (str) => {
  if (!str) return str; // Handle empty or undefined strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const Table = ({ isLoading, filteredData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#4F46E5" size={50} />
        </div>
      ) : (
        <div className="">
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                {[
                  "ID",
                  "Name",
                  "Phone Number",
                  "Market",
                  "County",
                  "Subcounty",
                  "Ward",
                  "Points",
                  "Date",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.farmServiceCenterId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-2 py-1 text-sm font-medium text-gray-900">
                      {item.farmServiceCenterId}
                    </td>
                    <td className="px-2 py-1 text-sm text-gray-700 font-medium">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-700">
                      {item.msisdn}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-700">
                      {item.market}
                    </td>
                    <td className="px-2 py-1 text-sm text-gray-700">
                      {item.county}
                    </td>
                    <td className="px-2 py-1 text-sm text-gray-700">
                      {capitalizeFirstLetter(item.subCounty)}
                    </td>
                    <td className="px-2 py-1 text-sm text-gray-700">
                      {capitalizeFirstLetter(item.ward)}
                    </td>
                    <td className="px-2 py-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.marketPointsBalance}
                      </span>
                    </td>
                    <td className="px-2 py-1 text-sm text-gray-700">
                      {item.createdAt}
                    </td>
                    <td className="px-2 py-1 text-sm">
                      <div className="flex items-center space-x-3">
                        <button className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-6 text-sm text-gray-500 text-center"
                  >
                    No data found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
