import { Search } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const ValueChainFilters = ({
  showAdvancedFilters,
  handleSearch,
  searchTerm,
  setSearchTerm,
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
          className="border rounded-lg bg-white pt-1 pl-2"
        >
          <div className="p-2 bg-white border-b shadow-sm border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, ID or creator..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </form>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center space-x-2 bg-white px-3 py-2 border border-gray-300 rounded-md">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border-none focus:outline-none text-sm"
                    aria-label="Start Date"
                  />
                </div>

                <div className="flex items-center space-x-2 bg-white px-3 py-2 border border-gray-300 rounded-md">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border-none focus:outline-none text-sm"
                    aria-label="End Date"
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

export default ValueChainFilters;
