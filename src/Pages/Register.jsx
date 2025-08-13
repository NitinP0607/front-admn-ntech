// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../configue.js";
import "./Universalpage.css";   

const Register = () => {
  const [formData, setFormData] = useState({ email: "",name: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        localStorage.setItem("email", formData.name);
        navigate("/verify");
      }
    } catch (error) {
     setMessage("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
        <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
