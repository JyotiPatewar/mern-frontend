import React, { useState } from "react";
import axios from "axios";
import Api from "../api/Api";
import { toast } from "react-toastify";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const mobile = location.state?.mobile;
const email = location.state?.email;
  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        Api.verify_otp,
        {
          email,
          otp,
        }
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
      if (res.data.role === "admin") {
        navigate("/admin");
      } else if (
        res.data.role === "driver"
      ) {
        navigate("/driver");
      } else if (res.data.role === "supervisor") {
        navigate("/supervisor");
      }
      else {
        navigate("/caretaker");
      }
    }
     catch (err) {
    toast.error(
  error.response?.data?.message ||
  "OTP Verification Failed"
);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-red-600 font-semibold text-lg">
            Invalid Access
          </h2>
          <p className="text-gray-500 mt-2">
            Please login again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#4CBB17]/20 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        {/* Vehicle Image */}
        <h1 className="flex items-center gap-3 text-5xl font-extrabold text-green-900">
  <img
    src="garbageVehicle.jpeg"
    alt="CleanTrack Logo"
    className="w-16 h-16 object-contain"
  />

  CleanTrack
</h1>

        <p className="text-center text-gray-500 mt-2">
          OTP Verification
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4 mb-6">
          <p className="text-center text-green-700 text-sm">
            OTP sent to
          </p>

          <p className="text-center font-semibold text-gray-800">
            {email}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleVerify}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Enter OTP
            </label>

            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
              placeholder="Enter 6 Digit OTP"
              className="w-full border rounded-lg px-4 py-2 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;