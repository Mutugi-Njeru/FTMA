import { AlertCircle, Loader2 } from "lucide-react";
import React from "react";

const ValueChainsTable = ({
  filteredData,
  loading,
  formatDate,
  getStatusBadgeClass,
}) => {
  return (
    <div className="mt-3 rounded-xl bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="">
          <tr className="rounded-t-lg">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium  tracking-wider cursor-pointer"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("createdBy")}
            >
              Created By
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("createdAt")}
            >
              Created At
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("updatedAt")}
            >
              Updated At
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("updatedBy")}
            >
              Updated By
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("status")}
            >
              <div className="flex items-center space-x-1">
                <span>Status</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan="7" className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 text-amber-600 animate-spin mb-2" />
                  <p className="text-gray-500">Loading value chains...</p>
                </div>
              </td>
            </tr>
          ) : filteredData.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-gray-500 font-medium">
                    No value chains found
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr
                key={item.productId}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-blue-400 ">
                  #{item.productId}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium ">
                  {item.productName}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm ">
                  {item.createdBy || "N/A"}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm ">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm ">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm ">
                  {item.updatedBy || "N/A"}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      item.status
                    )}`}
                  >
                    {item.status || "Unknown"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ValueChainsTable;
