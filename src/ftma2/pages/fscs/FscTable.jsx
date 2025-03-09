import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import edit and delete icons
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the modal component

const capitalizeFirstLetter = (str) => {
  if (!str) return str; // Handle empty or undefined strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const FscTable = ({ isLoading, filteredData, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = (userId) => {
    onDelete(itemToDelete.userId);
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
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
                    <td className="px-3 py-2 flex justify-center items-center space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                        aria-label="Edit"
                        onClick={() => onEdit(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                        aria-label="Delete"
                        onClick={() => handleDeleteClick(item)}
                      >
                        <FaTrash />
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

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        item={itemToDelete}
      />
    </div>
  );
};

export default FscTable;
