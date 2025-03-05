import React, { useEffect, useState } from "react";
import { GiCorn } from "react-icons/gi";
import { FaEllipsis } from "react-icons/fa6";
import PricePerKgFilters from "./PricePerKgFilters";
import { Download, SlidersHorizontal } from "lucide-react";
import PricePerKgHeader from "./PricePerKgHeader";
import { getLocations } from "../../service/FscsService";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";
import axios from "axios";
import PricesPerKgTable from "./PricesPerKgTable";
import Pagination from "./Pagination";

const PricePerKg = () => {
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
  const recordsPerPage = 15;

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

  // Fetch data whenever any filter changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let url =
          BASE_REST_API_URL +
          `/products-prices/list?pageNumber=${
            currentPage + 1
          }&pageSize=${recordsPerPage}&startDate=${startDate}&endDate=${endDate}`;
        if (selectedCounty) url += `&countyIds=${selectedCounty.value}`;
        if (selectedSubcounty)
          url += `&subCountyIds=${selectedSubcounty.value}`;
        if (selectedWard) url += `&wardIds=${selectedWard.value}`;

        const response = await axios.get(url);
        setTableData(response.data.data.productsPrices);
        setTotalPages(
          Math.ceil(response.data.data.totalPricesEntries / recordsPerPage)
        );
        setTotalRecords(response.data.data.totalPricesEntries);
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
      {/* header */}
      <PricePerKgHeader />
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
      {/* Filters Row */}
      <PricePerKgFilters
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
      <PricesPerKgTable isLoading={isLoading} tableData={tableData} />
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

export default PricePerKg;
