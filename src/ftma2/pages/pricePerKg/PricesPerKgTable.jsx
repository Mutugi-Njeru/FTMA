import React from "react";
import { FaEllipsis } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";

const PricesPerKgTable = ({ isLoading, tableData }) => {
  return (
    <div className="mt-4 p-2 rounded-lg bg-white ">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#D97706" size={50} />
        </div>
      ) : (
        <table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                  key={item.productPriceId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate"
                  >
                    {item.productPriceId}
                  </td>
                  <td className="px-3 py-2 truncate">{item.product}</td>
                  <td className="px-3 py-2 truncate"> {item.quantityInKgs}</td>
                  <td className="px-3 py-2 truncate">{item.market}</td>
                  <td className="px-3 py-2 truncate"> {item.county}</td>
                  <td className="px-3 py-2 truncate">{item.fscName}</td>
                  <td className="px-3 py-2 truncate">{item.farmPricePerKg}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.retailPricePerKg}
                  </td>
                  <td className="px-3 py-2 truncate">
                    {" "}
                    {item.wholesalePricePerKg}
                  </td>
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

export default PricesPerKgTable;
