import {
  Link2,
  ShoppingCart,
  BarChart,
  DollarSign,
  Store,
  Package,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const TopCards = () => {
  const cardItems = [
    {
      icon: <Link2 size={20} color="white" />,
      label: "Value Chains",
      amount: 45,
    },
    {
      icon: <ShoppingCart size={20} color="white" />,
      label: "Markets",
      amount: 45,
    },
    {
      icon: <BarChart size={20} color="white" />,
      label: "Fscs",
      amount: 45,
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
  );
};

export default TopCards;
