import React from "react";
import TopCards from "../components/TopCards";
import ValueChainBarChart from "../charts/ValueChainBarChart";
import MarketPriceComparisonChart from "../charts/MarketPriceComparisonChart";
import ValueChainPieChart from "../charts/ValueChainPieChart";
import DoughnutChart from "../charts/DoughnutChart";

const Overview = () => {
  return (
    // <div>
    //   <TopCards />
    //   {/* value chain bar chart and pie chart */}
    //   <div className="mt-3 m-2 h-72 flex flex-row">
    //     <div className="w-3/4 bg-white rounded-lg mr-2 shadow-md">
    //       <ValueChainBarChart />
    //     </div>
    //     <div className="w-1/4 bg-white rounded-lg shadow-md ">
    //       <ValueChainPieChart />
    //     </div>
    //   </div>
    //   {/* market prices bar chart */}
    //   <div className="flex flex-row ml-2 h-72 mt-3">
    //     <div className="bg-white rounded-lg w-3/4 shadow-md">
    //       <MarketPriceComparisonChart />
    //     </div>
    //     <div className="bg-white rounded-lg w-1/4 ml-2 p-2 pt-3 shadow-md">
    //       <DoughnutChart />
    //     </div>
    //   </div>
    // </div>
    <div className="p-4">
      {/* Top Cards Section */}
      <TopCards />

      {/* Value Chain Charts Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Value Chain Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
          <ValueChainBarChart />
        </div>

        {/* Value Chain Pie Chart */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
          <ValueChainPieChart />
        </div>
      </div>

      {/* Market Price Charts Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Market Price Comparison Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
          <MarketPriceComparisonChart />
        </div>

        {/* Doughnut Chart */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;
