import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLocations } from "../service/FscsService";
import FarmServiceCentersTable from "../tables/FarmServiceCentersTable";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Markets = () => {
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedSubCounty, setSelectedSubCounty] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [subCounties, setSubCounties] = useState([]);
  const [wards, setWards] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const recordsPerPage = 10;

  // Fetch initial counties data
  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const response = await getLocations();
        setCounties(response.data.data.counties);
      } catch (error) {
        console.error("Error fetching counties:", error);
      }
    };
    fetchCounties();
  }, []);

  // Fetch data whenever any filter changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          pageNumber: currentPage,
          pageSize: recordsPerPage,
          startDate,
          endDate,
          ...(selectedCounty && { countyIds: selectedCounty }),
          ...(selectedSubCounty && { subCountyIds: selectedSubCounty }),
          ...(selectedWard && { wardIds: selectedWard }),
        });

        const response = await axios.get(
          "https://ftma.egroup.co.ke/market-information/v1/api/fsc/list",
          { params }
        );
        setTableData(response.data.data.fsc);
        setTotalPages(
          Math.ceil(response.data.data.totalRecords / recordsPerPage)
        );
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    currentPage,
    startDate,
    endDate,
    selectedCounty,
    selectedSubCounty,
    selectedWard,
  ]);

  // Update sub-counties when county is selected
  useEffect(() => {
    if (selectedCounty) {
      const county = counties.find((c) => c.countyId === selectedCounty);
      setSubCounties(county ? county.subCounties : []);
      setSelectedSubCounty("");
      setSelectedWard("");
    }
  }, [selectedCounty, counties]);

  // Update wards when sub-county is selected
  useEffect(() => {
    if (selectedSubCounty) {
      const subCounty = subCounties.find(
        (sc) => sc.subCountyId === selectedSubCounty
      );
      setWards(subCounty ? subCounty.wards : []);
      setSelectedWard("");
    }
  }, [selectedSubCounty, subCounties]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1); // Convert zero-based index to one-based
  };

  return (
    <div>
      {/* County Selector */}
      <select
        value={selectedCounty}
        onChange={(e) => setSelectedCounty(Number(e.target.value))}
        aria-label="Select County"
      >
        <option value="">Select County</option>
        {counties.map((county) => (
          <option key={county.countyId} value={county.countyId}>
            {county.countyName}
          </option>
        ))}
      </select>

      {/* Sub-County Selector */}
      <select
        value={selectedSubCounty}
        onChange={(e) => setSelectedSubCounty(Number(e.target.value))}
        aria-label="Select Sub-County"
      >
        <option value="">Select Sub-County</option>
        {subCounties.map((subCounty) => (
          <option key={subCounty.subCountyId} value={subCounty.subCountyId}>
            {subCounty.subCountyName}
          </option>
        ))}
      </select>

      {/* Ward Selector */}
      <select
        value={selectedWard}
        onChange={(e) => setSelectedWard(Number(e.target.value))}
        aria-label="Select Ward"
      >
        <option value="">Select Ward</option>
        {wards.map((ward) => (
          <option key={ward.wardId} value={ward.wardId}>
            {ward.wardName}
          </option>
        ))}
      </select>

      {/* Date Selectors */}
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        aria-label="Start Date"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        aria-label="End Date"
      />

      {/* Table to display data */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <FarmServiceCentersTable data={tableData} />
          {totalPages > 1 && (
            <ReactPaginate
              previousLabel={<ChevronLeft size={16} />}
              nextLabel={<ChevronRight size={16} />}
              breakLabel="..."
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName="flex items-center space-x-1"
              pageClassName="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              pageLinkClassName="flex items-center justify-center w-full h-full"
              previousClassName="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              previousLinkClassName="flex items-center justify-center w-full h-full"
              nextClassName="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              nextLinkClassName="flex items-center justify-center w-full h-full"
              breakClassName="inline-flex items-center justify-center w-8 h-8 text-sm font-medium text-gray-700"
              activeClassName="bg-indigo-50 border-indigo-500 text-indigo-600 hover:bg-indigo-100"
              forcePage={currentPage - 1}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Markets;
