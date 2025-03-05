import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getLocations } from "../../service/FscsService";
import customSelectStyles2 from "../../../styles/CustomSelectStyles2";
import {
  BASE_REST_API_URL,
  getCountyProducts,
} from "../../service/CountyProductsService";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Download, Plus, SlidersHorizontal } from "lucide-react";
import CountyValueChainsHeader from "./CountyValueChainsHeader";
import CountyValueChainsFilters from "./CountyValueChainsFilters";

const CountyValueChains = () => {
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-30");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Fetch initial counties data
  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const response = await getLocations();
        setCounties(response.data.data.counties);
      } catch (err) {
        console.error("Error fetching counties:", err);
      }
    };
    fetchCounties();
  }, []);

  const countyOptions = counties.map((county) => ({
    value: county.countyId,
    label: county.countyName,
  }));

  const handleCountyChange = (selectedOption) => {
    setSelectedCounty(selectedOption);
    setCurrentPage(0); // Reset to first page when county changes
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (new Date(startDate) > new Date(endDate)) {
        setError("Start date cannot be greater than end date.");
        return;
      }

      let response;
      if (selectedCounty) {
        response = await getCountyProducts({
          pageNumber: currentPage + 1,
          pageSize: 10,
          startDate,
          endDate,
          countyIds: selectedCounty.value,
        });
      } else {
        response = await axios.get(
          `${BASE_REST_API_URL}/county-products/list`,
          {
            params: {
              pageNumber: currentPage + 1,
              pageSize: 10,
              startDate,
              endDate,
            },
          }
        );
      }
      setData(response.data.data.countyProducts);
      setTotalCount(response.data.data.totalCount);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCounty, startDate, endDate, currentPage]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(totalCount / 10);

  return (
    <div className="px-2 py-2">
      <CountyValueChainsHeader />
      <div className="flex justify-between mb-2">
        <button className="flex items-center gap-2 px-4 py-2 border bg-white text-black rounded-lg hover:bg-amber-700 transition-colors shadow-sm">
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
          <button className="flex items-center cursor-pointer">
            <Download className="w-4 h-4" />
            <span className="ml-2 mr-2">Export Csv</span>
          </button>
        </div>
      </div>

      <CountyValueChainsFilters
        showAdvancedFilters={showAdvancedFilters}
        countyOptions={countyOptions}
        selectedCounty={selectedCounty}
        handleCountyChange={handleCountyChange}
        customSelectStyles2={customSelectStyles2}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="border rounded-lg mt-6 p-1 bg-white">
            <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Product ID
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                    County
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Date Created
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Date Updated
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.countyProductId}>
                    <td className="px-2 py-2 text-sm text-gray-500">
                      {item.countyProductId}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-500">
                      {item.product}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-500">
                      {item.county}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-500">
                      {item.createdAt}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-500">
                      {item.updatedAt}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-500">Active</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex flex-col items-center mt-4">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={1} // Show dots after first and before last page
                pageRangeDisplayed={3} // Number of pages to display around the current page
                onPageChange={handlePageClick}
                containerClassName={
                  "flex justify-center items-center space-x-2"
                }
                pageClassName={"px-3 py-1 border border-gray-300 rounded-md"}
                pageLinkClassName={"text-sm text-gray-700"}
                previousClassName={`px-3 py-1 border border-gray-300 rounded-md ${
                  currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                nextClassName={`px-3 py-1 border border-gray-300 rounded-md ${
                  currentPage + 1 === pageCount
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                previousLinkClassName={"text-sm text-gray-700"}
                nextLinkClassName={"text-sm text-gray-700"}
                activeClassName={"bg-blue-500 text-white"}
                disabledClassName={"opacity-50 cursor-not-allowed"}
                forcePage={currentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CountyValueChains;
