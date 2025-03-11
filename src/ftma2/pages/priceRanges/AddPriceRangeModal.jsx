import { Award, DollarSign, MapPin, Package, Scale, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";
import axios from "axios";
import { toast } from "react-toastify";
import CustomSelectStyles from "./CustomSelectStyles";
import CustomSelectStyles2 from "./CustomSelectStyles2";

const AddPriceRangeModal = ({ isOpen, onClose, counties }) => {
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [units, setUnits] = useState([]);
  const [countyProducts, setCountyProducts] = useState([]);
  const [rewardPoints, setRewardPoints] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCounty) return;

      try {
        let url =
          BASE_REST_API_URL +
          `/county-products/list?countyIds=${selectedCounty.value}`;
        const response = await axios.get(url);
        setCountyProducts(response.data.data.countyProducts);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedCounty]);

  //fetch units of measurements
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        let url = BASE_REST_API_URL + "/products/unit-of-measurement/list";
        const response = await axios.get(url);
        setUnits(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchUnits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedCounty ||
      !selectedProduct ||
      !selectedUnit ||
      !minPrice ||
      !maxPrice ||
      !rewardPoints
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    const payload = {
      countyProductId: selectedProduct.value,
      measurementUnitId: selectedUnit.value,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      rewardPoints: parseInt(rewardPoints),
    };

    try {
      const response = await axios.post(
        BASE_REST_API_URL + "/county-product-price-range/create",
        payload
      );

      if (response.status === 200) {
        toast.success("Price range added successfully!");
        setSelectedCounty(null);
        setSelectedProduct(null);
        setSelectedUnit(null);
        setMinPrice("");
        setMaxPrice("");
        setRewardPoints("");
        onClose();
      }
    } catch (error) {
      console.error("Error adding price range:", error);
      toast.error("Failed to add price range. Please try again.");
    }
  };

  const countyOptions = counties.map((county) => ({
    value: county.countyId,
    label: county.countyName,
  }));

  const productOptions = countyProducts.map((product) => ({
    value: product.countyProductId,
    label: product.product,
  }));
  const unitOptions = units.map((unit) => ({
    value: unit.measurementUnitId,
    label: unit.title,
  }));

  const handleCountyChange = (selectedOption) => {
    setSelectedCounty(selectedOption);
    setSelectedProduct(null);
  };

  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
    setSelectedUnit(null);
  };
  const handleUnitChange = (selectedOption) => {
    setSelectedUnit(selectedOption);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-start pt-1 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Price Range
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                County
              </label>
              <Select
                options={countyOptions}
                value={selectedCounty}
                onChange={handleCountyChange}
                placeholder="Select County"
                styles={CustomSelectStyles}
                className="react-select-container"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Package className="w-4 h-4 mr-2 text-gray-400" />
                Commodity
              </label>
              <Select
                options={productOptions}
                value={selectedProduct}
                onChange={handleProductChange}
                placeholder="Select Commodity"
                styles={CustomSelectStyles}
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Scale className="w-4 h-4 mr-2 text-gray-400" />
                Unit of Measurement
              </label>
              <Select
                options={unitOptions}
                value={selectedUnit}
                onChange={handleUnitChange}
                placeholder="Select Unit"
                styles={CustomSelectStyles2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                  Minimum Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                  Maximum Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Award className="w-4 h-4 mr-2 text-gray-400" />
                Reward Points
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={rewardPoints}
                onChange={(e) => setRewardPoints(e.target.value)}
                placeholder="Enter reward points"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Save Price Range
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPriceRangeModal;
