import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";
import Select from "react-select";
import html2canvas from "html2canvas";
import { FiDownload } from "react-icons/fi";
import customSelectStyles from "../../styles/customSelectStyles";
import { getLocations } from "../service/FscsService";
import { BASE_REST_API_URL } from "../service/CountyProductsService";
import axios from "axios";

const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-CA"); // Ensures YYYY-MM-DD format in local time
};

const MarketPriceComparisonChart = () => {
  const [startDate, setStartDate] = useState("2025-02-27");
  const [endDate, setEndDate] = useState(getTodayDate());
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [countyProducts, setCountyProducts] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Fetch initial counties data
  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const response = await getLocations();
        setCounties(response.data.data.counties);

        // Set default county to countyId 13
        const defaultCounty = response.data.data.counties.find(
          (county) => county.countyId === 13
        );
        if (defaultCounty) {
          setSelectedCounty({
            value: defaultCounty.countyId,
            label: defaultCounty.countyName,
          });
        }
      } catch (err) {
        console.error("Error fetching counties:", err);
      }
    };
    fetchCounties();
  }, []);

  // Fetch countyProducts when selectedCounty changes
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCounty) return; // Don't fetch if no county is selected

      try {
        let url =
          BASE_REST_API_URL +
          `/county-products/list?countyIds=${selectedCounty.value}`;
        const response = await axios.get(url);
        setCountyProducts(response.data.data.countyProducts);
        // Set default product to productId 84
        const defaultProduct = response.data.data.countyProducts.find(
          (product) => product.countyProductId === 84
        );
        if (defaultProduct) {
          setSelectedProduct({
            value: defaultProduct.countyProductId,
            label: defaultProduct.product,
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedCounty]);

  // Fetch barchart data
  useEffect(() => {
    const fetchData = async () => {
      // Ensure both selectedCounty and selectedProduct are not null
      if (!selectedCounty || !selectedProduct) return;

      try {
        let url =
          BASE_REST_API_URL +
          `/report/market-prices?countyId=${selectedCounty.value}&countyProductId=${selectedProduct.value}&startDate=${startDate}&endDate=${endDate}`;
        const response = await axios.get(url);
        setChartData(response.data.data.marketPrices);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedCounty, selectedProduct, startDate, endDate]);

  const handleDownload = () => {
    const chartElement = document.getElementById("chart-container");
    html2canvas(chartElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "chart.png";
      link.click();
    });
  };

  const countyOptions = counties.map((county) => ({
    value: county.countyId,
    label: county.countyName,
  }));

  const productOptions = countyProducts.map((product) => ({
    value: product.countyProductId,
    label: product.product,
  }));

  const handleCountyChange = (selectedOption) => {
    setSelectedCounty(selectedOption);
    setSelectedProduct(null);
  };

  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
  };

  return (
    <div className="w-full h-full p-2 bg-white rounded-lg flex flex-col space-y-2">
      {/* Top Section */}
      <div className="flex items-center justify-between w-full p-2">
        <span className="text-sm font-semibold">Markets Price Comparison</span>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg text-sm pr-1"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg text-sm pr-1"
          />
          <Select
            options={countyOptions}
            value={selectedCounty}
            onChange={handleCountyChange}
            styles={customSelectStyles}
            className="w-28 text-xs"
          />
          <Select
            options={productOptions}
            value={selectedProduct}
            onChange={handleProductChange}
            styles={customSelectStyles}
            className="w-28 text-xs"
          />
          <button
            onClick={handleDownload}
            className="p-1 text-black rounded-lg flex items-center justify-center text-sm"
          >
            <FiDownload size={16} />
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div
        id="chart-container"
        className="w-full flex items-center justify-center"
      >
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500">No data available</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="marketName">
                <Label
                  value="Value Chains"
                  offset={-5}
                  position="insideBottom"
                />
              </XAxis>
              <YAxis
                label={{
                  value: "Price per Kg (Ksh)",
                  angle: -90,
                  position: "insideBottomLeft",
                }}
              />
              <Tooltip />
              <Bar
                dataKey="averageFarmPrice"
                fill="#bab600"
                name="Farm Price"
                barSize={24}
              />
              <Bar
                dataKey="averageRetailPrice"
                fill="#3b2f1f"
                name="Retail Price"
                barSize={24}
              />
              <Bar
                dataKey="averageWholesalePrice"
                fill="#73b5cd"
                name="Wholesale Price"
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MarketPriceComparisonChart;
