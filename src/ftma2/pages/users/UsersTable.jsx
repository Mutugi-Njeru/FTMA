import React from "react";
import { FaEllipsis } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";

const UsersTable = ({ isLoading, tableData }) => {
  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

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
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Username</th>
              <th className="px-3 py-3">Mobile</th>
              <th className="px-3 py-3">Created At</th>
              <th className="px-3 py-3">Updated At</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item) => (
                <tr
                  key={item.userId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate"
                  >
                    {item.userId}
                  </td>
                  <td className="px-3 py-2 truncate">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="px-3 py-2 truncate"> {item.email}</td>
                  <td className="px-3 py-2 truncate">
                    {truncateText(item.username, 10)}{" "}
                    {/* Truncate username to 10 characters */}
                  </td>
                  <td className="px-3 py-2 truncate">{item.msisdn}</td>
                  <td className="px-3 py-2 truncate">
                    {truncateText(item.createdAt, 10)}{" "}
                    {/* Truncate createdAt to 10 characters */}
                  </td>
                  <td className="px-3 py-2 truncate">
                    {truncateText(item.updatedAt, 10)}{" "}
                    {/* Truncate updatedAt to 10 characters */}
                  </td>
                  <td className="px-3 py-2 truncate">
                    {item.active ? "Active" : "Inactive"}
                  </td>
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
      )}
    </div>
  );
};

export default UsersTable;
