import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { MdOutlineEdit } from "react-icons/md";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { BiTrash } from "react-icons/bi";

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

  const handleConfirmDelete = () => {
    onDelete(itemToDelete.userId);
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="bg-white border border-gray-100">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#D97706" size={50} />
        </div>
      ) : (
        <div className="text-center">
          <table className="w-full text-xs font-sans text-left rtl:text-right">
            <thead className="text-xs border-b border-gray-200">
              {" "}
              {/* Added border here */}
              <tr>
                <th className="px-2 py-3">ID</th>
                <th className="px-2 py-3">Name</th>
                <th className="px-2 py-3">Phone Number</th>
                <th className="px-2 py-3">Market</th>
                <th className="px-2 py-3">County</th>
                <th className="px-2 py-3">Subcounty</th>
                <th className="px-2 py-3">Ward</th>
                <th className="px-2 py-3">Points</th>
                <th className="px-2 py-3">Date</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.farmServiceCenterId}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td
                      scope="row"
                      className="px-2 py-2.5 font-medium text-blue-500 whitespace-nowrap truncate"
                    >
                      #{item.farmServiceCenterId}
                    </td>
                    <td className="px-2 py-2.5 truncate">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="px-2 py-2.5 truncate"> {item.msisdn}</td>
                    <td className="px-2 py-2.5 truncate">{item.market}</td>
                    <td className="px-2 py-2.5 truncate"> {item.county}</td>
                    <td className="px-2 py-2.5 truncate">
                      {capitalizeFirstLetter(item.subCounty)}
                    </td>
                    <td className="px-2 py-2.5 truncate">
                      {capitalizeFirstLetter(item.ward)}
                    </td>
                    <td className="px-2 py-2.5 whitespace-nowrap">
                      {item.marketPointsBalance}
                    </td>
                    <td className="px-2 py-2.5 truncate"> {item.createdAt}</td>
                    <td className="px-2 py-2.5 flex justify-center items-center space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 hover:underline flex items-center space-x-1"
                        aria-label="Edit"
                        onClick={() => onEdit(item)}
                      >
                        <MdOutlineEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        className="text-red-500 hover:underline hover:text-red-700 flex items-center space-x-1"
                        aria-label="Delete"
                        onClick={() => handleDeleteClick(item)}
                      >
                        <BiTrash />
                        <span>Delete</span>
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
