import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEllipsis } from "react-icons/fa6";

const capitalizeFirstLetter = (str) => {
  if (!str) return str; // Handle empty or undefined strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const FscTable = ({ isLoading, filteredData }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm  border border-gray-100">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#D97706" size={50} />
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-3 py-3">ID</th>
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Phone Number</th>
                <th className="px-3 py-3">Market</th>
                <th className="px-3 py-3">County</th>
                <th className="px-3 py-3">Subcounty</th>
                <th className="px-3 py-3">Ward</th>
                <th className="px-3 py-3">Points</th>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.farmServiceCenterId}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td
                      scope="row"
                      className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate"
                    >
                      {item.farmServiceCenterId}
                    </td>
                    <td className="px-3 py-2 truncate">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="px-3 py-2 truncate"> {item.msisdn}</td>
                    <td className="px-3 py-2 truncate">{item.market}</td>
                    <td className="px-3 py-2 truncate"> {item.county}</td>
                    <td className="px-3 py-2 truncate">
                      {capitalizeFirstLetter(item.subCounty)}
                    </td>
                    <td className="px-3 py-2 truncate">
                      {capitalizeFirstLetter(item.ward)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {item.marketPointsBalance}
                    </td>
                    <td className="px-3 py-2 truncate"> {item.createdAt}</td>
                    <td className="px-3 py-2 flex justify-center items-center">
                      <button
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="More actions"
                      >
                        <FaEllipsis />
                      </button>
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

export default FscTable;
