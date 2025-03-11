import {
  Link2,
  ShoppingCart,
  BarChart,
  DollarSign,
  Store,
  Package,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_REST_API_URL } from "../service/CountyProductsService";

const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-CA"); // Ensures YYYY-MM-DD format in local time
};

const TopCards = () => {
  const [markets, setMarkets] = useState(0);
  const [fsc, setFsc] = useState(0);
  const [valueChains, setValueChains] = useState(0);
  const [date, setDate] = useState(getTodayDate());

  // Fetch summary data
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          BASE_REST_API_URL + `/report/summaries?date=${date}`
        );
        setValueChains(response.data.data.summaries.products);
        setMarkets(response.data.data.summaries.markets);
        setFsc(response.data.data.summaries.activeFsc);
      } catch (err) {
        console.error("Error fetching summaries:", err);
      }
    };
    fetchSummary();
  }, []);

  const cardItems = [
    {
      icon: <Link2 size={20} color="white" />,
      label: "Value Chains",
      amount: valueChains,
    },
    {
      icon: <ShoppingCart size={20} color="white" />,
      label: "Markets",
      amount: markets,
    },
    {
      icon: <BarChart size={20} color="white" />,
      label: "Fscs",
      amount: fsc,
    },
    {
      icon: <DollarSign size={20} color="white" />,
      label: "Farm Prices",
      amount: 45,
    },
    {
      icon: <Store size={20} color="white" />,
      label: "Retail Prices",
      amount: 45,
    },
    {
      icon: <Package size={20} color="white" />,
      label: "Wholesale Prices",
      amount: 45,
    },
  ];

  return (
    <div className="flex flex-row mt-3 ml-2 h-24">
      {cardItems.map((item, index) => (
        <motion.div
          key={index}
          className="w-1/6 border rounded-lg mr-2 bg-white shadow-md flex flex-col justify-center p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="flex items-center">
            <div className="bg-customBaked p-2 rounded-full">{item.icon}</div>
            <p className="text-xs text-black ml-3 hover:text-black cursor-pointer">
              {item.label}
            </p>
          </div>
          <p className="text-sm text-center text-customGreen font-bold">
            {item.amount}
          </p>
        </motion.div>
      ))}
    </div>
    // <div className="flex flex-row mt-3 ml-2 h-24">
    //   {cardItems.map((item, index) => (
    //     <motion.div
    //       key={index}
    //       className="w-1/6 border rounded-lg mr-2 bg-snowDrift shadow-md flex flex-col justify-center p-4"
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.3, delay: index * 0.1 }}
    //       whileHover={{
    //         scale: 1.05,
    //         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    //       }}
    //     >
    //       <div className="flex items-center">
    //         <div className="bg-butterScotch p-2 rounded-full">{item.icon}</div>
    //         <p className="text-xs text-taupe ml-3 hover:text-taupe cursor-pointer">
    //           {item.label}
    //         </p>
    //       </div>
    //       <p className="text-sm text-center text-mediumElectricBlue font-bold">
    //         {item.amount}
    //       </p>
    //     </motion.div>
    //   ))}
    // </div>
  );
};

export default TopCards;
