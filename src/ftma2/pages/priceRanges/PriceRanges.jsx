import React, { useEffect, useState } from "react";
import { Download, Plus, SlidersHorizontal } from "lucide-react";
import PrriceRangeFilters from "./PrriceRangeFilters";
import { getLocations } from "../../service/FscsService";
import PriceRangeHeader from "./PriceRangeHeader";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";
import axios from "axios";
import PriceRangesTable from "./PriceRangesTable";
import Pagination from "./Pagination";
import AddPriceRangeModal from "./AddPriceRangeModal";

const PriceRanges = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);
  const [selectedSubcounty, setSelectedSubcounty] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [wards, setWards] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2025-09-01");
  const [totalRecords, setTotalRecords] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const recordsPerPage = 15;

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

  // Fetch data whenever any filter changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let url =
          BASE_REST_API_URL +
          `/county-product-price-range/list?pageNumber=${
            currentPage + 1
          }&pageSize=${recordsPerPage}&startDate=${startDate}&endDate=${endDate}`;
        if (selectedCounty) url += `&countyIds=${selectedCounty.value}`;
        if (selectedSubcounty)
          url += `&subCountyIds=${selectedSubcounty.value}`;
        if (selectedWard) url += `&wardIds=${selectedWard.value}`;

        const response = await axios.get(url);
        setTableData(response.data.data.priceRangeData);
        setTotalPages(
          Math.ceil(response.data.data.totalCount / recordsPerPage)
        );
        setTotalRecords(response.data.data.totalCount);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    currentPage,
    startDate,
    endDate,
    selectedCounty,
    selectedSubcounty,
    selectedWard,
  ]);

  // Update sub-counties when county is selected
  useEffect(() => {
    if (selectedCounty) {
      const county = counties.find((c) => c.countyId === selectedCounty.value);
      setSubCounties(county ? county.subCounties : []);
      setSelectedSubcounty(null);
      setSelectedWard(null);
    }
  }, [selectedCounty, counties]);
  // Update wards when sub-county is selected
  useEffect(() => {
    if (selectedSubcounty) {
      const subCounty = subCounties.find(
        (sc) => sc.subCountyId === selectedSubcounty.value
      );
      setWards(subCounty ? subCounty.wards : []);
      setSelectedWard(null);
    }
  }, [selectedSubcounty, subCounties]);

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected);
  };
  const countyOptions = counties.map((county) => ({
    value: county.countyId,
    label: county.countyName,
  }));
  const subcountyOptions = subCounties.map((subCounty) => ({
    value: subCounty.subCountyId,
    label: subCounty.subCountyName,
  }));
  const wardOptions = wards.map((ward) => ({
    value: ward.wardId,
    label: ward.wardName,
  }));

  const handleCountyChange = (selectedOption) => {
    setSelectedCounty(selectedOption);
  };
  const handleSubcountyChange = (selectedOption) => {
    setSelectedSubcounty(selectedOption);
  };
  const handleWardChange = (selectedOption) => {
    setSelectedWard(selectedOption);
  };

  return (
    <div className="bg-slate-100 p-2">
      <PriceRangeHeader />

      <div className="flex justify-between mb-2">
        <button
          className="flex items-center gap-2 px-4 py-2 border bg-white text-black rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
          onClick={() => setIsModalOpen(true)} // Open modal on click
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Price</span>
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

      {/* Filters*/}
      <PrriceRangeFilters
        showAdvancedFilters={showAdvancedFilters}
        countyOptions={countyOptions}
        selectedCounty={selectedCounty}
        handleCountyChange={handleCountyChange}
        subcountyOptions={subcountyOptions}
        selectedSubcounty={selectedSubcounty}
        handleSubcountyChange={handleSubcountyChange}
        wardOptions={wardOptions}
        selectedWard={selectedWard}
        handleWardChange={handleWardChange}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {/* table */}
      <PriceRangesTable isLoading={isLoading} tableData={tableData} />
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

      {/* Modal */}
      <AddPriceRangeModal
        isOpen={isModalOpen}
        counties={counties}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PriceRanges;
