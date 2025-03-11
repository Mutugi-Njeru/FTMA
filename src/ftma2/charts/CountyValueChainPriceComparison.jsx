import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Select from "react-select";
import html2canvas from "html2canvas";
import { FiDownload } from "react-icons/fi";
import customSelectStyles from "../../styles/customSelectStyles";
import { BASE_REST_API_URL } from "../service/CountyProductsService";
import axios from "axios";

const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-CA"); // Ensures YYYY-MM-DD format in local time
};

const CountyValueChainPriceComparison = () => {
  const [startDate, setStartDate] = useState("2025-02-27");
  const [endDate, setEndDate] = useState(getTodayDate());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Fetch Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url =
          BASE_REST_API_URL + "/products/list?pageNumber=1&pageSize=100";
        const response = await axios.get(url);
        setProducts(response.data.data.products);
        // Set default product to productId 17
        const defaultProduct = response.data.data.products.find(
          (product) => product.productId === 17
        );
        if (defaultProduct) {
          setSelectedProduct({
            value: defaultProduct.productId,
            label: defaultProduct.productName,
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Fetch barchart data
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedProduct) return; // Don't fetch if no product is selected

      try {
        let url =
          BASE_REST_API_URL +
          `/report/prices-comparison?productId=${selectedProduct.value}&startDate=${startDate}&endDate=${endDate}`;
        const response = await axios.get(url);
        setChartData(response.data.data.pricesComparison);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedProduct, startDate, endDate]);

  const productOptions = products.map((product) => ({
    value: product.productId,
    label: product.productName,
  }));

  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
  };

  const handleDownload = () => {
    const chartElement = document.getElementById("chart-container");
    html2canvas(chartElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "chart.png";
      link.click();
    });
  };

  // Extract unique counties from chartData
  const counties = [...new Set(chartData.map((item) => item.county))];

  return (
    <div className="ml-4 m-2 shadow-sm border border-gray-200 bg-slate-50 rounded-xl">
      {/* Top Section */}
      <div className="bg-slate-100 m-2 rounded-lg">
        <div className="text-sm font-semibold p-2">
          County Value Chain Price Comparison
        </div>

        <div className="flex items-center space-x-2 p-2">
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
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No data to display</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                tick={{
                  dy: 10,
                  textAnchor: "middle",
                  fontSize: 12,
                  fill: "#333",
                }}
              />
              <YAxis
                label={{
                  value: "Price per Kg",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Bar
                dataKey="farmPrice"
                fill="#bab600"
                name="Farm Price"
                barSize={20}
              />
              <Bar
                dataKey="retailPrice"
                fill="#3b2b1f"
                name="Retail Price"
                barSize={20}
              />
              <Bar
                dataKey="wholesalePrice"
                fill="#73b5cd"
                name="Wholesale Price"
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CountyValueChainPriceComparison;
