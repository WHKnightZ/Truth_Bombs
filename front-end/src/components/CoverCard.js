import React, { useState } from "react";

import { colors } from "../data";

import imgSplash from "../images/splash.png";

import FlashCard from "./FlashCard";

import "../css/CoverCard.css";

const CoverCard = (props) => {
    const [deg, setDeg] = useState(Math.floor(Math.random() * 7 - 3));

    const cardStyle = {
        position: "relative",
        width: "210px",
        height: "320px",
        borderRadius: "20px",
        backgroundColor: colors[props.color],
        overflow: "hidden",
        transform: "rotate(" + deg + "deg)",
        boxShadow: "-2px 2px 6px #9E9E9E5F",
        margin: "15px 30px 15px 30px",
        visibility: props.visible,
        border: "2px solid #6f6f6f",
        cursor: "pointer",
    };

    return (
        <div style={cardStyle} onClick={() => props.onClick(props.i)}>
            <img
                className="splashStyle1"
                src={imgSplash}
                width="336"
                height="336"
                alt="splash1"
            />
            <img
                className="splashStyle2"
                src={imgSplash}
                width="240"
                height="240"
                alt="splash2"
            />
            <div className="borderStyle"></div>
            {props.question !== "" && <FlashCard question={props.question} />}
        </div>
    );
};

export default CoverCard;
