import React, { useEffect, useState } from "react";
import { X, User, Phone, Mail, UserCircle } from "lucide-react";
import axios from "axios";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";

const AddFscModal = ({ counties, isOpen, onClose, onSubmit }) => {
  const [roles, setRoles] = useState([]);
  const [markets, setMarkets] = useState([]); // State to store markets
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    msisdn: "",
    username: "",
    gender: "",
    roleId: "",
    fsc: "",
    marketId: "", // Added marketId to formData
    countyId: "", // Added countyId to formData
  });

  // Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(BASE_REST_API_URL + "/roles/list");
        setRoles(response.data.data);
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchRoles();
  }, []);

  // Fetch markets when role is selected as FSC and countyId changes
  useEffect(() => {
    const fetchMarkets = async () => {
      if (formData.roleId === "4" && formData.countyId) {
        try {
          let url =
            BASE_REST_API_URL +
            `/markets/list?pageNumber=1&pageSize=100000&startDate=2024-01-01&endDate=2025-10-10&countyIds=${formData.countyId}`;
          const response = await axios.get(url);
          setMarkets(response.data.data.markets);
        } catch (err) {
          console.error("Error fetching markets:", err);
        }
      } else {
        setMarkets([]); // Clear markets if the role is not FSC or countyId is not selected
      }
    };
    fetchMarkets();
  }, [formData.roleId, formData.countyId]); // Trigger when roleId or countyId changes

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      msisdn: "",
      username: "",
      gender: "",
      roleId: "",
      fsc: "",
      marketId: 0,
      countyId: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData, resetForm); // Wait for the onSubmit result
    if (success) {
      onClose(); // Only close the modal if the user creation was successful
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl relative">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Add Farm Service Center
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label
                  htmlFor="msisdn"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="msisdn"
                    name="msisdn"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.msisdn}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label
                  htmlFor="roleId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    id="roleId"
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role.roleId} value={role.roleId}>
                        {role.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Counties Dropdown */}
              <div className="space-y-2">
                <label
                  htmlFor="countyId"
                  className="block text-sm font-medium text-gray-700"
                >
                  County
                </label>
                <select
                  id="countyId"
                  name="countyId"
                  value={formData.countyId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  required
                >
                  <option value="">Select a county</option>
                  {counties.map((county) => (
                    <option key={county.countyId} value={county.countyId}>
                      {county.countyName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Markets Dropdown (Conditional) */}
              {formData.roleId === "4" && (
                <div className="space-y-2">
                  <label
                    htmlFor="marketId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Market
                  </label>
                  <select
                    id="marketId"
                    name="marketId"
                    value={formData.marketId}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  >
                    <option value="">Select a market</option>
                    {markets.map((market) => (
                      <option key={market.marketId} value={market.marketId}>
                        {market.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
              >
                Add Service Center
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFscModal;
