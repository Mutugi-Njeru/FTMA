import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import Select from "react-select";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FscFilters = ({
  searchTerm,
  setSearchTerm,
  showAdvancedFilters,
  setShowAdvancedFilters,
  resetFilters,
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
  customSelectStyles2,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3 mb-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-1">
        {/* Search Bar */}
        <motion.div
          className="relative flex-grow max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, market or phone..."
            className="pl-10 pr-4 py-2.5 w-full text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
          />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors ${
              showAdvancedFilters
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-xs font-medium">
              {showAdvancedFilters ? "Hide Filters" : "Show Filters"}
            </span>
          </motion.button>

          <motion.button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-xs font-medium">Reset</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Filter Options */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2 pt-4 border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Select
              options={countyOptions}
              value={selectedCounty}
              onChange={handleCountyChange}
              placeholder="Select county"
              styles={customSelectStyles2}
              isClearable
              className="col-span-1 text-sm"
            />

            <Select
              options={subcountyOptions}
              value={selectedSubcounty}
              onChange={handleSubcountyChange}
              placeholder="Select subcounty"
              styles={customSelectStyles2}
              isClearable
              className="col-span-1 text-sm"
            />

            <Select
              options={wardOptions}
              placeholder="Select ward"
              value={selectedWard}
              onChange={handleWardChange}
              styles={customSelectStyles2}
              isClearable
              className="col-span-1 text-sm"
            />

            <div className="relative col-span-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="date"
                className="pl-5 pr-2 py-1.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start date"
              />
            </div>

            <div className="relative col-span-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="date"
                className="pl-5 pr-2 py-1.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End date"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FscFilters;
