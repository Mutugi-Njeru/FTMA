// Filters.js
import React from "react";
import Select from "react-select";
import { Search, SlidersHorizontal, RefreshCw, Calendar } from "lucide-react";

const Filters = ({
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
    <div className="mb-6 bg-gray-100 p-2 rounded-lg shadow-sm border border-gray-200">
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
            className="flex items-center gap-2 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
          >
            <SlidersHorizontal size={18} />
            <span>{showAdvancedFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
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
  );
};

export default Filters;
