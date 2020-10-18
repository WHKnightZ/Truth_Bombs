import React, { useState } from "react";
import FlipMove from "react-flip-move";
import "./App.css";

import UserCard from "./components/UserCard";

function App() {
    const [value, setValue] = useState("Tien");
    const [state, setState] = useState([]);

    let users = [
        { name: "Tien", gender: 1 },
        { name: "Quy", gender: 1 },
        { name: "Khanh", gender: 1 },
        { name: "Chan", gender: 1 },
        { name: "Hung", gender: 1 },
        { name: "Tri", gender: 1 },
        { name: "Minh", gender: 1 },
        { name: "Dung", gender: 1 },
        { name: "Thinh", gender: 1 },
        { name: "Sy", gender: 1 },
        { name: "Quyet", gender: 0 },
        { name: "Huong", gender: 0 },
        { name: "Trang", gender: 0 },
        { name: "Hang", gender: 0 },
        { name: "Linh", gender: 1 },
        { name: "Mai", gender: 0 },
    ];

    const delItem = (name) => {
        setState((state) => state.filter((s) => s !== name));
    };

    const insItem = () => {
        let name = null;
        users.forEach((user) => {
            if (state.indexOf(user.name) < 0) {
                if (name === null) name = user.name;
            }
        });
        setState((state) => [...state, name]);
    };

    const renderItem = (item) => {
        return (
            <div className="item" key={item}>
                <UserCard name={item} active={false} cardState={0} />
            </div>
        );
    };

    return (
        <div style={{ textAlign: "center" }}>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={() => delItem(value)}>Del</button>
            <button onClick={() => insItem()}>Ins</button>

            <FlipMove
                className="items"
                duration={350}
                staggerDurationBy={20}
                staggerDelayBy={20}>
                <FlipMove>{state.map((item) => renderItem(item))}</FlipMove>
            </FlipMove>
        </div>
    );
}

export default App;
