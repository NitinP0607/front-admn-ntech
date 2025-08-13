import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../configue.js";
import "./universalpage.css";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    const email = localStorage.getItem("email"); // Grab email from localStorage

    if (!email) {
      setMessage("Email not found. Please register again.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        // Optionally redirect to login or dashboard
        setTimeout(() => {
          navigate("/login"); // or navigate("/admin/dashboard")
        }, 2000);
      }
    } catch (error) {
      setMessage("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Verify Your Email</h2>
      <p>Please check your inbox. Enter the OTP sent to your email.</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button onClick={handleVerify}>Verify</button>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
