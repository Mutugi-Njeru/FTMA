import React, { useEffect } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./ftma2/components/Dashboard";
import Overview from "./ftma2/pages/Overview";
import Settings from "./ftma2/pages/Settings";
import Analytics from "./ftma2/pages/Analytics";
import Login from "./ftma2/pages/Login";
import { ToastContainer } from "react-toastify";
import Fscs from "./ftma2/pages/fscs/Fscs";
import ValueChains from "./ftma2/pages/valueChains/ValueChains";
import MarketPrices from "./ftma2/pages/marketPrices/MarketPrices";
import PricePerKg from "./ftma2/pages/pricePerKg/PricePerKg";
import AveragePrices from "./ftma2/pages/averagePrices/AveragePrices";
import PriceRanges from "./ftma2/pages/priceRanges/PriceRanges";
import MarketPoints from "./ftma2/pages/marketPoints/MarketPoints";
import Markets from "./ftma2/pages/markets/Markets";
import Users from "./ftma2/pages/users/Users";
import CountyValueChains from "./ftma2/pages/countyValueChains/CountyValueChains";
import { isUserLoggedIn, logout } from "./ftma2/service/AuthService";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        logout();
        window.location.href = "/";
      }
    }
  }, []);

  function AuthenticatedRoute({ children }) {
    const { isAuth } = isUserLoggedIn();

    if (isAuth) {
      return children;
    }
    return <Navigate to="/" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Dashboard />}>
          <Route
            path="/overview"
            element={
              <AuthenticatedRoute>
                {" "}
                <Overview />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <AuthenticatedRoute>
                <Analytics />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/fscs"
            element={
              <AuthenticatedRoute>
                <Fscs />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/markets"
            element={
              <AuthenticatedRoute>
                <Markets />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <AuthenticatedRoute>
                <Users />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/points"
            element={
              <AuthenticatedRoute>
                <MarketPoints />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <AuthenticatedRoute>
                <ValueChains />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/products/market-prices"
            element={
              <AuthenticatedRoute>
                <MarketPrices />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/products/price-per-kg"
            element={
              <AuthenticatedRoute>
                <PricePerKg />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/products/average-prices"
            element={
              <AuthenticatedRoute>
                <AveragePrices />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/products/price-ranges"
            element={
              <AuthenticatedRoute>
                <PriceRanges />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/products/county-products"
            element={
              <AuthenticatedRoute>
                <CountyValueChains />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <AuthenticatedRoute>
                <Settings />
              </AuthenticatedRoute>
            }
          />
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
