import React from 'react'
import "./universalpage.css"
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="admin-nav">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="admin-dash-text">
          <span>Admin Dashboard</span>
        </div>
      </div>
  )
}

export default Navbar
