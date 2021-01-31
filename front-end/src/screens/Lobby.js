import React from "react";

import FlipMove from "react-flip-move";

import TargetCard from "../components/TargetCard";
import UserCard from "../components/UserCard";

const Lobby = (props) => {
    return (
        <div style={{ textAlign: "center", marginTop: 10 }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    color: "black",
                }}>
                <TargetCard text="Target" target={props.target} />
                <TargetCard text="Questioner" target={props.questioner} />
            </div>
            <div
                style={{
                    display: "flex",
                    width: 300,
                    height: 40,
                    color: "black",
                    backgroundColor: "#eee",
                    borderRadius: 20,
                    margin: "10px auto",
                    flexDirection: "column",
                    justifyContent: "center",
                    cursor: "pointer",
                    visibility: props.choosingText !== "" ? "visible" : "hidden",
                    boxShadow: "-4px 6px 12px #7e7e7e",
                }}
                onClick={() => props.play()}>
                {props.choosingText}
            </div>
            <FlipMove
                className="items"
                duration={350}
                staggerDurationBy={20}
                staggerDelayBy={20}>
                <FlipMove>
                    {props.onlineUsers
                        .filter(
                            (user) =>
                                user.name !== props.target && user.name !== props.questioner
                        )
                        .map((user) => (
                            <div className="item" key={user.name}>
                                <UserCard
                                    name={user.name}
                                    active={user.name === props.player}
                                    cardFlick={props.cardFlick}
                                />
                            </div>
                        ))}
                </FlipMove>
            </FlipMove>
        </div>
    );
};

export default Lobby;
