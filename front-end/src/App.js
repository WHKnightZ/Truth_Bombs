import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./css/Button.css";

import CoverCard from "./components/CoverCard";
import Login from './components/Login';
import UserCard from "./components/UserCard";

const io = require("socket.io-client");

function App() {
    const [socket, setSocket] = useState(null);

    const [isLogin, setIsLogin] = useState(false);
    const [isWaiting, setIsWaiting] = useState(true);
    const [name, setName] = useState(null);

    const [coverCard, setCoverCard] = useState();
    const [flashCard, setFlashCard] = useState([]);

    useEffect(() => {
        setSocket(io("http://127.0.0.1:5012"));

    }, []);

    // useEffect(() => {
    //     console.log(coverCard, flashCard);
    // }, [flashCard, coverCard]);

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
            setFlashCard(prev => [...prev, data["question"]]);
        });
    }, [socket]);

    const login = (name) => {
        socket.emit("login", { "name": name });
    };

    const play = () => {
        socket.emit("play", {});
    };

    const handleChangeName = (e) => {
        setName(e);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter')
            login(name);
    };

    let names = ["tien", "quy", "khanh", "chan", "hung", "tri", "minh", "dung", "thinh", "sy", "quyet", "huong", "trang", "hang", "linh", "mai"];

    let visibles = [];
    let questions = [];
    for (let i = 0; i < coverCard; i++)
        visibles.push("visible");
    for (let i = coverCard; i < 7; i++)
        visibles.push("hidden");
    questions = [...flashCard];
    for (let i = flashCard.length; i < 7; i++)
        questions.push(null);
    let Render = null;
    if (!isLogin) {
        Render =
            <Login onChange={handleChangeName} onKeyDown={handleKeyDown} />
    } else if (isWaiting) {
        Render =
            <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", maxWidth: "1200px" }}>
                    {names.map((name, i) => <UserCard name={name} active={i == 0 ? true : false} />)}
                </div>
                <div>
                    <btn className="material-btn" onClick={() => play()}>Play</btn>
                </div>
            </div>
    } else {
        Render =
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", maxWidth: "1200px" }}>
                <CoverCard visible={visibles[0]} color="blue" question={questions[0]} />
                <CoverCard visible={visibles[1]} color="pink" question={questions[1]} />
                <CoverCard visible={visibles[2]} color="yellow" question={questions[2]} />
                <CoverCard visible={visibles[3]} color="green" question={questions[3]} />
                <CoverCard visible={visibles[4]} color="purple" question={questions[4]} />
                <CoverCard visible={visibles[5]} color="gray" question={questions[5]} />
                <CoverCard visible={visibles[6]} color="black" question={questions[6]} />
            </div>
    }

    return (
        <div>
            <header className="App-header">
                {Render}
                {/* <img src={logo} className="App-logo" alt="logo" />
                <p>Edit <code>src/App.js</code> and save to reload.</p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >Learn React</a> */}
            </header>
        </div>
    );
}

export default App;
