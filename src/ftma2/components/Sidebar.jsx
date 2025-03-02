import React, { useState } from "react";
import { BsDiagram3Fill } from "react-icons/bs";
import { FaUser, FaUsers, FaUserCircle } from "react-icons/fa";
import {
  MdAutoGraph,
  MdLogout,
  MdSettings,
  MdShoppingCart,
  MdWindow,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isValueChainsDropdownOpen, setValueChainsDropdownOpen] =
    useState(false);

  const toggleValueChainsDropdown = () => {
    setValueChainsDropdownOpen(!isValueChainsDropdownOpen);
  };

  const menuItems = [
    { icon: <MdWindow size={16} />, label: "Overview", path: "/overview" },
    {
      icon: <SiGoogleanalytics size={16} />,
      label: "Analytics",
      path: "/analytics",
    },
    { icon: <FaUser size={16} />, label: "Fscs", path: "/fscs" },
    {
      icon: <BsDiagram3Fill size={16} />,
      label: "Value Chains",
      hasDropdown: true,
      dropdownItems: [
        {
          icon: <BsDiagram3Fill size={16} />,
          label: "Value Chains",
          path: "/products",
        },
        {
          icon: <FaUsers size={16} />,
          label: "County Products",
          path: "/products/county-products",
        },
        {
          icon: <MdAutoGraph size={16} />,
          label: "Market Prices",
          path: "/points",
        },
        { icon: <FaUser size={16} />, label: "Prices per Kg", path: "/points" },
        {
          icon: <MdAutoGraph size={16} />,
          label: "Average Prices",
          path: "/points",
        },
        {
          icon: <FaUserCircle size={16} />,
          label: "Price Ranges",
          path: "/points",
        },
      ],
    },
    { icon: <MdShoppingCart size={16} />, label: "Markets", path: "/markets" },
    { icon: <FaUsers size={16} />, label: "Users", path: "/users" },
    {
      icon: <MdAutoGraph size={16} />,
      label: "Market Points",
      path: "/points",
    },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-48 rounded-tl-lg rounded-bl-lg flex flex-col justify-between bg-customBrown shadow-lg">
      <div className="mt-4 ml-3">
        <p className="text-center font-bold text-xl text-customGreen">MIS</p>
        <hr className="border-t border-gray-500 my-3" />
      </div>
      <div className="flex-grow mx-3 flex flex-col">
        <ul className="pt-2 space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <div
                className={`flex items-center justify-between gap-x-4 cursor-pointer p-2 rounded-md transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-customGreen text-white"
                    : "hover:bg-customGreen hover:text-white text-gray-200"
                }`}
                onClick={() =>
                  item.hasDropdown
                    ? toggleValueChainsDropdown()
                    : navigate(item.path)
                }
              >
                <div className="flex items-center gap-x-4 text-sm">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.hasDropdown && (
                  <span>
                    {isValueChainsDropdownOpen ? (
                      <MdExpandLess size={16} />
                    ) : (
                      <MdExpandMore size={16} />
                    )}
                  </span>
                )}
              </div>
              {item.label === "Value Chains" && isValueChainsDropdownOpen && (
                <ul className="ml-6 mt-1 space-y-1 text-sm text-gray-200 transition-all duration-300">
                  {item.dropdownItems.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-md transition-all duration-300 ${
                        location.pathname === subItem.path
                          ? "bg-customGreen text-white"
                          : "hover:bg-customGreen hover:text-white"
                      }`}
                      onClick={() => navigate(subItem.path)}
                    >
                      <span>{subItem.icon}</span>
                      <span>{subItem.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-sm text-gray-200 p-3">
        <hr className="border-t border-gray-500 my-2" />
        <ul className="pt-2 space-y-1">
          <li
            onClick={() => navigate("/settings")}
            className={`flex items-center gap-x-4 cursor-pointer p-2 rounded-md transition-all duration-300 ${
              location.pathname === "/settings"
                ? "bg-customGreen text-white"
                : "hover:bg-customGreen hover:text-white"
            }`}
          >
            <MdSettings size={16} />
            <span>Settings</span>
          </li>
          <li
            onClick={() => navigate("/")}
            className="flex items-center gap-x-4 cursor-pointer p-2 rounded-md hover:bg-customGreen hover:text-white transition-all duration-300"
          >
            <MdLogout size={16} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-x-2 p-3 text-white rounded-bl-lg">
        <FaUserCircle size={22} />
        <span className="text-sm">admin@gmail.com</span>
      </div>
    </div>
  );
};

export default Sidebar;
