import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, storeToken } from "../service/AuthService";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      newErrors.username = "Email is required";
    } else if (!emailRegex.test(username)) {
      newErrors.username = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleLogin(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const auth = btoa(username + ":" + password);

    try {
      const response = await loginUser(auth);
      const token = "Bearer " + response.data.data.token;
      storeToken(token);
      toast.success("Login successful");
      navigate("/overview");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  }
  const clear = () => {
    localStorage.clear();
  };

  return (
    <div
      className="p-10 min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl bg-white bg-opacity-90">
        {/* Header */}
        <div className="mx-auto mb-2 space-y-3 text-center">
          <h1 className="text-3xl font-bold text-gray-700">FTMA</h1>
          <p className="text-gray-500">Login to access your account</p>
        </div>

        {/* Username Input */}
        <div className="relative mt-2 w-full">
          <input
            type="email"
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="peer block w-full appearance-none rounded-lg border border-gray-300 
            bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 
            focus:outline-none focus:ring-0"
            placeholder=" "
            aria-label="Enter your email"
          />
          <label
            htmlFor="email"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-transparent px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:bg-white"
          >
            Enter Your Email
          </label>
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative mt-2 w-full">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
            aria-label="Enter your password"
          />
          <label
            htmlFor="password"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform 
            cursor-text select-none bg-transparent px-2 text-sm text-gray-500 duration-300 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
            peer-focus:top-2 peer-focus:-translate-y-4 
            peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:bg-white"
          >
            Enter Your Password
          </label>
          <button
            type="button"
            className="absolute right-3 top-4 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          className="flex items-center justify-center gap-2 rounded-lg bg-customBrown py-3 px-6 font-bold text-white disabled:bg-customBrownLight"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* Sign-up and Forgot Password Links */}
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </div>
        <div className="text-center text-sm text-gray-600">
          Forgot password?{" "}
          <a href="/password" className="text-blue-600 hover:underline">
            Click here
          </a>
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-lg bg-customBrown py-3 px-6 font-bold text-white disabled:bg-customBrownLight"
          onClick={clear}
        >
          clear
        </button>
      </div>
    </div>
  );
};

export default Login;
