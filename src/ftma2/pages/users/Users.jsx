import React, { useEffect, useState } from "react";
import { GiCorn } from "react-icons/gi";
import Select from "react-select";
import { Download, Plus } from "lucide-react";
import { FaEllipsis } from "react-icons/fa6";
import customSelectStyles2 from "../../../styles/CustomSelectStyles2";
import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";
import axios from "axios";
import Pagination from "./Pagination";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-30");
  const [tableData, setTableData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const recordsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let url =
          BASE_REST_API_URL +
          `/users/list?pageNumber=${currentPage}&pageSize=${recordsPerPage}&startDate=${startDate}&endDate=${endDate}`;

        const response = await axios.get(url);
        setTableData(response.data.data);
        setTotalPages(Math.ceil(120 / recordsPerPage));
        // setTotalRecords(90);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div className="bg-slate-100 p-2">
      {/* header */}
      <UsersHeader />

      <button className="flex items-center gap-2 px-4 py-2 border bg-white text-black rounded-lg hover:bg-amber-700 transition-colors shadow-sm">
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Add User</span>
      </button>
      {/* table */}
      <UsersTable isLoading={isLoading} tableData={tableData} />
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
    </div>
  );
};

export default Users;
