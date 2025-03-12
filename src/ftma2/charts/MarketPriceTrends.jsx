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
import { BASE_REST_API_URL } from "../service/CountyProductsService";
import axios from "axios";
import { getLocations } from "../service/FscsService";

const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-CA"); // Ensures YYYY-MM-DD format in local time
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Ensure payload[0], payload[1], and payload[2] are defined
    const farmPrice = payload[0] ? payload[0].value : "N/A";
    const wholesalePrice = payload[1] ? payload[1].value : "N/A";
    const retailPrice = payload[2] ? payload[2].value : "N/A";

    return (
      <div className="bg-white p-3 border rounded-lg shadow-sm">
        <p className="text-sm text-gray-700">{`Date: ${format(
          new Date(label),
          "MMM d, yyyy"
        )}`}</p>
        <p className="text-sm text-gray-700">{`Farm Price: ${farmPrice}`}</p>
        <p className="text-sm text-gray-700">{`Wholesale Price: ${wholesalePrice}`}</p>
        <p className="text-sm text-gray-700">{`Retail Price: ${retailPrice}`}</p>
      </div>
    );
  }
  return null;
};

function MarketPriceTrends() {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(getTodayDate());
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [countyMarkets, setCountyMarkets] = useState([]);
  const [countyProducts, setCountyProducts] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // Fetch county markets when selectedCounty changes
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCounty) return; // Don't fetch if no county is selected

      try {
        let url =
          BASE_REST_API_URL +
          `/markets/list?pageNumber=1&pageSize=100000&startDate=${startDate}&endDate=${endDate}&countyIds=${selectedCounty.value}`;
        const response = await axios.get(url);
        setCountyMarkets(response.data.data.markets);
        // Set default product to marketId 87
        const defaultMarket = response.data.data.markets.find(
          (market) => market.marketId === 87
        );
        if (defaultMarket) {
          setSelectedMarket({
            value: defaultMarket.marketId,
            label: defaultMarket.title,
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedCounty]);

  // Fetch countyProducts when selectedCounty and market changes
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCounty && !selectedMarket) return; // Don't fetch if no county and market is selected

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
      // Ensure all required selections are present
      if (!selectedCounty || !selectedProduct || !selectedMarket) return;

      setIsLoading(true);
      try {
        let url =
          BASE_REST_API_URL +
          `/report/market-prices-trends?countyId=${selectedCounty.value}&countyProductId=${selectedProduct.value}&marketId=${selectedMarket.value}&startDate=${startDate}&endDate=${endDate}`;
        const response = await axios.get(url);
        if (response.data && response.data.success) {
          setChartData(response.data.data.marketPricesTrends);
        } else {
          console.error("API returned an error:", response.data.message);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCounty, selectedProduct, selectedMarket, startDate, endDate]);

  const countyOptions = counties.map((county) => ({
    value: county.countyId,
    label: county.countyName,
  }));

  const marketOptions = countyMarkets.map((market) => ({
    value: market.marketId,
    label: market.title,
  }));
  const productOptions = countyProducts.map((product) => ({
    value: product.countyProductId,
    label: product.product,
  }));

  const handleCountyChange = (selectedOption) => {
    setSelectedCounty(selectedOption);
    setSelectedMarket(null);
    setSelectedProduct(null);
  };

  const handleMarketChange = (selectedOption) => {
    setSelectedMarket(selectedOption);
    setSelectedProduct(null);
  };
  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (newStartDate > endDate) {
      alert("Start date cannot be greater than end date.");
      return;
    }
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (newEndDate < startDate) {
      alert("End date cannot be less than start date.");
      return;
    }
    setEndDate(newEndDate);
  };

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Farm Price,Market Price,Retail Price\n" +
      chartData
        .map(
          (item) =>
            `${item.priceDate},${item.farmPrice},${item.wholesalePrice},${item.retailPrice}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "market_price_trends.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    // <div className=" bg-slate-50">
    //   <div className="max-w-7xl mx-auto p-4">
    //     <div className=" rounded-xl shadow-sm border border-gray-200 p-2">
    //       <div className="bg-slate-100 p-2 rounded-lg">
    //         <div className="flex items-center justify-between mb-2">
    //           <h1 className="text-sm font-semibold text-gray-900">
    //             Market Price Trends
    //           </h1>
    //           <div className="text-sm text-gray-500">
    //             Last updated: {format(new Date(), "MMM d, yyyy")}
    //           </div>
    //         </div>
    //         <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 ml-1">
    //           <input
    //             type="date"
    //             value={startDate}
    //             onChange={handleStartDateChange}
    //             className="border rounded-lg text-sm pl-1"
    //           />
    //           <input
    //             type="date"
    //             value={endDate}
    //             onChange={handleEndDateChange}
    //             className="border rounded-lg text-sm pl-1"
    //           />
    //           <Select
    //             options={countyOptions}
    //             value={selectedCounty}
    //             onChange={handleCountyChange}
    //             styles={customSelectStyles}
    //             className="w-28 text-xs"
    //             placeholder="County"
    //           />
    //           <Select
    //             options={marketOptions}
    //             value={selectedMarket}
    //             onChange={handleMarketChange}
    //             styles={customSelectStyles}
    //             className="w-28 text-xs"
    //             placeholder="Market"
    //           />
    //           <Select
    //             options={productOptions}
    //             value={selectedProduct}
    //             onChange={handleProductChange}
    //             styles={customSelectStyles}
    //             className="w-32 text-xs"
    //             placeholder="Product"
    //           />
    //           <button
    //             onClick={handleDownload}
    //             className="p-1 text-black rounded-lg flex items-center justify-center text-sm disabled:cursor-not-allowed"
    //           >
    //             <FiDownload size={22} />
    //           </button>
    //         </div>
    //       </div>

    //       {isLoading ? (
    //         <div className="text-center py-20">
    //           <div className="text-gray-400 mb-2">Loading...</div>
    //         </div>
    //       ) : chartData.length > 0 ? (
    //         <ResponsiveContainer width="100%" height={300}>
    //           <LineChart data={chartData}>
    //             <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
    //             <XAxis
    //               dataKey="priceDate"
    //               tickFormatter={(date) => format(new Date(date), "MMM d")}
    //               stroke="#6b7280"
    //             />
    //             <YAxis stroke="#6b7280" />
    //             <Tooltip content={<CustomTooltip />} />
    //             <Legend />
    //             <Line
    //               type="monotone"
    //               dataKey="farmPrice"
    //               stroke="#5a3d2a"
    //               strokeWidth={2}
    //               dot={{ fill: "#5a3d2a" }}
    //               name="Farm Price"
    //             />
    //             <Line
    //               type="monotone"
    //               dataKey="wholesalePrice"
    //               stroke="#bab600"
    //               strokeWidth={2}
    //               dot={{ fill: "#bab600" }}
    //               name="Market Price"
    //             />
    //             <Line
    //               type="monotone"
    //               dataKey="retailPrice"
    //               stroke="#73b5cd"
    //               strokeWidth={2}
    //               dot={{ fill: "#73b5cd" }}
    //               name="Retail Price"
    //             />
    //           </LineChart>
    //         </ResponsiveContainer>
    //       ) : (
    //         <div className="text-center py-20">
    //           <div className="text-gray-400 mb-2">No data to display</div>
    //           <p className="text-sm text-gray-500">
    //             Select all filters to view the price trends
    //           </p>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="bg-slate-50 p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="bg-slate-100 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Market Price Trends
          </h1>
          <div className="text-sm text-gray-500">
            Last updated: {format(new Date(), "MMM d, yyyy")}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
          {/* ... existing input and select elements ... */}
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="border rounded-lg text-sm pl-1"
          />
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="border rounded-lg text-sm pl-1"
          />
          <Select
            options={countyOptions}
            value={selectedCounty}
            onChange={handleCountyChange}
            styles={customSelectStyles}
            className="w-28 text-xs"
            placeholder="County"
          />
          <Select
            options={marketOptions}
            value={selectedMarket}
            onChange={handleMarketChange}
            styles={customSelectStyles}
            className="w-28 text-xs"
            placeholder="Market"
          />
          <Select
            options={productOptions}
            value={selectedProduct}
            onChange={handleProductChange}
            styles={customSelectStyles}
            className="w-32 text-xs"
            placeholder="Product"
          />
          <button
            onClick={handleDownload}
            className="p-1 text-black rounded-lg flex items-center justify-center text-sm disabled:cursor-not-allowed"
          >
            <FiDownload size={22} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20">
          <div className="text-gray-400 mb-2">Loading...</div>
        </div>
      ) : chartData.length > 0 ? (
        <div className="mt-4 h-96 lg:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="priceDate"
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
                dataKey="wholesalePrice"
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
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-gray-400 mb-2">No data to display</div>
          <p className="text-sm text-gray-500">
            Select all filters to view the price trends
          </p>
        </div>
      )}
    </div>
  );
}

export default MarketPriceTrends;
