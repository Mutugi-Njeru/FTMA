import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { BiTrash } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";

const UsersTable = ({ isLoading, tableData, handleEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
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
    <div className="mt-4 p-2 rounded-lg bg-white ">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#D97706" size={50} />
        </div>
      ) : (
        <table className="w-full rounded-lg text-xs text-left rtl:text-right">
          <thead className="text-xs text-gray-700 border-b">
            <tr>
              <th className="px-2 py-2">ID</th>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Username</th>
              <th className="px-2 py-2">Mobile</th>
              <th className="px-2 py-2">Created At</th>
              <th className="px-2 py-2">Updated At</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item) => (
                <tr
                  key={item.userId}
                  className="bg-white border-b hover:bg-gray-50 "
                >
                  <td
                    scope="row"
                    className="px-2 py-2 font-medium text-blue-400 whitespace-nowrap truncate"
                  >
                    #{item.userId}
                  </td>
                  <td className="px-2 py-2 truncate">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="px-2 py-2 truncate"> {item.email}</td>
                  <td className="px-2 py-2 ">{truncateText(item.username)} </td>
                  <td className="px-2 py-2 truncate">{item.msisdn}</td>
                  <td className="px-2 py-2 truncate">
                    {truncateText(item.createdAt, 10)}{" "}
                  </td>
                  <td className="px-2 py-2 truncate">
                    {truncateText(item.updatedAt, 10)}{" "}
                  </td>
                  <td className="px-2 py-2 truncate">
                    <span
                      className={`inline-block px-3 py-1 rounded-3xl text-xs font-semibold text-center w-[60px] ${
                        item.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-2 py-2 flex justify-center items-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 hover:underline flex items-center space-x-1"
                      aria-label="Edit"
                      onClick={() => handleEdit(item.userId)}
                    >
                      <MdOutlineEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 hover:underline flex items-center space-x-1"
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

export default UsersTable;
