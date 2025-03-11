import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const PricesPerKgTable = ({ isLoading, tableData }) => {
  return (
    <div className="mt-4 p-2 rounded-lg bg-white ">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#D97706" size={50} />
        </div>
      ) : (
        <table className="w-full rounded-lg text-xs text-left rtl:text-right">
          <thead className="text-sm border-b border-gray-200">
            <tr>
              <th className="px-2 py-2">ID</th>
              <th className="px-2 py-2">Value Chain</th>
              <th className="px-2 py-2 truncate max-w-[80px]">Quantity (kg)</th>
              <th className="px-2 py-2">Market</th>
              <th className="px-2 py-2">County</th>
              <th className="px-2 py-2">Fsc Name</th>
              <th className="px-2 py-2 truncate max-w-[100px]">Farm Price</th>
              <th className="px-2 py-2 truncate max-w-[100px]">Retail Price</th>
              <th className="px-2 py- truncate max-w-[80px]">
                Wholesale Price
              </th>
              <th className="px-2 py-2">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item) => (
                <tr
                  key={item.productPriceId}
                  className="bg-white border-b  hover:bg-gray-50 "
                >
                  <td
                    scope="row"
                    className="px-2 py-2 font-medium text-blue-400 whitespace-nowrap truncate"
                  >
                    #{item.productPriceId}
                  </td>
                  <td className="px-2 py-2 truncate">{item.product}</td>
                  <td className="px-2 py-2 truncate"> {item.quantityInKgs}</td>
                  <td className="px-2 py-2 truncate">{item.market}</td>
                  <td className="px-2 py-2 truncate"> {item.county}</td>
                  <td className="px-2 py-2 truncate">{item.fscName}</td>
                  <td className="px-2 py-2 truncate">{item.farmPricePerKg}</td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    {item.retailPricePerKg}
                  </td>
                  <td className="px-2 py-2 truncate">
                    {" "}
                    {item.wholesalePricePerKg}
                  </td>
                  <td className="px-2 py-2 truncate max-w-[100px]">
                    {" "}
                    {item.createdAt}
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

export default PricesPerKgTable;
