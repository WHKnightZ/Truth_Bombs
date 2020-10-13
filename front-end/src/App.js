import React from 'react';
import logo from './logo.svg';
import './App.css';
import background from './images/background.jpg';

import CoverCard from './components/CoverCard';
import { questions } from './data/data';

function App() {
  return (
    <div>
      <header className="App-header">
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <CoverCard color="blue" content={questions[0]} />
          <CoverCard color="pink" content={questions[1]} />
          <CoverCard color="yellow" content={questions[2]} />
          <CoverCard color="green" content={questions[3]} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <CoverCard color="purple" content={questions[4]} />
          <CoverCard color="gray" />
          <CoverCard color="black" />
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
