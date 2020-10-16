import React from 'react';

const UserCard = props => {
    let backgroundColor = "#eee";
    let border = <div />
    let opacity = 1.0;
    if (props.active) {
        border = <div style={{ width: 100, boxSizing: "border-box", borderBottom: "4px solid #42a5f5", position: "absolute", bottom: 0 }}></div>
        backgroundColor = "#fff";
        opacity = props.opacity;
    }
    return (
        <div style={{ position: "relative", width: 100, height: 130, overflow: "hidden", backgroundColor: backgroundColor, textAlign: "center", borderRadius: 10, margin: 10, padding: 10, boxShadow: "-5px 5px 12px #777777", opacity: opacity }}>
            {border}
            <img style={{ borderRadius: "50%", width: 80, height: 80 }} src={`https://raw.githubusercontent.com/WHKnightZ/Truth_Bombs/main/back-end/images/${props.name}.png`} />
            <span style={{ color: "black", marginBottom: 5 }}>{props.name}</span>
        </div>
    );
};

export default UserCard;