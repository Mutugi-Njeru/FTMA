import React from "react";
import Select from "react-select";
import customSelectStyles2 from "../../../styles/customSelectStyles2";

const MarketPointFilters = ({ showAdvancedFilters }) => {
  return (
    <div>
      {showAdvancedFilters && (
        <div className="border rounded-lg bg-white pt-2 pl-2">
          <div className="rounded-lg mb-2 p-2">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-between">
                <Select
                  // options={countyOptions}
                  // value={selectedCounty}
                  // onChange={handleCountyChange}
                  placeholder="county"
                  styles={customSelectStyles2}
                  isClearable
                  className=" mr-2 w-32"
                />
                <input
                  type="date"
                  // value={startDate}
                  // onChange={(e) => setStartDate(e.target.value)}
                  className=" p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="date"
                  // value={endDate}
                  // onChange={(e) => setEndDate(e.target.value)}
                  className=" p-1.5 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPointFilters;
