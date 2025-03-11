import React from "react";
import { FaEllipsis } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (str) => {
  if (!str) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const MarketsTable = ({ isLoading, tableData }) => {
  return (
    <div className="mt-4 p-2 rounded-lg bg-white ">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#D97706" size={50} />
        </div>
      ) : (
        <table className="w-full rounded-lg text-xs text-left rtl:text-right ">
          <thead className="text-xs text-gray-700 border-b">
            <tr>
              <th className="px-3 py-3">ID</th>
              <th className="px-3 py-3">Market Title</th>
              <th className="px-3 py-3">County</th>
              <th className="px-3 py-3">Subcounty</th>
              <th className="px-3 py-3">Ward</th>
              <th className="px-3 py-3">Date Created</th>
              <th className="px-3 py-3">Date Updated</th>
              <th className="px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item) => (
                <tr
                  key={item.marketId}
                  className="bg-white border-b  hover:bg-gray-50"
                >
                  <td
                    scope="row"
                    className="px-3 py-1.5 font-medium text-blue-400 whitespace-nowrap truncate"
                  >
                    #{item.marketId}
                  </td>
                  <td className="px-3 py-1.5 truncate">
                    {capitalizeFirstLetter(item.title)}
                  </td>
                  <td className="px-3 py-1.5 truncate">
                    {capitalizeFirstLetter(item.county)}
                  </td>
                  <td className="px-3 py-1.5 truncate">
                    {capitalizeFirstLetter(item.subCounty)}
                  </td>
                  <td className="px-3 py-1.5 truncate">
                    {capitalizeFirstLetter(item.ward)}
                  </td>
                  <td className="px-3 py-1.5 truncate">{item.createdAt}</td>
                  <td className="px-3 py-1.5 truncate">{item.updatedAt}</td>
                  <td className="px-3 py-1.5 truncate">
                    <span className="bg-green-100 text-green-800 rounded-full px-3 py-1">
                      Active
                    </span>
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
      )}
    </div>
  );
};

export default MarketsTable;
