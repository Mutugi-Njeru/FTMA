import React, { useEffect, useState } from "react";
import { Download, Plus, SlidersHorizontal, X } from "lucide-react";
import MarketsFilters from "./MarketsFilters";
import MarketsHeader from "./MarketsHeader";
import { getLocations } from "../../service/FscsService";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";
import axios from "axios";
import MarketsTable from "./MarketsTable";
import Pagination from "./Pagination";

import CreateMarketModal from "./CreateMarketModal";

const Markets = () => {
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
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-30");
  const [totalRecords, setTotalRecords] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marketTitle, setMarketTitle] = useState("");
  const recordsPerPage = 15;

  // Fetch counties on component mount
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
          `/markets/list?pageNumber=${
            currentPage + 1
          }&pageSize=${recordsPerPage}&startDate=${startDate}&endDate=${endDate}`;
        if (selectedCounty) url += `&countyIds=${selectedCounty.value}`;
        if (selectedSubcounty)
          url += `&subCountyIds=${selectedSubcounty.value}`;
        if (selectedWard) url += `&wardIds=${selectedWard.value}`;

        const response = await axios.get(url);
        setTableData(response.data.data.markets);
        setTotalPages(
          Math.ceil(response.data.data.totalRecords / recordsPerPage)
        );
        setTotalRecords(response.data.data.totalRecords);
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

  const handleAddMarket = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      county: selectedCounty,
      subcounty: selectedSubcounty,
      ward: selectedWard,
      marketTitle,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="bg-slate-100 p-2">
      {/* header */}
      <MarketsHeader />
      <div className="flex justify-between mb-2">
        <button
          className="flex items-center gap-2 px-4 py-2 border bg-white text-black rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
          onClick={handleAddMarket}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Market</span>
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

      {/* Filters Row */}
      <MarketsFilters
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
      <MarketsTable isLoading={isLoading} tableData={tableData} />

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
      <CreateMarketModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};

export default Markets;
