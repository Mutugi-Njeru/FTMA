import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getLocations } from "../../service/FscsService";
import axios from "axios";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";
import { toast } from "react-toastify";

const CreateMarketModal = ({ setIsModalOpen, isModalOpen }) => {
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);
  const [selectedSubcounty, setSelectedSubcounty] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [wards, setWards] = useState([]);
  const [marketTitle, setMarketTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [googleMapLink, setGoogleMapLink] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch counties on component mount
  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const response = await getLocations();
        setCounties(response.data.data.counties);
      } catch (err) {
        console.error("Error fetching counties:", err);
      }
    };
    fetchCounties();
  }, []);

  // Update sub-counties when county is selected
  useEffect(() => {
    if (selectedCounty) {
      const county = counties.find((c) => c.countyId === selectedCounty.value);
      setSubCounties(county ? county.subCounties : []);
      setSelectedSubcounty(null);
      setSelectedWard(null);
    }
  }, [selectedCounty, counties]);

  // Update wards when sub-county is selected
  useEffect(() => {
    if (selectedSubcounty) {
      const subCounty = subCounties.find(
        (sc) => sc.subCountyId === selectedSubcounty.value
      );
      setWards(subCounty ? subCounty.wards : []);
      setSelectedWard(null);
    }
  }, [selectedSubcounty, subCounties]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !selectedWard ||
      !marketTitle ||
      !latitude ||
      !longitude ||
      !googleMapLink
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const payload = {
        wardId: selectedWard.value,
        title: marketTitle,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        googleMapLink: googleMapLink,
      };
      const response = await axios.post(
        `${BASE_REST_API_URL}/markets/create`,
        payload
      );
      toast.success("Market created successfully");
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setError("Failed to create market. Please try again.");
      toast.error("Failed to create market");
      console.error("Error creating market:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const resetForm = () => {
    setMarketTitle("");
    setSelectedCounty(null);
    setSelectedSubcounty(null);
    setSelectedWard(null);
    setLatitude("");
    setLongitude("");
    setGoogleMapLink("");
  };

  const countyOptions = counties.map((county) => ({
    value: county.countyId,
    label: county.countyName,
  }));

  const subcountyOptions = subCounties.map((subCounty) => ({
    value: subCounty.subCountyId,
    label: subCounty.subCountyName,
  }));

  const wardOptions = wards.map((ward) => ({
    value: ward.wardId,
    label: ward.wardName,
  }));

  const handleCountyChange = (selectedOption) => {
    setSelectedCounty(selectedOption);
  };

  const handleSubcountyChange = (selectedOption) => {
    setSelectedSubcounty(selectedOption);
  };

  const handleWardChange = (selectedOption) => {
    setSelectedWard(selectedOption);
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl relative">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Market</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* County Dropdown */}
                  <div className="space-y-2">
                    <label
                      htmlFor="county"
                      className="block text-sm font-medium text-gray-700"
                    >
                      County
                    </label>
                    <Select
                      options={countyOptions}
                      value={selectedCounty}
                      onChange={handleCountyChange}
                      placeholder="Select County"
                      isDisabled={isLoading}
                    />
                  </div>

                  {/* Subcounty Dropdown */}
                  <div className="space-y-2">
                    <label
                      htmlFor="subcounty"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subcounty
                    </label>
                    <Select
                      options={subcountyOptions}
                      value={selectedSubcounty}
                      onChange={handleSubcountyChange}
                      placeholder="Select Subcounty"
                      isDisabled={!selectedCounty || isLoading}
                    />
                  </div>

                  {/* Ward Dropdown */}
                  <div className="space-y-2">
                    <label
                      htmlFor="ward"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ward
                    </label>
                    <Select
                      options={wardOptions}
                      value={selectedWard}
                      onChange={handleWardChange}
                      placeholder="Select Ward"
                      isDisabled={!selectedSubcounty || isLoading}
                    />
                  </div>

                  {/* Market Title Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="marketTitle"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Market Title
                    </label>
                    <input
                      id="marketTitle"
                      name="marketTitle"
                      type="text"
                      placeholder="Enter Market Title"
                      value={marketTitle}
                      onChange={(e) => setMarketTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Latitude Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="latitude"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Latitude
                    </label>
                    <input
                      id="latitude"
                      name="latitude"
                      type="number"
                      placeholder="Enter Latitude"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Longitude Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="longitude"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Longitude
                    </label>
                    <input
                      id="longitude"
                      name="longitude"
                      type="number"
                      placeholder="Enter Longitude"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Google Map Link Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="googleMapLink"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Google Map Link
                    </label>
                    <input
                      id="googleMapLink"
                      name="googleMapLink"
                      type="url"
                      placeholder="Enter Google Map Link"
                      value={googleMapLink}
                      onChange={(e) => setGoogleMapLink(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
                  >
                    {isLoading ? "Creating..." : "Add Market"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMarketModal;
