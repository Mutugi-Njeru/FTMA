import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-48">
        {/* Header */}
        <Header />

        {/* Scrollable Content */}
        <div className="mt-16 mb-3 bg-slate-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
