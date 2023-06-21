import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import imgSrc from "../../img/HELPMEET-4.png";
import { LogIn } from "./logIn";
import { SignUp } from "./signUp";
import "../../../front/styles/index.css";

library.add(faBell, faUser, faSignOutAlt);

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
    actions.logout();
    setLogoutSuccess(true);
    setTimeout(() => {
      setLogoutSuccess(false);
      navigate("/");
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
  const isHomePage = location.pathname === "/";

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
      <nav className="navbar">
        
          <div className="nav-link">
            {!isHomePage && (
              <Link to="/help">
                <span className="navbar-brand">Help</span>
              </Link>
            )}
              {!isHomePage && (
              <Link to="/post">
                <span className="navbar-brand">Your Posts</span>
              </Link>
            )}
          </div>
          <img src={imgSrc} alt="" className="logo-img" />
          {isHomePage && (
            <div className="ml-auto">
              <button className="navbar-button" onClick={handleLoginClick}>
                Log In
              </button>
              <button className="navbar-button" onClick={handleSignupClick}>
                Sign Up
              </button>
            </div>
          )}
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
        
      </nav>
      {showLoginForm && (
        <div className="form-overlay">
          <div className="form-container" ref={loginFormRef}>
            <div className="login-form">
              {loginSuccess ? (
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
            <div className="signup-form">
              <h3 className="form-title">Sign Up</h3>
              <SignUp onClose={handleSignupFormClose} />
            </div>
          </div>
        </div>
      )}
      {logoutSuccess && <div className="logout-message alert alert-success">Logout successful. Redirecting...</div>}
    </React.Fragment>
  );
};




