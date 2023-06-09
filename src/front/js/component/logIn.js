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
    <form onSubmit={handleLogin}>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
};

