import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav">
      <p className="logo">Google Fomrs</p>
      <div className="flex">
        <Link to="/" className="navigation_link">Home</Link>
        <Link to ="/create-form" className="navigation_link">Create Forms</Link>
      </div>
    </div>
  );
}

export default Navbar;
