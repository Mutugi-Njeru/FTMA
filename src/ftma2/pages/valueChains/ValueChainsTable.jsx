import { AlertCircle, ArrowUpDown, Loader2 } from "lucide-react";
import React from "react";

const ValueChainsTable = ({
  filteredData,
  loading,
  formatDate,
  getStatusBadgeClass,
}) => {
  return (
    <div className="mt-3 rounded-xl p-1 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="rounded-t-lg">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("productId")}
            >
              <div className="flex items-center space-x-1">
                <span>ID</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("productName")}
            >
              <div className="flex items-center space-x-1">
                <span>Name</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("createdBy")}
            >
              <div className="flex items-center space-x-1">
                <span>Created By</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("createdAt")}
            >
              <div className="flex items-center space-x-1">
                <span>Created At</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("updatedAt")}
            >
              <div className="flex items-center space-x-1">
                <span>Updated At</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("updatedBy")}
            >
              <div className="flex items-center space-x-1">
                <span>Updated By</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.productId}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-700">
                  {item.productName}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {item.createdBy || "N/A"}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
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
