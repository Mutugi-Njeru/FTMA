import { useState, useEffect } from "react";
import Select from "react-select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { FiDownload } from "react-icons/fi";
import customSelectStyles from "../../styles/customSelectStyles";

const mockData = {
  counties: ["Nairobi", "Mombasa", "Kisumu"],
  products: ["Maize", "Potatoes", "Beans"],
  priceData: [
    {
      date: "2024-01-01",
      product: "Maize",
      county: "Nairobi",
      farmPrice: 30,
      retailPrice: 45,
      marketPrice: 40,
    },
    {
      date: "2024-01-02",
      product: "Maize",
      county: "Nairobi",
      farmPrice: 32,
      retailPrice: 47,
      marketPrice: 42,
    },
    {
      date: "2024-01-03",
      product: "Maize",
      county: "Mombasa",
      farmPrice: 31,
      retailPrice: 46,
      marketPrice: 41,
    },
    {
      date: "2024-01-04",
      product: "Beans",
      county: "Kisumu",
      farmPrice: 83,
      retailPrice: 103,
      marketPrice: 93,
    },
  ],
};

function CountyPriceTrends() {
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (selectedCounty && selectedProduct && fromDate && toDate) {
      const filtered = mockData.priceData.filter(
        (item) =>
          item.county === selectedCounty &&
          item.product === selectedProduct &&
          item.date >= fromDate &&
          item.date <= toDate
      );
      setFilteredData(filtered);
    }
  }, [selectedCounty, selectedProduct, fromDate, toDate]);

  const countyOptions = mockData.counties.map((county) => ({
    value: county,
    label: county,
  }));
  const productOptions = mockData.products.map((product) => ({
    value: product,
    label: product,
  }));

  return (
    <div className=" bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="bg-slate-100 p-2 rounded-lg">
          <h1 className="text-sm font-semibold text-gray-900 mb-2 ">
            County Price Trends
          </h1>
          <div className="flex items-center space-x-3 ">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded-lg text-sm px-2"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded-lg text-sm px-2"
            />
            <Select
              options={countyOptions}
              value={countyOptions.find(
                (option) => option.value === selectedCounty
              )}
              styles={customSelectStyles}
              onChange={(option) => setSelectedCounty(option.value)}
              className="w-32 text-xs"
              placeholder="County"
            />
            <Select
              options={productOptions}
              value={productOptions.find(
                (option) => option.value === selectedProduct
              )}
              styles={customSelectStyles}
              onChange={(option) => setSelectedProduct(option.value)}
              className="w-32 text-xs"
              placeholder="Product"
            />
            <button
              onClick={() => {
                const csvData = filteredData
                  .map(
                    (item) =>
                      `${item.date},${item.product},${item.county},${item.farmPrice},${item.retailPrice},${item.marketPrice}`
                  )
                  .join("\n");
                const blob = new Blob(
                  [
                    `Date,Product,County,Farm Price,Retail Price,Market Price\n${csvData}`,
                  ],
                  { type: "text/csv" }
                );
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "selected_data.csv";
                a.click();
                window.URL.revokeObjectURL(url);
              }}
              disabled={filteredData.length === 0}
              className="p-1 text-black rounded-lg flex items-center justify-center text-sm disabled:cursor-not-allowed"
            >
              <FiDownload size={22} />
            </button>
          </div>
        </div>

        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), "MMM d")}
                stroke="#6b7280"
              />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="farmPrice"
                stroke="#5a3d2a"
                strokeWidth={2}
                name="Farm Price"
              />
              <Line
                type="monotone"
                dataKey="marketPrice"
                stroke="#bab600"
                strokeWidth={2}
                name="Market Price"
              />
              <Line
                type="monotone"
                dataKey="retailPrice"
                stroke="#73b5cd"
                strokeWidth={2}
                name="Retail Price"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-2">No data to display</div>
            <p className="text-sm text-gray-500">
              Select all filters to view the price trends
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountyPriceTrends;
