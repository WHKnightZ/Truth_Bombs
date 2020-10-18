import React from "react";

const UserCard = (props) => {
    let backgroundColor = "#e5e5e5";
    let border = <div />;
    if (props.active) {
        border = (
            <div
                style={{
                    width: 120,
                    boxSizing: "border-box",
                    borderBottom: "5px solid #42a5f5",
                    position: "absolute",
                    bottom: 0,
                }}></div>
        );
        if (props.cardState === 0) backgroundColor = "#fff";
        else if (props.cardState === 1) backgroundColor = "#e5e5e5";
    }
    return (
        <div
            style={{
                position: "relative",
                width: 120,
                height: 150,
                overflow: "hidden",
                backgroundColor: backgroundColor,
                textAlign: "center",
                borderRadius: 10,
                boxShadow: "-5px 5px 12px #777777"
            }}>
            {border}
            <img
                style={{ borderRadius: "50%", width: 80, height: 80, marginTop: 10 }}
                src={`https://raw.githubusercontent.com/WHKnightZ/Truth_Bombs/main/back-end/images/${props.name}.png`}
                alt="user"
            />
            <span style={{ color: "black", position: "absolute", bottom: -20, left: 0, right: 0 }}>
                {props.name}
            </span>
        </div>
    );
};

export default UserCard;
