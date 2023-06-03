import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../front/styles/index.css";

export const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="nav-link">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Home</span>
        </Link>
        <Link to="/help">
          <span className="navbar-brand mb-0 h1">Help</span>
        </Link>
        </div>

        <div className="ml-auto">
          <button className="btn btn-primary" onClick={handleLoginClick}>
            Log In
          </button>
          <span className="button-spacing" />
          <button className="btn btn-primary" onClick={handleSignupClick}>
            Sign Up
          </button>
        </div>
      </div>
      {showLoginForm && (
        // Render your login form component here
        <LoginForm onClose={() => setShowLoginForm(false)} />
      )}
      {showSignupForm && (
        // Render your signup form component here
        <SignupForm onClose={() => setShowSignupForm(false)} />
      )}
    </nav>
  );
};