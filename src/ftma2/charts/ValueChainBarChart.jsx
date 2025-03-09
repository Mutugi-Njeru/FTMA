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

const ValueChainBarChart = () => {
  const [date, setDate] = useState(getTodayDate()); // Dynamic date
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(null);
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

  // Fetch barchart data
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCounty) return; // Don't fetch if no county is selected

      try {
        let url =
          BASE_REST_API_URL +
          `/report/daily-prices?date=${date}&countyId=${selectedCounty.value}`;
        const response = await axios.get(url);
        setChartData(response.data.data.dailyPrices);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [date, selectedCounty]);

  const countyOptions = counties.map((county) => ({
    value: county.countyId,
    label: county.countyName,
  }));

  const handleCountyChange = (selectedOption) => {
    setSelectedCounty(selectedOption);
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

  return (
    <div className="w-full h-full p-2 bg-white rounded-lg flex flex-col space-y-2">
      {/* Top Section */}
      <div className="flex items-center justify-between pt-2 w-full">
        <span className="text-sm font-semibold">Value Chain Prices</span>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg text-sm pr-1"
          />
          <Select
            options={countyOptions}
            value={selectedCounty}
            onChange={handleCountyChange}
            styles={customSelectStyles}
            className="w-32 text-xs"
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
        {chartData.length > 0 && selectedCounty ? (
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product">
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
                dataKey="farmPrice"
                fill="#bab600"
                name="Farm Price"
                barSize={24}
              />
              <Bar
                dataKey="retailPrice"
                fill="#3b2f1f"
                name="Retail Price"
                barSize={24}
              />
              <Bar
                dataKey="wholesalePrice"
                fill="#73b5cd"
                name="Wholesale Price"
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No data available</p>
        )}
      </div>
    </div>
    // <div className="w-full h-full p-2 bg-white rounded-lg flex flex-col space-y-2">
    //   {/* Top Section */}
    //   <div className="flex items-center justify-between pt-2 w-full">
    //     <span className="text-sm font-semibold">Value Chain Prices</span>
    //     <div className="flex items-center space-x-2">
    //       <input
    //         type="date"
    //         value={date}
    //         onChange={(e) => setDate(e.target.value)}
    //         className="border rounded-lg text-sm pr-1"
    //       />
    //       <Select
    //         options={countyOptions}
    //         value={selectedCounty}
    //         onChange={handleCountyChange}
    //         styles={customSelectStyles}
    //         className="w-32 text-xs"
    //       />
    //       <button
    //         onClick={handleDownload}
    //         className="p-1 text-black rounded-lg flex items-center justify-center text-sm"
    //       >
    //         <FiDownload size={16} />
    //       </button>
    //     </div>
    //   </div>

    //   {/* Chart Section */}
    //   <div
    //     id="chart-container"
    //     className="w-full flex items-center justify-center"
    //   >
    //     {chartData.length > 0 && selectedCounty ? (
    //       <ResponsiveContainer width="100%" height={230}>
    //         <BarChart data={chartData}>
    //           <CartesianGrid strokeDasharray="3 3" />
    //           <XAxis dataKey="product">
    //             <Label
    //               value="Value Chains"
    //               offset={-5}
    //               position="insideBottom"
    //             />
    //           </XAxis>
    //           <YAxis
    //             label={{
    //               value: "Price per Kg (Ksh)",
    //               angle: -90,
    //               position: "insideBottomLeft",
    //             }}
    //           />
    //           <Tooltip />
    //           <Bar
    //             dataKey="farmPrice"
    //             fill="#A19E3B" // lemonGinger
    //             name="Farm Price"
    //             barSize={24}
    //           />
    //           <Bar
    //             dataKey="retailPrice"
    //             fill="#413324" // taupe
    //             name="Retail Price"
    //             barSize={24}
    //           />
    //           <Bar
    //             dataKey="wholesalePrice"
    //             fill="#94C9E2" // skyBlue
    //             name="Wholesale Price"
    //             barSize={24}
    //           />
    //         </BarChart>
    //       </ResponsiveContainer>
    //     ) : (
    //       <p className="text-gray-500">No data available</p>
    //     )}
    //   </div>
    // </div>
  );
};

export default ValueChainBarChart;
