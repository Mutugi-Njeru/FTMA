import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BASE_REST_API_URL } from "../../service/CountyProductsService";
import { getLocations } from "../../service/FscsService";
import axios from "axios";
import { toast } from "react-toastify";

const AddUserModal = ({ isModalOpen, setIsModalOpen }) => {
  const [roles, setRoles] = useState([]);
  const [counties, setCounties] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState({
    counties: false,
    roles: false,
    markets: false,
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    msisdn: "",
    username: "",
    gender: "",
    roleId: "",
    fsc: "",
    marketId: "",
    countyId: "",
  });

  useEffect(() => {
    const fetchCounties = async () => {
      setLoading((prev) => ({ ...prev, counties: true }));
      try {
        const response = await getLocations();
        setCounties(response.data.data.counties);
      } catch (err) {
        console.error("Error fetching counties:", err);
      } finally {
        setLoading((prev) => ({ ...prev, counties: false }));
      }
    };
    fetchCounties();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading((prev) => ({ ...prev, roles: true }));
      try {
        const response = await axios.get(BASE_REST_API_URL + "/roles/list");
        setRoles(response.data.data);
      } catch (err) {
        console.error("Error fetching roles:", err);
      } finally {
        setLoading((prev) => ({ ...prev, roles: false }));
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchMarkets = async () => {
      if (formData.roleId === "4" && formData.countyId) {
        setLoading((prev) => ({ ...prev, markets: true }));
        try {
          let url =
            BASE_REST_API_URL +
            `/markets/list?pageNumber=1&pageSize=100000&startDate=2024-01-01&endDate=2025-10-10&countyIds=${formData.countyId}`;
          const response = await axios.get(url);
          setMarkets(response.data.data.markets);
        } catch (err) {
          console.error("Error fetching markets:", err);
        } finally {
          setLoading((prev) => ({ ...prev, markets: false }));
        }
      } else {
        setMarkets([]);
      }
    };
    fetchMarkets();
  }, [formData.roleId, formData.countyId]);

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
      marketId: "",
      countyId: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        msisdn: formData.msisdn,
        username: formData.msisdn,
        gender: formData.gender.toUpperCase(),
        roleId: parseInt(formData.roleId, 10),
        fsc: formData.roleId === "4",
        marketId: formData.roleId === "4" ? parseInt(formData.marketId, 10) : 0,
      };
      const response = await axios.post(
        `${BASE_REST_API_URL}/user/create`,
        payload
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("User created successfully");
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      if (error.response) {
        const parameterViolations = error.response.data.parameterViolations;
        const errorMessage =
          parameterViolations && parameterViolations.length > 0
            ? parameterViolations[0].message
            : "An error occurred";

        toast.error(errorMessage);
      } else {
        toast.error("Request Failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl relative">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add User</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Last Name Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phoneNumber"
                      name="msisdn"
                      type="text"
                      placeholder="Enter Phone Number"
                      value={formData.msisdn}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Gender Dropdown */}
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
                      disabled={isSubmitting}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* County Dropdown */}
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
                      disabled={isSubmitting || loading.counties}
                    >
                      <option value="">Select a county</option>
                      {counties.map((county) => (
                        <option key={county.countyId} value={county.countyId}>
                          {county.countyName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Role Dropdown */}
                  <div className="space-y-2">
                    <label
                      htmlFor="roleId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Role
                    </label>
                    <select
                      id="roleId"
                      name="roleId"
                      value={formData.roleId}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      required
                      disabled={isSubmitting || loading.roles}
                    >
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role.roleId} value={role.roleId}>
                          {role.title}
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
                        disabled={isSubmitting || loading.markets}
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
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
                  >
                    {isSubmitting ? "Creating..." : "Add User"}
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

export default AddUserModal;
