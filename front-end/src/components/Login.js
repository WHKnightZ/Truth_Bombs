import React, { useState } from "react";

import Logo from "./Logo";

import "../css/Login.css";

const Login = (props) => {
    const [s, ss] = useState(" box");

    return (
        <div className={"container" + s}>
            <Logo />
            <div className="text-login">LOGIN</div>
            <div className="input-container">
                <input
                    id="name"
                    className="input"
                    required
                    onChange={(e) => props.onChange(e.target.value)}
                    onKeyDown={() => ss(" box1")}
                />
                <label className="label" htmlFor="name">
                    Your Name
                </label>
            </div>
        </div>
    );
};

export default Login;
