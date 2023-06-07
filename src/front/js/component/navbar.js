import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../front/styles/index.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Login</span>
        </Link>
        <Link to="/demo">
          <button className="btn btn-primary">Sign up</button>
        </Link>
      </div>
    </nav>
  );
};
