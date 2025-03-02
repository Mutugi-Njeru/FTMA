import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import {
  Calendar,
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  ArrowUpDown,
  Leaf,
  Download,
  Plus,
} from "lucide-react";

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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pageSize = 10;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://ftma.egroup.co.ke/market-information/v1/api/products/list?pageNumber=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`
      );
      setData(response.data.data.products);
      setPageCount(Math.ceil(response.data.data.totalCount / pageSize));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, startDate, endDate]);

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1); // react-paginate uses zero-based index
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter locally since the API doesn't support search
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
        return "bg-gray-100 text-gray-800";
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

  const handleAdd = () => {
    // Implement the add functionality here
    console.log("Add button clicked");
  };

  return (
    <div className="bg-gray-50 m-2">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Value Chains
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Manage and monitor agricultural value chains
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRefresh}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {isRefreshing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, ID or creator..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </form>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center space-x-2 bg-white px-3 py-2 border border-gray-300 rounded-md">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border-none focus:outline-none text-sm"
                    aria-label="Start Date"
                  />
                </div>

                <div className="flex items-center space-x-2 bg-white px-3 py-2 border border-gray-300 rounded-md">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border-none focus:outline-none text-sm"
                    aria-label="End Date"
                  />
                </div>

                <button
                  onClick={handleDownloadCSV}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV
                </button>

                <button
                  onClick={handleAdd}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </button>
              </div>
            </div>
          </div>

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
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("productId")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>ID</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("productName")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("createdBy")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Created By</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("createdAt")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Created At</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("updatedAt")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Updated At</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("updatedBy")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Updated By</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("status")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Loader2 className="h-8 w-8 text-green-500 animate-spin mb-2" />
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
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.productId}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-green-700">
                        {item.productName}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {item.createdBy || "N/A"}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {item.updatedBy || "N/A"}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
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

          {/* Pagination */}
          <div className="px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
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
                    of{" "}
                    <span className="font-medium">{pageCount * pageSize}</span>{" "}
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
                activeClassName={
                  "z-10 bg-green-50 border-green-500 text-green-600"
                }
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
        </div>
      </div>
    </div>
  );
};

export default ValueChains;
