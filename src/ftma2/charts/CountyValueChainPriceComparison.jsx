import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Select from "react-select";
import html2canvas from "html2canvas";
import { FiDownload } from "react-icons/fi";
import customSelectStyles from "../../styles/customSelectStyles";

const countries = [
  { value: "USA", label: "USA" },
  { value: "UK", label: "UK" },
  { value: "Germany", label: "Germany" },
  { value: "Kenya", label: "Kenya" },
];

const sampleData = {
  "2024-02-21": {
    USA: [
      { name: "Town A", cars: 400, buses: 200, taxis: 100 },
      { name: "Town B", cars: 300, buses: 250, taxis: 150 },
      { name: "Town C", cars: 500, buses: 300, taxis: 200 },
    ],
    UK: [
      { name: "Town A", cars: 250, buses: 150, taxis: 100 },
      { name: "Town B", cars: 450, buses: 250, taxis: 200 },
      { name: "Town C", cars: 350, buses: 200, taxis: 180 },
    ],
    Germany: [
      { name: "Town A", cars: 320, buses: 180, taxis: 120 },
      { name: "Town B", cars: 380, buses: 220, taxis: 140 },
      { name: "Town C", cars: 420, buses: 240, taxis: 160 },
    ],
    Kenya: [
      { name: "Town A", cars: 320, buses: 180, taxis: 120 },
      { name: "Town B", cars: 380, buses: 220, taxis: 140 },
      { name: "Town C", cars: 420, buses: 240, taxis: 160 },
      { name: "Town C", cars: 420, buses: 240, taxis: 160 },
      { name: "Town C", cars: 420, buses: 240, taxis: 160 },
      { name: "Town C", cars: 420, buses: 240, taxis: 160 },
    ],
  },
};

const CountyValueChainPriceComparison = () => {
  const [date, setDate] = useState("2024-02-21");
  const [country, setCountry] = useState(countries[0]);

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
    <div className="ml-4 m-2 shadow-sm border border-gray-200 bg-slate-50  rounded-xl">
      {/* Top Section */}
      <div className="bg-slate-100 m-2 rounded-lg">
        <div className="text-sm font-semibold p-2">
          County Value Chain Price Comparison
        </div>

        <div className="flex items-center space-x-2 p-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg text-sm pr-1"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg text-sm pr-1"
          />
          <Select
            options={countries}
            value={country}
            onChange={setCountry}
            styles={customSelectStyles}
            className="w-28 text-xs"
          />
          <Select
            options={countries}
            value={country}
            onChange={setCountry}
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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sampleData[date]?.[country.value] || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: "Price per Kg",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="cars" fill="#bab600" name="Cars" barSize={24} />
            <Bar dataKey="buses" fill="#3b2b1f" name="Buses" barSize={24} />
            <Bar dataKey="taxis" fill="#73b5cd" name="Taxis" barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CountyValueChainPriceComparison;
