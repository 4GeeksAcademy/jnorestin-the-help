import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faSignOutAlt, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import imgSrc from "../../img/HELPMEET-4.png";
import { LogIn } from "./logIn";
import { SignUp } from "./signUp";
import "../../../front/styles/index.css";

library.add(faBell, faUser, faSignOutAlt, faBars, faTimes);

export const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const menuRef = useRef(null);

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

  const handleMenuClick = () => {
    toggleMenu();
  };

  const handleMenuItemClick = () => {
    toggleMenu();
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!menuRef.current.contains(event.target)) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (

    <div>

      <nav className="navbar ">
        <img src={imgSrc} alt="" className={`logo-img home-logo-img me-0`} />
        <button class="btn burger-menu me-auto " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <FontAwesomeIcon
            icon={faBars}
            className={`burger-icon`}

          />
        </button>
        <div class="collapse navbar-collapse navCollapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-lg-0 ">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>
        </div>





        <div className="ml-auto login-out ">
          <button className="navbar-button" onClick={handleLoginClick}>
            Log In
          </button>ml
          <button className="navbar-button" onClick={handleSignupClick}>
            Sign Up
          </button>
        </div>
        {location.pathname === "/help" && (
          <div className="ml-auto login-out">
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
          <div className="form-container">
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
          <div className="form-container">
            <div className="signup-form">
              <h3 className="form-title">Sign Up</h3>
              <SignUp onClose={handleSignupFormClose} />
            </div>
          </div>
        </div>
      )}

      {logoutSuccess && <div className="logout-message alert alert-success">Logout successful. Redirecting...</div>}

    </div>
  );
};


