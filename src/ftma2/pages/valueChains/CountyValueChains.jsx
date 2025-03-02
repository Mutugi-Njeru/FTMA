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
import { Download } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import customSelectStyles from "../../../styles/customSelectStyles";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

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
  const [goToPage, setGoToPage] = useState(""); // State for "Go to Page" input

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

  const handleGoToPage = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(goToPage, 10);
    if (pageNumber >= 1 && pageNumber <= pageCount) {
      setCurrentPage(pageNumber - 1); // ReactPaginate uses zero-based index
    } else {
      alert(`Please enter a page number between 1 and ${pageCount}`);
    }
    setGoToPage("");
  };

  const pageCount = Math.ceil(totalCount / 10);

  return (
    <div className="m-2">
      <div className="border rounded-lg bg-slate-100">
        <h1 className="text-xl font-semibold">County Value Chains</h1>
        {/* Filters Row */}
        <div className="flex flex-row items-center justify-between mb-2 p-2">
          <div className="flex flex-row">
            <div className="mr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                County
              </label>
              <Select
                options={countyOptions}
                value={selectedCounty}
                onChange={handleCountyChange}
                placeholder="Select county"
                styles={customSelectStyles2}
                isClearable
                className="w-full"
              />
            </div>
            <div className="mr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-row items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } group flex items-center w-full px-4 py-2 text-sm`}
                        >
                          <FaPlus className="mr-2" size={16} />
                          Add Chain
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } group flex items-center w-full px-4 py-2 text-sm`}
                        >
                          <Download className="mr-2" size={16} />
                          Export CSV
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

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
          <div className="border rounded-lg mt-5">
            <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-customBrownLight">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Product ID
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                    County
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Date Created
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Date Updated
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
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

              {/* Go to Page Input */}
              <div className="mt-4 flex items-center space-x-2">
                <span>Go to page:</span>
                <input
                  type="number"
                  min="1"
                  max={pageCount}
                  value={goToPage}
                  onChange={(e) => setGoToPage(e.target.value)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
                  placeholder="Page"
                />
                <button
                  onClick={handleGoToPage}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                >
                  Go
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CountyValueChains;
