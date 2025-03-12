import React from "react";
import TopCards from "../components/TopCards";
import ValueChainBarChart from "../charts/ValueChainBarChart";
import MarketPriceComparisonChart from "../charts/MarketPriceComparisonChart";
import ValueChainPieChart from "../charts/ValueChainPieChart";
import DoughnutChart from "../charts/DoughnutChart";

const Overview = () => {
  return (
    // <div className="p-4">
    //   {/* Top Cards Section */}
    //   <TopCards />

    //   {/* Value Chain Charts Section */}
    //   <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
    //     {/* Value Chain Bar Chart */}
    //     <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
    //       <ValueChainBarChart />
    //     </div>

    //     {/* Value Chain Pie Chart */}
    //     <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
    //       <ValueChainPieChart />
    //     </div>
    //   </div>

    //   {/* Market Price Charts Section */}
    //   <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
    //     {/* Market Price Comparison Chart */}
    //     <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
    //       <MarketPriceComparisonChart />
    //     </div>

    //     {/* Doughnut Chart */}
    //     <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
    //       <DoughnutChart />
    //     </div>
    //   </div>
    // </div>
    <div className="p-1">
      {/* Top Cards Section */}
      <TopCards />

      {/* Value Chain Charts Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Value Chain Bar Chart */}
        <div
          className="lg:col-span-2 bg-white rounded-lg shadow-md p-4"
          style={{ minHeight: "40vh" }}
        >
          <ValueChainBarChart />
        </div>

        {/* Value Chain Pie Chart */}
        <div
          className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 flex items-center justify-center"
          style={{ minHeight: "40vh" }}
        >
          <ValueChainPieChart />
        </div>
      </div>

      {/* Market Price Charts Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Market Price Comparison Chart */}
        <div
          className="lg:col-span-2 bg-white rounded-lg shadow-md p-4"
          style={{ minHeight: "40vh" }}
        >
          <MarketPriceComparisonChart />
        </div>

        {/* Doughnut Chart */}
        <div
          className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 flex items-center justify-center"
          style={{ minHeight: "40vh" }}
        >
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;
