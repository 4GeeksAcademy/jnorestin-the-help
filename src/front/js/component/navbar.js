import React, { useState, useRef, useEffect, useContext } from "react"; 
import { Link, useLocation } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";

// Add this line to import the necessary icons into the library
library.add(faBell, faUser, faSignOutAlt);

import "../../../front/styles/index.css";
import { LogIn } from "./logIn";
import { SignUp } from "./signUp";

export const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const { actions } = useContext(Context); // Assuming you have a Context for handling the app state

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
  };

  const handleLogoutClick = () => {
    // Perform the logout action here
    // e.g., clear user session, redirect to login page, etc.
    actions.logout(); // Assuming you have a logout action defined in your app's state management
  };

  const handleLoginFormClose = () => {
    setShowLoginForm(false);
  };

  const handleSignupFormClose = () => {
    setShowSignupForm(false);
  };

  const loginFormRef = useRef(null);
  const signupFormRef = useRef(null);

  const location = useLocation();

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
          {location.pathname === "/help" && (
            <div className="ml-auto">
              <FontAwesomeIcon icon={faBell} className="navbar-icon" />
              <span className="button-spacing" />
              <FontAwesomeIcon icon={faUser} className="navbar-icon" />
              <span className="button-spacing" />
              <button className="logout-button" onClick={handleLogoutClick}>
                Log Out
              </button>
            </div>
          )}
          {location.pathname === "/" && (
            <div className="ml-auto">
              <button className="btn btn-primary" onClick={handleLoginClick}>
                Log In
              </button>
              <span className="button-spacing" />
              <button className="btn btn-primary" onClick={handleSignupClick}>
                Sign Up
              </button>
            </div>
          )}

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
