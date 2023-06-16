import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";

library.add(faBell, faUser, faSignOutAlt);

import "../../../front/styles/index.css";
import { LogIn } from "./logIn";
import { SignUp } from "./signUp";

export const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setLoginSuccess(false);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
  };

  const handleLogoutClick = () => {
    actions.logout(); // Perform the logout action, e.g., clear user session, remove user information, etc.
    setLogoutSuccess(true); // Set the logout success state to true
    setTimeout(() => {
      setLogoutSuccess(false); // Reset the logout success state after 1 second
      navigate("/"); // Redirect to the home page after resetting the state
    }, 1000);
  };

  const handleLoginFormClose = () => {
    setShowLoginForm(false);
    setLoginSuccess(false);
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
            <div>
            <div className="navbar-button">
              <button className="navbar-button" onClick={handleLoginClick}>
                Log In
              </button>
            </div>

              <div className="navbar-button">

              <button className="navbar-button" onClick={handleSignupClick}>
                Sign Up
              </button>
            </div>
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
              {loginSuccess ? ( // Display success message if login was successful
                <p>Login successful. Closing form...</p>
              ) : (
                <React.Fragment>
                  <h3 className="form-title">Log In</h3>
                  <LogIn onClose={handleLoginFormClose} onSuccess={() => setLoginSuccess(true)} />
                </React.Fragment>
              )}
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
      {logoutSuccess && ( // Render the logout success message
        <div className="logout-message alert alert-success">
          Logout successful. Redirecting...
        </div>
      )}
    </React.Fragment>
  );
};


