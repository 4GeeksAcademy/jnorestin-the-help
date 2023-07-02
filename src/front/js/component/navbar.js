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

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div>
      <nav className="navbar">
        {isHomePage && (
          <img src={imgSrc} alt="" className={`logo-img home-logo-img me-0`} />
        )}
        {!isHomePage && (
          <button
            className="btn burger-menu me-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} className={`burger-icon`} />
          </button>
        )}
        {!isHomePage ? (
          <div className="collapse navbar-collapse navCollapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0">

              <li className="nav-item">
                <Link to="/">
                  <a className="nav-link" aria-current="page" href="#">
                    Home
                  </a>
                </Link>
                <li className="nav-item">
                  <Link to="/help">
                    <a className="nav-link" aria-current="page" href="#">
                      Help
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/post">
                    <a className="nav-link" aria-current="page" href="#">
                      Your Posts
                    </a>
                  </Link>
                </li>
              </li>
              {/* <li className="nav-item">
                <Link to="/helperpost">
                  <a className="nav-link" aria-current="page" href="#">
                    Helperpost
                  </a>
                </Link>
              </li> */}
            </ul>
          </div>
        ) : null}

        {!isHomePage ? null : (
          <div className="ml-auto login-out">
            <button className="navbar-button" onClick={handleLoginClick}>
              Log In
            </button>
            <button className="navbar-button" onClick={handleSignupClick}>
              Sign Up
            </button>
          </div>
        )}

        {!isHomePage && (
          <div className="ml-auto login-out">
            <FontAwesomeIcon icon={faBell} className="navbar-icon" />
            <span className="button-spacing" />
            <Link to="/updated-profile">
              <FontAwesomeIcon icon={faUser} className="navbar-icon" />
            </Link>
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




