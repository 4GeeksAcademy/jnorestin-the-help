import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions } = useContext(Context);

  const handleLogin = (event) => {
    event.preventDefault();
    actions.logIn(email, password);
  };

  return (
    <form className="signup-form-wrapper" onSubmit={handleLogin}>
      <div className="form-group">
        <label>Email</label>
        <input
          className="login-form-input" // Updated class name for login form input
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
    </form>
  );
};



