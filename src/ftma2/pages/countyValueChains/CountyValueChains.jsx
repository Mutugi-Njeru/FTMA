import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getLocations } from "../../service/FscsService";
import customSelectStyles2 from "../../../styles/CustomSelectStyles2";
import {
  BASE_REST_API_URL,
  getCountyProducts,
} from "../../service/CountyProductsService";
import axios from "axios";
import { Download, Plus, SlidersHorizontal } from "lucide-react";
import CountyValueChainsHeader from "./CountyValueChainsHeader";
import CountyValueChainsFilters from "./CountyValueChainsFilters";
import Pagination from "./Pagination"; // Import the new Pagination component
import CountyValueChainsTable from "./CountyValueChainsTable";
import AddCountyChainModal from "./AddCountyChainModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [valueChains, setValueChains] = useState([]);

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

  // Fetch value chains data
  useEffect(() => {
    const fetchValueChains = async () => {
      try {
        const response = await axios.get(
          `${BASE_REST_API_URL}/products/list?pageNumber=1&pageSize=1000&startDate=2024-01-01&endDate=2025-12-12`
        );
        setValueChains(response.data.data.products);
      } catch (err) {
        console.error("Error fetching value chains:", err);
      }
    };
    fetchValueChains();
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
        <button
          className="flex items-center gap-2 px-4 py-2 border bg-white text-black rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
          onClick={() => setIsModalOpen(true)}
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
          <CountyValueChainsTable data={data} />

          {/* Pagination */}
          {pageCount > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={pageCount}
              handlePageChange={handlePageClick}
              filteredData={data}
              recordsPerPage={10}
            />
          )}
        </>
      )}
      {/* Add Chain Modal */}
      <AddCountyChainModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        counties={counties}
        valueChains={valueChains}
      />
    </div>
  );
};

export default CountyValueChains;
