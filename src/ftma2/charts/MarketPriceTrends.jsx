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
import customSelectStyles from "../../styles/customSelectStyles";
import { FiDownload } from "react-icons/fi";

// Mock data remains the same
const mockData = {
  counties: ["Nairobi", "Mombasa", "Kisumu"],
  markets: {
    Nairobi: ["Wakulima", "Gikomba", "Westlands"],
    Mombasa: ["Kongowea", "Marikiti", "Mwembe Tayari"],
    Kisumu: ["Kibuye", "Jubilee", "Kondele"],
  },
  products: ["Maize", "Potatoes", "Beans"],
  priceData: [
    // All the existing mock data remains the same
    // Maize data
    {
      date: "2024-01-01",
      product: "Maize",
      market: "Wakulima",
      farmPrice: 30,
      retailPrice: 45,
      marketPrice: 40,
    },
    {
      date: "2024-01-02",
      product: "Maize",
      market: "Wakulima",
      farmPrice: 32,
      retailPrice: 47,
      marketPrice: 42,
    },
    {
      date: "2024-01-03",
      product: "Maize",
      market: "Wakulima",
      farmPrice: 31,
      retailPrice: 46,
      marketPrice: 41,
    },
    {
      date: "2024-01-04",
      product: "Maize",
      market: "Wakulima",
      farmPrice: 33,
      retailPrice: 48,
      marketPrice: 43,
    },
    {
      date: "2024-01-05",
      product: "Maize",
      market: "Wakulima",
      farmPrice: 34,
      retailPrice: 49,
      marketPrice: 44,
    },

    // Potatoes data
    {
      date: "2024-01-01",
      product: "Potatoes",
      market: "Wakulima",
      farmPrice: 45,
      retailPrice: 65,
      marketPrice: 55,
    },
    {
      date: "2024-01-02",
      product: "Potatoes",
      market: "Wakulima",
      farmPrice: 47,
      retailPrice: 67,
      marketPrice: 57,
    },
    {
      date: "2024-01-03",
      product: "Potatoes",
      market: "Wakulima",
      farmPrice: 46,
      retailPrice: 66,
      marketPrice: 56,
    },
    {
      date: "2024-01-04",
      product: "Potatoes",
      market: "Wakulima",
      farmPrice: 48,
      retailPrice: 68,
      marketPrice: 58,
    },
    {
      date: "2024-01-05",
      product: "Potatoes",
      market: "Wakulima",
      farmPrice: 49,
      retailPrice: 69,
      marketPrice: 59,
    },

    // Beans data
    {
      date: "2024-01-01",
      product: "Beans",
      market: "Wakulima",
      farmPrice: 80,
      retailPrice: 100,
      marketPrice: 90,
    },
    {
      date: "2024-01-02",
      product: "Beans",
      market: "Wakulima",
      farmPrice: 82,
      retailPrice: 102,
      marketPrice: 92,
    },
    {
      date: "2024-01-03",
      product: "Beans",
      market: "Wakulima",
      farmPrice: 81,
      retailPrice: 101,
      marketPrice: 91,
    },
    {
      date: "2024-01-04",
      product: "Beans",
      market: "Wakulima",
      farmPrice: 83,
      retailPrice: 103,
      marketPrice: 93,
    },
    {
      date: "2024-01-05",
      product: "Beans",
      market: "Wakulima",
      farmPrice: 84,
      retailPrice: 104,
      marketPrice: 94,
    },

    // Maize data for Gikomba
    {
      date: "2024-01-01",
      product: "Maize",
      market: "Gikomba",
      farmPrice: 31,
      retailPrice: 46,
      marketPrice: 41,
    },
    {
      date: "2024-01-02",
      product: "Maize",
      market: "Gikomba",
      farmPrice: 33,
      retailPrice: 48,
      marketPrice: 43,
    },
    {
      date: "2024-01-03",
      product: "Maize",
      market: "Gikomba",
      farmPrice: 32,
      retailPrice: 47,
      marketPrice: 42,
    },
    {
      date: "2024-01-04",
      product: "Maize",
      market: "Gikomba",
      farmPrice: 34,
      retailPrice: 49,
      marketPrice: 44,
    },
    {
      date: "2024-01-05",
      product: "Maize",
      market: "Gikomba",
      farmPrice: 35,
      retailPrice: 50,
      marketPrice: 45,
    },

    // Kongowea market data
    {
      date: "2024-01-01",
      product: "Maize",
      market: "Kongowea",
      farmPrice: 28,
      retailPrice: 43,
      marketPrice: 38,
    },
    {
      date: "2024-01-02",
      product: "Maize",
      market: "Kongowea",
      farmPrice: 29,
      retailPrice: 44,
      marketPrice: 39,
    },
    {
      date: "2024-01-03",
      product: "Maize",
      market: "Kongowea",
      farmPrice: 30,
      retailPrice: 45,
      marketPrice: 40,
    },
    {
      date: "2024-01-04",
      product: "Maize",
      market: "Kongowea",
      farmPrice: 31,
      retailPrice: 46,
      marketPrice: 41,
    },
    {
      date: "2024-01-05",
      product: "Maize",
      market: "Kongowea",
      farmPrice: 32,
      retailPrice: 47,
      marketPrice: 42,
    },

    // Kibuye market data
    {
      date: "2024-01-01",
      product: "Potatoes",
      market: "Kibuye",
      farmPrice: 42,
      retailPrice: 62,
      marketPrice: 52,
    },
    {
      date: "2024-01-02",
      product: "Potatoes",
      market: "Kibuye",
      farmPrice: 43,
      retailPrice: 63,
      marketPrice: 53,
    },
    {
      date: "2024-01-03",
      product: "Potatoes",
      market: "Kibuye",
      farmPrice: 44,
      retailPrice: 64,
      marketPrice: 54,
    },
    {
      date: "2024-01-04",
      product: "Potatoes",
      market: "Kibuye",
      farmPrice: 45,
      retailPrice: 65,
      marketPrice: 55,
    },
    {
      date: "2024-01-05",
      product: "Potatoes",
      market: "Kibuye",
      farmPrice: 46,
      retailPrice: 66,
      marketPrice: 56,
    },
  ],
};

