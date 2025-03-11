import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";
import { toast } from "react-toastify";

const AddCountyChainModal = ({ isOpen, onClose, counties, valueChains }) => {
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedValueChain, setSelectedValueChain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddChain = async () => {
    if (!selectedCounty || !selectedValueChain) {
      setError("Please select both a county and a value chain.");
      return;
    }
    const payload = {
      countyId: selectedCounty.value,
      productId: selectedValueChain.value,
    };
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_REST_API_URL}/county-product/create`,
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("product added successfully");
        onClose();
      }
    } catch (err) {
      setError("Failed to add the chain. Please try again.");
      toast.error("failed to add product");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const countyOptions = counties.map((county) => ({
    value: county.countyId,
    label: county.countyName,
  }));

  const valueChainOptions = valueChains.map((chain) => ({
    value: chain.productId,
    label: chain.productName,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Add Chain</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a County
          </label>
          <Select
            options={countyOptions}
            onChange={(selectedOption) => setSelectedCounty(selectedOption)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Value Chain
          </label>
          <Select
            options={valueChainOptions}
            onChange={(selectedOption) => setSelectedValueChain(selectedOption)}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="border text-black px-6 py-2 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAddChain}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Chain"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCountyChainModal;
