import React from "react";

import { colors } from "../data";
import imgSplash from "../images/splash.png";

const TargetCard = (props) => {
    let name = props.target;
    let imgRender;
    if (name !== null) {
        imgRender = (
            <img
                style={{
                    borderRadius: "50%",
                    width: 120,
                    height: 120,
                    marginTop: 12,
                }}
                src={`https://raw.githubusercontent.com/WHKnightZ/Truth_Bombs/main/back-end/images/${name}.png`}
                alt="user"
            />
        );
    } else {
        imgRender = (
            <div
                style={{
                    width: 120,
                    height: 120,
                    margin: "12px auto",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor:
                        props.text === "Target" ? colors.blue : colors.green,
                    opacity: 0.6,
                }}>
                <img
                    style={{ width: 120, height: 120, opacity: 0.4 }}
                    src={imgSplash}
                    alt="user"
                />
            </div>
        );
    }

    return (
        <div
            style={{
                position: "relative",
                width: 140,
                height: 190,
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
                textAlign: "center",
                borderRadius: 10,
                margin: 10,
                padding: 10,
                boxShadow: "-5px 5px 12px #777777",
            }}>
            <div style={{ marginTop: -5 }}>{props.text}</div>
            {imgRender}
            <span
                style={{
                    color: "black",
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    right: 0,
                }}>
                {name}
            </span>
        </div>
    );
};

export default TargetCard;
