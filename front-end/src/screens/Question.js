import React from "react";

import { listColors } from "../data";

import CoverCard from "../components/CoverCard";

const Question = (props) => {
    let visibles = [];
    for (let i = 0; i < props.coverCard; i++) visibles.push("visible");
    for (let i = props.coverCard; i < 7; i++) visibles.push("hidden");

    return (
        <div>
            <div style={{ margin: "20px 0 10px 0", textAlign: "center" }}>
                {props.questioner} is choosing the question
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    maxWidth: "1200px",
                }}>
                {listColors.map((color, i) => (
                    <CoverCard
                        key={i}
                        i={i}
                        visible={visibles[i]}
                        color={color}
                        question={props.flashCard[i]}
                        onClick={props.chooseQuestion}
                    />
                ))}
            </div>
        </div>
    );
};

export default Question;
