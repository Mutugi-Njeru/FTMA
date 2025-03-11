import React from "react";
import Select from "react-select";
import customSelectStyles2 from "../../../styles/customSelectStyles2";
import { motion } from "framer-motion";

const AveragePricesFilters = ({
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
        <motion.div
          initial={{ x: "100%", opacity: 0 }} // Start off-screen to the right
          animate={{ x: 0, opacity: 1 }} // Slide in to the left
          transition={{ type: "tween", duration: 0.8 }} // Slower, smoother transition
          className="border rounded-lg bg-white pt-2 pl-2"
        >
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
        </motion.div>
      )}
    </div>
  );
};

export default AveragePricesFilters;
