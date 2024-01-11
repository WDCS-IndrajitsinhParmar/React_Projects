import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../Store/ProductContext";

function Navbar() {

  const items = useData();
  let count = items.reduce((total, obj) => {
    return total + obj.quantity;
  }, 0);

  return (
    <div
      style={{
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span className="logo">Product STORE</span>
      <div>
        <Link className="navLink" to="/">
          Home
        </Link>
        <Link className="navLink" to="/cart">
          Cart
        </Link>
        <span className="cartCount">Cart items:{count}</span>
      </div>
    </div>
  );
}

export default Navbar;
