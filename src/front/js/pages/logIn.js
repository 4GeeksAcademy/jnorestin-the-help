import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const LogIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
    return (
        <div>
            <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email" />
            <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="password" />
            <button
                onClick={e => actions.logIn(email, password)}>
                Log in
            </button>
        </div>
    )
}