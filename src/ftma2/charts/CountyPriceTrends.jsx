import { useState, useEffect } from "react";
import Select from "react-select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { format } from "date-fns";
import { FiDownload } from "react-icons/fi";
import customSelectStyles from "../../styles/customSelectStyles";
import { getLocations } from "../service/FscsService";
import axios from "axios";
import { BASE_REST_API_URL } from "../service/CountyProductsService";

const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-CA"); // Ensures YYYY-MM-DD format in local time
};
function CountyPriceTrends() {
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
          `/report/prices-trends?countyProductId=${selectedProduct.value}&countyId=${selectedCounty.value}&startDate=${startDate}&endDate=${endDate}`;
        const response = await axios.get(url);
        setChartData(response.data.data.pricesTrend);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedCounty, selectedProduct, startDate, endDate]);

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
    // <div className=" bg-slate-50 p-4">
    //   <div className="max-w-7xl mx-auto rounded-xl shadow-sm border border-gray-200 p-2">
    //     <div className="bg-slate-100 p-2 rounded-lg">
    //       <h1 className="text-sm font-semibold text-gray-900 mb-2 ">
    //         County Price Trends
    //       </h1>
    //       <div className="flex items-center space-x-3 ">
    //         <input
    //           type="date"
    //           value={startDate}
    //           onChange={(e) => setStartDate(e.target.value)}
    //           className="border rounded-lg text-sm px-2"
    //         />
    //         <input
    //           type="date"
    //           value={endDate}
    //           onChange={(e) => setEndDate(e.target.value)}
    //           className="border rounded-lg text-sm px-2"
    //         />
    //         <Select
    //           options={countyOptions}
    //           value={selectedCounty}
    //           onChange={handleCountyChange}
    //           styles={customSelectStyles}
    //           className="w-32 text-xs"
    //           placeholder="County"
    //         />
    //         <Select
    //           options={productOptions}
    //           value={selectedProduct}
    //           onChange={handleProductChange}
    //           styles={customSelectStyles}
    //           className="w-32 text-xs"
    //           placeholder="Product"
    //         />
    //         <button className="p-1 text-black rounded-lg flex items-center justify-center text-sm disabled:cursor-not-allowed">
    //           <FiDownload size={22} />
    //         </button>
    //       </div>
    //     </div>

    //     {chartData.length > 0 ? (
    //       <ResponsiveContainer width="100%" height={300}>
    //         <LineChart data={chartData}>
    //           <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
    //           <XAxis
    //             dataKey="date"
    //             tickFormatter={(date) => format(new Date(date), "MMM d")}
    //             stroke="#6b7280"
    //           >
    //             <Label value="Date" offset={-5} position="insideBottom" />
    //           </XAxis>
    //           <YAxis stroke="#6b7280">
    //             <Label
    //               value="Price (Ksh)"
    //               angle={-90}
    //               position="insideLeft"
    //               offset={0}
    //               style={{ textAnchor: "middle" }}
    //             />
    //           </YAxis>
    //           <Tooltip />
    //           {/* <Legend /> */}
    //           <Line
    //             type="monotone"
    //             dataKey="farmPrice"
    //             stroke="#5a3d2a"
    //             strokeWidth={2}
    //             name="Farm Price"
    //           />
    //           <Line
    //             type="monotone"
    //             dataKey="wholesalePrice"
    //             stroke="#bab600"
    //             strokeWidth={2}
    //             name="Wholesale Price"
    //           />
    //           <Line
    //             type="monotone"
    //             dataKey="retailPrice"
    //             stroke="#73b5cd"
    //             strokeWidth={2}
    //             name="Retail Price"
    //           />
    //         </LineChart>
    //       </ResponsiveContainer>
    //     ) : (
    //       <div className="text-center py-20">
    //         <div className="text-gray-400 mb-2">No data to display</div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="bg-slate-50 p-4 rounded-xl shadow-sm border border-gray-200">
      {/* Top Section */}
      <div className="bg-slate-100 p-4 rounded-lg">
        <h1 className="text-lg font-semibold text-gray-900 mb-4">
          County Price Trends
        </h1>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg text-sm px-2 py-1 w-full sm:w-auto"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg text-sm px-2 py-1 w-full sm:w-auto"
          />
          <Select
            options={countyOptions}
            value={selectedCounty}
            onChange={handleCountyChange}
            styles={customSelectStyles}
            className="w-full sm:w-32 text-xs"
            placeholder="County"
          />
          <Select
            options={productOptions}
            value={selectedProduct}
            onChange={handleProductChange}
            styles={customSelectStyles}
            className="w-full sm:w-32 text-xs"
            placeholder="Product"
          />
          <button className="p-1 text-black rounded-lg flex items-center justify-center text-sm disabled:cursor-not-allowed">
            <FiDownload size={22} />
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-4 h-96 lg:h-[500px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), "MMM d")}
                stroke="#6b7280"
              >
                <Label value="Date" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis stroke="#6b7280">
                <Label
                  value="Price (Ksh)"
                  angle={-90}
                  position="insideLeft"
                  offset={0}
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="farmPrice"
                stroke="#5a3d2a"
                strokeWidth={2}
                name="Farm Price"
              />
              <Line
                type="monotone"
                dataKey="wholesalePrice"
                stroke="#bab600"
                strokeWidth={2}
                name="Wholesale Price"
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
          </div>
        )}
      </div>
    </div>
  );
}

export default CountyPriceTrends;
