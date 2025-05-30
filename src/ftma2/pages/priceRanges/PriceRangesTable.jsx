import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const PriceRangesTable = ({ isLoading, tableData }) => {
  return (
    <div className="mt-4 p-2 rounded-lg bg-white shadow-sm ">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#D97706" size={50} />
        </div>
      ) : (
        <table className="w-full rounded-lg text-xs text-left rtl:text-right">
          <thead className="text-sm border-b">
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
            {tableData.length > 0 ? (
              tableData.map((item) => (
                <tr
                  key={item.priceRangeSettingId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    className="px-3 py-1 font-medium text-blue-400 whitespace-nowrap dark:text-white truncate"
                  >
                    #{item.priceRangeSettingId}
                  </td>
                  <td className="px-3 py-1 truncate">{item.productName}</td>
                  <td className="px-3 py-1 truncate">
                    {" "}
                    {item.measurementUnit}
                  </td>
                  <td className="px-3 py-1 truncate">{item.minPrice}</td>
                  <td className="px-3 py-1 truncate">{item.maxPrice}</td>
                  <td className="px-3 py-1 truncate">{item.createdBy}</td>
                  <td className="px-3 py-1 truncate">{item.createdAt}</td>
                  <td className="px-3 py-1 truncate">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-center w-[60px] ${
                        item.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
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

export default PriceRangesTable;
