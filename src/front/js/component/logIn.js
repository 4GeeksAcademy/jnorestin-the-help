import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../../front/styles/login&signup.css";
import { useNavigate } from "react-router-dom";

export const LogIn = ({ onClose }) => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginStatus("Logging in..."); // Display "Logging in..." message

    try {
      await actions.logIn(email, password);
      setLoginStatus("Login successful"); 
      setTimeout(() => {
        onClose(); 
        navigate("/help");
      }, 2000);
    } catch (error) {
      setLoginStatus("Login failed"); 
    }
  };

  return (
    <form className="signup-form-wrapper" onSubmit={handleLogin}>
      <div className="form-group">
        <label>Email</label>
        <input
          className="login-form-input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="signup-form-input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button className="btn-primary" type="submit">Log In</button>
      {loginStatus && <p>{loginStatus}</p>} 
    </form>
  );
};








