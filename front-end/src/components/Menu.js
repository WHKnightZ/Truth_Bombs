import React from "react";

// import "../css/Menu.css";

const Menu = (props) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                top: 10,
                right: 10,
                textAlign: "center",
                fontSize: 16,
                color: "black",
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderRadius: 15,
                    backgroundColor: "#eee",
                    width: 120,
                    height: 30,
                    cursor: "pointer",
                    margin: 10,
                }}>
                Leaderboard
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderRadius: 25,
                    backgroundColor: "#eee",
                    width: 120,
                    height: 30,
                    cursor: "pointer",
                    margin: 10,
                }}>
                Logout
            </div>
        </div>
    );
};

export default Menu;
