import React, { useEffect, useState } from "react";
import { Home, Download, Plus } from "lucide-react";
import axios from "axios";
import Dividers from "./Dividers";
import FscFilters from "./FscFilters";
import FscTable from "./FscTable";
import { getDataForDownload, getLocations } from "../../service/FscsService";
import customSelectStyles3 from "../../../styles/customSelectStyles3";
import Pagination from "./Pagination";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";
import AddFscModal from "./AddFscModal"; // Import the modal component
import { toast } from "react-toastify";
import FscEditUser from "./FscEditUser";

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
  const [isLoading, setIsLoading] = useState(false);
  const [totalFscs, setTotalFscs] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for add modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal visibility
  const [selectedUser, setSelectedUser] = useState(null);

  const recordsPerPage = 15;

  const handleCreateUser = async (formData, resetForm) => {
    try {
      const response = await axios.post(`${BASE_REST_API_URL}/user/create`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        msisdn: formData.msisdn,
        username: formData.msisdn, // Assuming username is the same as msisdn
        gender: formData.gender.toUpperCase(), // Ensure gender is in uppercase
        roleId: parseInt(formData.roleId, 10), // Convert roleId to a number
        fsc: formData.roleId === "4", // Set fsc to true if roleId is 4
        marketId: formData.roleId === "4" ? parseInt(formData.marketId, 10) : 0, // Set marketId only if fsc is true
      });

      toast.success("User created successfully");
      resetForm();
      await fetchData();
      return true;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.parameterViolations
      ) {
        // Extract the first parameter violation message
        const violationMessage =
          error.response.data.parameterViolations[0].message;
        toast.error(violationMessage);
      } else {
        toast.error("Failed to create user");
        console.log(error);
      }
      console.error("Error creating user:", error);
    } finally {
    }
  };

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

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    startDate,
    endDate,
    selectedCounty,
    selectedSubcounty,
    selectedWard,
  ]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let url =
        BASE_REST_API_URL +
        `/fsc/list?pageNumber=${
          currentPage + 1
        }&pageSize=${recordsPerPage}&startDate=${startDate}&endDate=${endDate}`;
      if (selectedCounty) url += `&countyIds=${selectedCounty.value}`;
      if (selectedSubcounty) url += `&subCountyIds=${selectedSubcounty.value}`;
      if (selectedWard) url += `&wardIds=${selectedWard.value}`;

      const response = await axios.get(url);
      setTableData(response.data.data.fsc);
      setTotalPages(
        Math.ceil(response.data.data.totalRecords / recordsPerPage)
      );
      setTotalFscs(response.data.data.totalRecords);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await getDataForDownload();
      return response.data.data.fsc;
    } catch (err) {
      console.error("Error fetching all data:", err);
      return [];
    }
  };

  useEffect(() => {
    if (selectedCounty) {
      const county = counties.find((c) => c.countyId === selectedCounty.value);
      setSubCounties(county ? county.subCounties : []);
      setSelectedSubcounty(null);
      setSelectedWard(null);
    }
  }, [selectedCounty, counties]);

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

  const downloadCSV = async () => {
    const allData = await fetchAllData();
    const headers = [
      "ID",
      "Name",
      "Email",
      "Gender",
      "Phone Number",
      "Market",
      "County",
      "Subcounty",
      "Ward",
      "Points",
      "CanRedeemPoints",
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      allData
        .map((item) =>
          [
            item.farmServiceCenterId,
            `${item.firstName} ${item.lastName}`,
            item.email,
            item.gender,
            item.msisdn,
            item.market,
            item.county,
            item.subCounty,
            item.ward,
            item.marketPointsBalance,
            item.canRedeemPoints ? "Yes" : "No",
          ].join(",")
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fscs_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = tableData.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.msisdn.includes(searchTerm) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = async (item) => {
    setSelectedUser(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    setSelectedUser(null);
  };
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `${BASE_REST_API_URL}/user/${userId}/hard-delete`
      );

      if (response.status === 200) {
        toast.success("User deleted successfully");
        await fetchData();
      }
    } catch (error) {
      console.error("Error deleting user:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div className="px-2 py-2">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 p-3 bg-amber-50 rounded-lg">
            <Home className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Farm Service Centers
            </h2>
            <p className="text-sm text-gray-600">
              Providing agricultural support and resources to local farmers
            </p>
          </div>
        </div>
      </div>

      {/* Title and Action Buttons */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold text-gray-800">
          Service Centers
        </h1>
        <div className="flex gap-3">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export CSV</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Create FSC</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <Dividers
        totalFscs={totalFscs}
        totalCounties={counties}
        totalSubcounties={subcountyOptions}
        totalWards={wardOptions}
      />

      {/* Search and Filter */}
      <FscFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showAdvancedFilters={showAdvancedFilters}
        setShowAdvancedFilters={setShowAdvancedFilters}
        resetFilters={resetFilters}
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
        customSelectStyles2={customSelectStyles3}
      />

      {/* Table placeholder */}
      <FscTable
        isLoading={isLoading}
        filteredData={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          filteredData={filteredData}
          recordsPerPage={recordsPerPage}
        />
      )}

      {/* Add FSC Modal */}
      <AddFscModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateUser}
        counties={counties}
      />
      {isEditModalOpen && (
        <FscEditUser
          onClose={handleCloseEditModal}
          item={selectedUser}
          refreshTable={fetchData}
        />
      )}
    </div>
  );
};

export default Fscs;
