import React, { useState } from "react";
import axios from "axios";
import Api from "../api/Api";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const sendOtp = async () => {
    try {
      const res = await axios.post(
        Api.send_otp,
        { email }
      );

     toast.success(
  res.data.message || "OTP sent successfully"
);
      setShowOtp(true);

    } catch (error) {

     alert(
  error.response?.data?.message ||
  "Failed to send OTP"
);

    }
  };

  const verifyOtp = async () => {
    try {

      const res = await axios.post(
        Api.verify_otp,
        {
          email,
          otp,
        }
      );
 localStorage.setItem(
  "id",
  res.data.user._id
);
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      toast.success("Login Successful");
setTimeout(() => {
  if (res.data.role === "driver") {
    window.location.href = "/driver-dashboard";
  } else if (res.data.role === "supervisor") {
    window.location.href = "/supervisor-dashboard";
  } else if (res.data.role === "admin") {
    window.location.href = "/admin";
  }
}, 1500);

    } catch (error) {
toast.error(
  error.response?.data?.message ||
  "OTP Verification Failed"
);

    }
  };

return (
  <div className="min-h-screen bg-[#4CBB17]/20">
    
    {/* Header */}
    <div className="bg-[#4CBB17]/40 px-8 py-4 shadow-md">
      <h1 className="flex items-center gap-3 text-4xl font-extrabold text-green-900">
        <img
          src="/garbageVehicle.jpeg"
          alt="CleanTrack Logo"
          className="w-14 h-14 object-contain"
        />
        CleanTrack
      </h1>

      <p className="text-gray-800 mt-1">
        Smart Waste Management Control Center
      </p>
    </div>

    {/* Login Form */}
    <div className="flex items-center justify-center py-16 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-green-800">
          Login
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Sign in to continue
        </p>

        {!showOtp ? (
          <>
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              onClick={sendOtp}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-5">
              <p className="text-center text-green-700 text-sm">
                OTP sent to
              </p>

              <p className="text-center font-semibold text-gray-800">
                {email}
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Enter OTP
              </label>

              <input
                type="text"
                maxLength="6"
                placeholder="Enter 6 Digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Verify OTP & Login
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);
}

export default Login;