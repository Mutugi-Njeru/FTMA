import React from "react";
import TopCards from "../components/TopCards";
import ValueChainBarChart from "../charts/ValueChainBarChart";
import MarketPriceComparisonChart from "../charts/MarketPriceComparisonChart";
import ValueChainPieChart from "../charts/ValueChainPieChart";
import DoughnutChart from "../charts/DoughnutChart";

const Overview = () => {
  return (
    <div>
      <TopCards />
      {/* value chain bar chart and pie chart */}
      <div className="mt-3 m-2 h-72 flex flex-row">
        <div className="w-3/4 bg-white rounded-lg mr-2 shadow-md">
          <ValueChainBarChart />
        </div>
        <div className="w-1/4 bg-white rounded-lg shadow-md ">
          <ValueChainPieChart />
        </div>
      </div>
      {/* market prices bar chart */}
      <div className="flex flex-row ml-2 h-72 mt-3">
        <div className="bg-white rounded-lg w-3/4 shadow-md">
          <MarketPriceComparisonChart />
        </div>
        <div className="bg-customBrown rounded-lg w-1/4 ml-2 shadow-md">
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;
