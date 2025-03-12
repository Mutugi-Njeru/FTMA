import React from "react";
import MarketPriceTrends from "../charts/MarketPriceTrends";
import CountyPriceTrends from "../charts/CountyPriceTrends";
import CountyValueChainPriceComparison from "../charts/CountyValueChainPriceComparison";

const Analytics = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-2">
          <MarketPriceTrends />
        </div>
        <div className="lg:col-span-2">
          <CountyPriceTrends />
        </div>
        <div className="lg:col-span-2">
          <CountyValueChainPriceComparison />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
