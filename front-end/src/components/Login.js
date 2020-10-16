import React from 'react';

import '../css/Login.css';

import Logo from './Logo';

const Login = props => {
    return (
        <div style={{ width: 600, height: 250, position: "relative", overflow: "visible", textAlign: "center", backgroundColor: "white", borderRadius: 10, boxShadow: "-4px 6px 12px #7E7E7E9F", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily: "Quicksand-SemiBold" }}>
            <Logo />
            <div style={{ color: "black", marginLeft: -200, marginTop: 100, marginBottom: 30 }}>LOGIN</div>
            <div style={{ fontFamily: "Quicksand-SemiBold" }} class="input-container">
                <input id="name" class="input" required onChange={e => props.onChange(e.target.value)} onKeyDown={props.onKeyDown} />
                <label class="label" for="name">Your Name</label>
            </div>
        </div>
    );
};

export default Login;