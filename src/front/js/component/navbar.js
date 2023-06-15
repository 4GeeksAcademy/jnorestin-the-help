import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../front/styles/index.css";
import { LogIn } from "./logIn";
import { SignUp } from "./signUp";

export const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
  };

  const handleLoginFormClose = () => {
    setShowLoginForm(false);
  };

  const handleSignupFormClose = () => {
    setShowSignupForm(false);
  };

  const loginFormRef = useRef(null);
  const signupFormRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        (loginFormRef.current && !loginFormRef.current.contains(event.target)) ||
        (signupFormRef.current && !signupFormRef.current.contains(event.target))
      ) {
        handleLoginFormClose();
        handleSignupFormClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <React.Fragment>
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="nav-link">
          <Link to="/">
            <span className="navbar-brand mb-0 h1">Home</span>
          </Link>
          <Link to="/help">
            <span className="navbar-brand mb-0 h1">Help</span>
          </Link>
          <Link to="/post">
            <span className="navbar-brand mb-0 h1"> Your Post</span>
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

      
    </nav>
    {showLoginForm && (
      <div className="form-overlay">
        <div className="form-container" ref={loginFormRef}>
          <button className="close-button" onClick={handleLoginFormClose}>
            Close
          </button>
          <div className="login-form">
            <h3 className="form-title">Log In</h3>
            <LogIn />
          </div>
        </div>
      </div>
    )}
    {showSignupForm && (
      <div className="form-overlay">
        <div className="form-container" ref={signupFormRef}>
          <button className="close-button" onClick={handleSignupFormClose}>
            Close
          </button>
          <div className="signup-form">
            <h3 className="form-title">Sign Up</h3>
            <SignUp onClose={handleSignupFormClose} />
          </div>
        </div>
      </div>
    )}
    </React.Fragment>
  );
};








