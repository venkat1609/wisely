import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* <Link to="/">Project Nova</Link> */}
        Wisely
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <button className="navbar-button">
            <Link to="/login">Login</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
