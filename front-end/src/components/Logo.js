import React from 'react';

const Logo = props => {
    const logoStyle = {
        display: 'flex',
        fontFamily: 'GoudarHL-Ultra',
        fontSize: '100px',
        position: 'absolute',
        top: "-80px",
        left: "50%",
        transform: "translate(-50%, 0)"
    };

    return (
        <div style={logoStyle}>
            <div style={{ backgroundColor: 'white', color: 'black',
            borderRadius: 10, padding: 10, boxShadow: "-10px 10px 10px #7E7E7E9F",
            transform: 'rotate(-4deg)' }}>
                TRUTH
            </div>
            <div style={{ backgroundColor: 'black', color: 'white',
            borderRadius: 10, padding: 10, boxShadow: "-10px 10px 10px #7E7E7E9F" }}>
                BOMBS
            </div>
        </div >
    );
};

export default Logo;