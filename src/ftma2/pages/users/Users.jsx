import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";
import axios from "axios";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const recordsPerPage = 15;

  const fetchData = async (currentPage, recordsPerPage) => {
    setIsLoading(true);
    try {
      let url =
        BASE_REST_API_URL +
        `/users/list?pageNumber=${currentPage}&pageSize=${recordsPerPage}`;

      const response = await axios.get(url);
      setTableData(response.data.data);
      setTotalPages(Math.ceil(120 / recordsPerPage));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(currentPage, recordsPerPage);
  }, [currentPage, recordsPerPage]);

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleEdit = (userId) => {
    const userToEdit = tableData.find((user) => user.userId === userId);
    setEditingUser(userToEdit);
    setIsEditModalOpen(true);
  };
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `${BASE_REST_API_URL}/user/${userId}/hard-delete`
      );

      if (response.status === 200) {
        toast.success("User deleted successfully");
        await fetchData();
      }
    } catch (error) {
      console.error("Error deleting user:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div className="bg-slate-100 p-2">
      {/* header */}
      <UsersHeader />

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border bg-white text-black rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Add User</span>
      </button>

      {/* table */}
      <UsersTable
        isLoading={isLoading}
        tableData={tableData}
        handleEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      {tableData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          filteredData={tableData}
          recordsPerPage={recordsPerPage}
        />
      )}

      {/* Modals */}
      <AddUserModal
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
      />
      <EditUserModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        editingUser={editingUser}
        refreshTable={fetchData}
      />
    </div>
  );
};

export default Users;
