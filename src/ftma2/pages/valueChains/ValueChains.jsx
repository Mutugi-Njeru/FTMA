import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Download,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import ValueChainFilters from "./ValueChainFilters";
import ValueChainsHeader from "./ValueChainsHeader";
import ValueChainsTable from "./ValueChainsTable";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";
import AddValueChainModal from "./AddValueChainModal"; // Import the modal component
import { toast } from "react-toastify";

const ValueChains = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-30");
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const pageSize = 15;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_REST_API_URL}/products/list?pageNumber=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`
      );
      setData(response.data.data.products);
      setPageCount(Math.ceil(response.data.data.totalCount / pageSize));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, startDate, endDate]);

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1); // react-paginate uses zero-based index
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-gray-800";
    }
  };

  // Apply sorting to data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) return sortedData;

    return sortedData.filter(
      (item) =>
        item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.createdBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productId?.toString().includes(searchTerm)
    );
  }, [sortedData, searchTerm]);

  const handleDownloadCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Created By",
      "Created At",
      "Updated At",
      "Updated By",
      "Status",
    ];

    const rows = filteredData.map((item) => [
      item.productId,
      item.productName,
      item.createdBy || "N/A",
      formatDate(item.createdAt),
      formatDate(item.updatedAt),
      item.updatedBy || "N/A",
      item.status || "Unknown",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "value_chains.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddValueChain = (commodityName) => {
    axios
      .post(`${BASE_REST_API_URL}/product/create`, { title: commodityName })
      .then((response) => {
        toast.success("product added sucessfully");
        fetchData(); // Refresh the data
      })
      .catch((error) => {
        toast.error("error adding product");
        console.error("Error adding value chain:", error);
      });
  };

  return (
    <div className="px-2 py-2">
      {/* Header */}
      <ValueChainsHeader />
      <div className="flex justify-between mb-2">
        <button
          className="flex items-center gap-2 px-4 py-2 border bg-white text-black rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
          onClick={() => setIsModalOpen(true)} // Open the modal
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Chain</span>
        </button>
        <div className="justify-end flex">
          <button
            className="flex items-center cursor-pointer"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="ml-2 mr-2">
              {showAdvancedFilters ? "Hide Filters" : "Show Filters"}
            </span>
          </button>
          <button
            className="flex items-center cursor-pointer"
            onClick={handleDownloadCSV}
          >
            <Download className="w-4 h-4" />
            <span className="ml-2 mr-2">Export Csv</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <ValueChainFilters
        showAdvancedFilters={showAdvancedFilters}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Table */}
      <ValueChainsTable
        filteredData={filteredData}
        loading={loading}
        formatDate={formatDate}
        getStatusBadgeClass={getStatusBadgeClass}
      />

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-amber-600">
                  Showing{" "}
                  <span className="font-medium">
                    {filteredData.length > 0
                      ? (pageNumber - 1) * pageSize + 1
                      : 0}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(pageNumber * pageSize, pageCount * pageSize)}
                  </span>{" "}
                  of <span className="font-medium">{pageCount * pageSize}</span>{" "}
                  results
                </p>
              </div>
            </div>

            <ReactPaginate
              previousLabel={<ChevronLeft className="h-5 w-5" />}
              nextLabel={<ChevronRight className="h-5 w-5" />}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={
                "flex items-center justify-center mt-2 -space-x-px"
              }
              pageClassName={
                "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              }
              activeClassName={"z-10 border-blue-500 text-blue-400"}
              previousClassName={
                "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              }
              nextClassName={
                "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              }
              disabledClassName={"opacity-50 cursor-not-allowed"}
              breakClassName={
                "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
              }
            />
          </div>
        </div>
      )}

      {/* Add Value Chain Modal */}
      <AddValueChainModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddValueChain}
      />
    </div>
  );
};

export default ValueChains;
