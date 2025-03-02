import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./ftma2/components/Dashboard";
import Overview from "./ftma2/pages/Overview";
import Markets from "./ftma2/pages/Markets";
import Users from "./ftma2/pages/Users";
import MarketPoints from "./ftma2/pages/MarketPoints";
import Settings from "./ftma2/pages/Settings";
import Analytics from "./ftma2/pages/Analytics";
import Login from "./ftma2/pages/Login";
import { ToastContainer } from "react-toastify";
import Fscs from "./ftma2/pages/fscs/Fscs";
import ValueChains from "./ftma2/pages/valueChains/ValueChains";
import CountyValueChains from "./ftma2/pages/valueChains/CountyValueChains";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Dashboard />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/fscs" element={<Fscs />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/users" element={<Users />} />
          <Route path="/points" element={<MarketPoints />} />
          <Route path="/products" element={<ValueChains />} />
          <Route
            path="/products/county-products"
            element={<CountyValueChains />}
          />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          backgroundColor: "white", // White background
          color: "#333", // Gray text
        }}
      />
    </BrowserRouter>
  );
}

export default App;
