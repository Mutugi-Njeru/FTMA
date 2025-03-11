import React from "react";
import Select from "react-select";
import customSelectStyles2 from "../../../styles/customSelectStyles2";

const MarketPricesFilters = ({
  showAdvancedFilters,
  countyOptions,
  selectedCounty,
  handleCountyChange,
  subcountyOptions,
  selectedSubcounty,
  handleSubcountyChange,
  wardOptions,
  selectedWard,
  handleWardChange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div>
      {showAdvancedFilters && (
        <div className="border rounded-lg bg-white pt-2 pl-2">
          <div className="rounded-lg mb-2 p-2">
            <div className="flex flex-row items-center">
              <Select
                options={countyOptions}
                value={selectedCounty}
                onChange={handleCountyChange}
                placeholder="county"
                styles={customSelectStyles2}
                isClearable
                className=" mr-2 w-40"
              />
              <Select
                options={subcountyOptions}
                value={selectedSubcounty}
                onChange={handleSubcountyChange}
                placeholder="Subcounty"
                styles={customSelectStyles2}
                isClearable
                className="w-40 mr-2"
              />
              <Select
                options={wardOptions}
                value={selectedWard}
                onChange={handleWardChange}
                placeholder="ward"
                styles={customSelectStyles2}
                isClearable
                className="w-40 mr-2"
              />

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className=" p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className=" p-1.5 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* buttons */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPricesFilters;
