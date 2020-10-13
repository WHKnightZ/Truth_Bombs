import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import CoverCard from "./components/CoverCard";

const io = require("socket.io-client");

function App() {
    const [socket, setSocket] = useState(null);

    const [isLogin, setIsLogin] = useState(false);
    const [isWaiting, setIsWaiting] = useState(true);
    const [name, setName] = useState(null);
    const [gender, setGender] = useState(null);

    const [coverCard, setCoverCard] = useState();
    const [flashCard, setFlashCard] = useState([]);

    useEffect(() => {
        setSocket(io("http://localhost:5012"));
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => {
            console.log("connected");
        });
        socket.on("disconnect", () => {
            console.log("disconnected");
        });
        socket.on("error", data => {
            alert(data["msg"]);
        });
        socket.on("login", data => {
            setGender(data["gender"]);
            setIsLogin(true);
            setIsWaiting(true);
        });
        socket.on("play", data => {
            setIsWaiting(false);
        });
        socket.on("add_cover_card", data => {
            setCoverCard(data["num"]);
        });
        socket.on("add_flash_card", data => {
            const a = [...flashCard, 'xxxxx']
            setFlashCard(a);
            // console.log(data["question"]);
        });
    }, [socket]);

    useEffect(() => {
        console.log(flashCard)
    }, [flashCard]);
    const login = (name) => {
        socket.emit("login", { "name": name });
    };

    const play = () => {
        socket.emit("play", {});
    };

    let Render = null;
    if (!isLogin) {
        Render =
            <div>
                <input placeholder="Input your name..." onChange={e => setName(e.target.value)} />
                <button onClick={() => login(name)}>Login</button>
            </div>
    } else if (isWaiting) {
        Render =
            <div>
                <button onClick={() => play()}>Play</button>
            </div>
    } else {
        Render =
            <div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <CoverCard visible={coverCard > 0 ? "visible" : "hidden"} color="blue" question={flashCard.length > 0 ? flashCard[0] : null} />
                    <CoverCard visible={coverCard > 1 ? "visible" : "hidden"} color="pink" question={flashCard.length > 1 ? flashCard[1] : null} />
                    <CoverCard visible={coverCard > 2 ? "visible" : "hidden"} color="yellow" question={flashCard.length > 2 ? flashCard[2] : null} />
                    <CoverCard visible={coverCard > 3 ? "visible" : "hidden"} color="green" question={flashCard.length > 3 ? flashCard[3] : null} />
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <CoverCard visible={coverCard > 4 ? "visible" : "hidden"} color="purple" question={flashCard.length > 4 ? flashCard[4] : null} />
                    <CoverCard visible={coverCard > 5 ? "visible" : "hidden"} color="gray" question={flashCard.length > 5 ? flashCard[5] : null} />
                    <CoverCard visible={coverCard > 6 ? "visible" : "hidden"} color="black" question={flashCard.length > 6 ? flashCard[6] : "saDsad"} />
                </div>
            </div>
    }

    return (
        <div>
            <header className="App-header">
                {Render}
                <img src={logo} className="App-logo" alt="logo" />
                <p>Edit <code>src/App.js</code> and save to reload.</p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >Learn React</a>
            </header>
        </div>
    );
}

export default App;
