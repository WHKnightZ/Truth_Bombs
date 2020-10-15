import React from 'react';

const UserCard = props => {
    let backgroundColor = "#eee";
    if (props.active)
        backgroundColor = "#fff";
    return (
        <div style={{ width: 100, height: 120, overflow: "hidden", backgroundColor: backgroundColor, textAlign: "center", borderRadius: 10, margin: 10, padding: 10, boxShadow: "-5px 5px 12px #777777" }}>
            <img style={{ borderRadius: "50%", width: 80, height: 80 }} src={`https://raw.githubusercontent.com/WHKnightZ/Truth_Bombs/main/back-end/images/${props.name}.png`} />
            <span style={{ color: "black" }}>{props.name}</span>
        </div>
    );
};

export default UserCard;