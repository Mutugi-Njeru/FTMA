import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  UserPlus,
  Search,
  Trash2,
  Download,
  Calendar,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import customSelectStyles2 from "../../styles/CustomSelectStyles2";
import { getLocations } from "../service/FscsService";
import axios from "axios";

const Fscs = () => {
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedSubcounty, setSelectedSubcounty] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [subCounties, setSubCounties] = useState([]);
  const [wards, setWards] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-30");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const recordsPerPage = 10;

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
      try {
        let url = `https://ftma.egroup.co.ke/market-information/v1/api/fsc/list?pageNumber=${
          currentPage + 1
        }&pageSize=${recordsPerPage}&startDate=${startDate}&endDate=${endDate}`;
        if (selectedCounty) url += `&countyIds=${selectedCounty.value}`;
        if (selectedSubcounty)
          url += `&subCountyIds=${selectedSubcounty.value}`;
        if (selectedWard) url += `&wardIds=${selectedWard.value}`;

        const response = await axios.get(url);
        setTableData(response.data.data.fsc);
        setTotalPages(
          Math.ceil(response.data.data.totalRecords / recordsPerPage)
        );
      } catch (err) {
        console.error("Error fetching data:", err);
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

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCounty(null);
    setSelectedSubcounty(null);
    setSelectedWard(null);
    setStartDate("2024-01-01");
    setEndDate("2024-12-30");
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

  const filteredData = tableData.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.msisdn.includes(searchTerm) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-xl shadow-sm border border-gray-100 p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Farm Service Centers
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor all service centers across regions
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="px-2 py-2 bg-customGreen text-white rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors shadow-sm">
            <UserPlus size={16} />
            <span>Add Center</span>
          </button>
          <button className="px-2 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Search and Basic Filters */}
      <div className="mb-6 bg-slate-50 p-2 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, market or phone..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters Button */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
            >
              <SlidersHorizontal size={18} />
              <span>
                {showAdvancedFilters ? "Hide Filters" : "Show Filters"}
              </span>
            </button>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
            >
              <RefreshCw size={18} />
              <span>Reset</span>
            </button>
          </div>

          {showAdvancedFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-2 border-t border-gray-200 mt-4">
              <div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcounty
                </label>
                <Select
                  options={subcountyOptions}
                  value={selectedSubcounty}
                  onChange={handleSubcountyChange}
                  placeholder="Select subcounty"
                  styles={customSelectStyles2}
                  isClearable
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ward
                </label>
                <Select
                  options={wardOptions}
                  value={selectedWard}
                  onChange={handleWardChange}
                  placeholder="Select ward"
                  styles={customSelectStyles2}
                  isClearable
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                {[
                  "ID",
                  "Name",
                  "Phone Number",
                  "Market",
                  "County",
                  "Subcounty",
                  "Ward",
                  "Points",
                  "Date",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-2 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.farmServiceCenterId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-2 py-2 text-sm font-medium text-gray-900">
                      {item.farmServiceCenterId}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-700 font-medium">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-700">
                      {item.msisdn}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-700">
                      {item.market}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-700">
                      {item.county}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-700">
                      {item.subCounty}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-700">
                      {item.ward}
                    </td>
                    <td className="px-2 py-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.marketPointsBalance}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-700">
                      {item.createdAt}
                    </td>
                    <td className="px-2 py-2 text-sm">
                      <div className="flex items-center space-x-3">
                        <button className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-6 text-sm text-gray-500 text-center"
                  >
                    No data found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="px-4 py-4 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {currentPage * recordsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      (currentPage + 1) * recordsPerPage,
                      filteredData.length
                    )}
                  </span>{" "}
                  of <span className="font-medium">{filteredData.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
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
                  forcePage={currentPage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fscs;
