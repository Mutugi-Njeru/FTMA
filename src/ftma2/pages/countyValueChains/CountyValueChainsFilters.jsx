import { Download, Plus } from "lucide-react";
import Select from "react-select";
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const CountyValueChainsFilters = ({
  countyOptions,
  selectedCounty,
  handleCountyChange,
  customSelectStyles2,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  showAdvancedFilters,
}) => {
  return (
    <div>
      {showAdvancedFilters && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }} // Start from the right and invisible
          animate={{ x: 0, opacity: 1 }} // Slide to the left and become visible
          transition={{ type: "tween", duration: 0.8 }}
          // transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration and easing
          className="border rounded-lg bg-white pt-2 pl-2"
        >
          <div className="rounded-lg mb-2 p-2">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row">
                <div className="mr-2">
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
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CountyValueChainsFilters;
