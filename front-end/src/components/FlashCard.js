import React, { useState } from "react";

import imgLine1 from "../images/line1.png";
import imgLine2 from "../images/line2.png";

import '../css/FlashCard.css';

const FlashCard = (props) => {
    const [deg, setDeg] = useState(Math.floor(Math.random() * 5 - 2));
    const [imgLine, setImgLine] = useState(
        Math.random() > 0.5 ? imgLine1 : imgLine2
    );

    const flashStyle = {
        width: "178px",
        height: "288px",
        backgroundColor: "#eee",
        position: "absolute",
        left: "16px",
        top: "16px",
        borderRadius: "10px",
        transform: "rotate(" + deg + "deg)",
    };

    return (
        <div style={flashStyle}>
            <div className="question1">{props.question}</div>
            <img className="img" src={imgLine} height={42} alt="line" />
            <div className="question2">{props.question}</div>
        </div>
    );
};

export default FlashCard;