function MarketPriceTrends() {
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setSelectedMarket("");
  }, [selectedCounty]);

  useEffect(() => {
    if (
      selectedCounty &&
      selectedMarket &&
      selectedProduct &&
      fromDate &&
      toDate
    ) {
      const filtered = mockData.priceData.filter(
        (item) =>
          item.market === selectedMarket &&
          item.product === selectedProduct &&
          item.date >= fromDate &&
          item.date <= toDate
      );
      setFilteredData(filtered);
    }
  }, [selectedCounty, selectedMarket, selectedProduct, fromDate, toDate]);

  const convertToCSV = (data) => {
    const headers = [
      "Date",
      "Product",
      "Market",
      "Farm Price",
      "Retail Price",
      "Market Price",
    ];
    const rows = data.map((item) => [
      item.date,
      item.product,
      item.market,
      item.farmPrice,
      item.retailPrice,
      item.marketPrice,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900">
            {format(new Date(label), "MMM d, yyyy")}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: KES {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const countyOptions = mockData.counties.map((county) => ({
    value: county,
    label: county,
  }));
  const marketOptions = selectedCounty
    ? mockData.markets[selectedCounty].map((market) => ({
        value: market,
        label: market,
      }))
    : [];
  const productOptions = mockData.products.map((product) => ({
    value: product,
    label: product,
  }));

  return (
    <div className=" bg-slate-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className=" rounded-xl shadow-sm border border-gray-200 p-2">
          <div className="bg-slate-100 p-2 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-sm font-semibold text-gray-900">
                Market Price Trends
              </h1>
              <div className="text-sm text-gray-500">
                Last updated: {format(new Date(), "MMM d, yyyy")}
              </div>
            </div>
            <div className="flex items-center space-x-3 ml-1">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border rounded-lg text-sm pl-1"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border rounded-lg text-sm pl-1"
              />
              <Select
                options={countyOptions}
                value={countyOptions.find(
                  (option) => option.value === selectedCounty
                )}
                onChange={(selectedOption) =>
                  setSelectedCounty(selectedOption.value)
                }
                styles={customSelectStyles}
                className="w-28 text-xs"
                placeholder="County"
              />
              <Select
                options={marketOptions}
                value={marketOptions.find(
                  (option) => option.value === selectedMarket
                )}
                onChange={(selectedOption) =>
                  setSelectedMarket(selectedOption.value)
                }
                styles={customSelectStyles}
                className="w-28 text-xs"
                isDisabled={!selectedCounty} // Disable when no county is selected
                placeholder="Market"
              />
              <Select
                options={productOptions}
                value={productOptions.find(
                  (option) => option.value === selectedProduct
                )}
                onChange={(selectedOption) =>
                  setSelectedProduct(selectedOption.value)
                }
                styles={customSelectStyles}
                className="w-32 text-xs"
                isDisabled={!selectedMarket} // Disable if no market is selected
                placeholder="Product"
              />
              <button
                onClick={() => {
                  const csvData = convertToCSV(filteredData);
                  const blob = new Blob([csvData], { type: "text/csv" });
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
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="farmPrice"
                  stroke="#5a3d2a"
                  strokeWidth={2}
                  dot={{ fill: "#5a3d2a" }}
                  name="Farm Price"
                />
                <Line
                  type="monotone"
                  dataKey="marketPrice"
                  stroke="#bab600"
                  strokeWidth={2}
                  dot={{ fill: "#bab600" }}
                  name="Market Price"
                />
                <Line
                  type="monotone"
                  dataKey="retailPrice"
                  stroke="#73b5cd"
                  strokeWidth={2}
                  dot={{ fill: "#73b5cd" }}
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
    </div>
  );
}

export default MarketPriceTrends;
