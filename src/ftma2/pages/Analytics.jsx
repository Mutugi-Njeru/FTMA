import React from "react";
import MarketPriceTrends from "../charts/MarketPriceTrends";
import CountyPriceTrends from "../charts/CountyPriceTrends";
import CountyValueChainPriceComparison from "../charts/CountyValueChainPriceComparison";

const Analytics = () => {
  return (
    <div>
      <MarketPriceTrends />
      <CountyPriceTrends />
      <div className="mb-5">
        {" "}
        {/* Add margin-bottom using Tailwind */}
        <CountyValueChainPriceComparison />
      </div>
    </div>
  );
};

export default Analytics;
