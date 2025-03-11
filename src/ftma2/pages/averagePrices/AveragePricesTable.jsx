import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (str) => {
  if (!str) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const AveragePricesTable = ({ isLoading, tableData }) => {
  return (
    <div className="mt-4 p-2 rounded-lg bg-white ">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#D97706" size={50} />
        </div>
      ) : (
        <table className="w-full rounded-lg text-xs text-left rtl:text-right">
          <thead className="text-xs border-b border-gray-200">
            <tr>
              <th className="px-3 py-3">ID</th>
              <th className="px-3 py-3">Value Chain</th>
              <th className="px-3 py-3">Quantity (kg)</th>
              <th className="px-3 py-3">Market</th>
              <th className="px-3 py-3">County</th>
              <th className="px-3 py-3">Fsc Name</th>
              <th className="px-3 py-3">Farm Price</th>
              <th className="px-3 py-3">Retail Price</th>
              <th className="px-3 py-3">Wholesale Price</th>
              <th className="px-3 py-3">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item) => (
                <tr
                  key={item.productId}
                  className="bg-white border-b hover:bg-gray-50 "
                >
                  <td
                    scope="row"
                    className="px-3 py-2 font-medium text-blue-400 whitespace-nowrap  truncate"
                  >
                    #{item.productId}
                  </td>
                  <td className="px-3 py-2 truncate">
                    {capitalizeFirstLetter(item.product)}
                  </td>
                  <td className="px-3 py-2 truncate"> {item.quantityInKgs}</td>
                  <td className="px-3 py-2 truncate">
                    {capitalizeFirstLetter(item.market)}
                  </td>
                  <td className="px-3 py-2 truncate">
                    {capitalizeFirstLetter(item.county)}
                  </td>
                  <td className="px-3 py-2 truncate">{item.fscName}</td>
                  <td className="px-3 py-2 truncate">{item.farmPrice}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.retailPrice}
                  </td>
                  <td className="px-3 py-2 truncate"> {item.wholesalePrice}</td>
                  <td className="px-3 py-2 truncate"> {item.createdAt}</td>
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

export default AveragePricesTable;
