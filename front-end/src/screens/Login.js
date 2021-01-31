import React from "react";

import Logo from "../components/Logo";

import "../css/Login.css";

const Login = (props) => {
    return (
        <div className={"container"}>
            <Logo />
            <div className="text-login">LOGIN</div>
            <div className="input-container">
                <input
                    id="name"
                    className="input"
                    required
                    onChange={(e) => props.onChange(e.target.value)}
                    onKeyDown={props.onKeyDown}
                />
                <label className="label" htmlFor="name">
                    Your Name
                </label>
            </div>
        </div>
    );
};

export default Login;
