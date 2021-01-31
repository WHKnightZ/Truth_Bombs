import React, { useState, useEffect, useRef, createRef } from 'react';
import './css/App.css';
import './css/Button.css';

import CoverCard from './components/CoverCard';
import Login from './components/Login';
import TargetCard from './components/TargetCard';
import UserCard from './components/UserCard';
import Menu from './components/Menu';

import FlipMove from 'react-flip-move';
import { listColors } from './data';

const io = require('socket.io-client');

const GS_LOGIN = 0;
const GS_LOBBY = 1;
const GS_QUESTION = 2;
const GS_ANSWER = 3;

function App() {
  const [socket, setSocket] = useState(null);

  const [gameState, setGameState] = useState(GS_QUESTION);
  const [name, setName] = useState(null);

  const [coverCard, setCoverCard] = useState(-1);
  const [flashCard, setFlashCard] = useState(['', '', '', '', '', '', '']);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [player, setPlayer] = useState(null);
  const [target, setTarget] = useState(null);
  const [questioner, setQuestioner] = useState(null);
  const [cardState, setCardState] = useState(0);
  const [choosingText, setChoosingText] = useState('Play');
  const cardRefs = useRef([createRef(), createRef(), createRef(), createRef(), createRef(), createRef(), createRef()]);

  const [animation, setAnimation] = useState({
    index: -1,
    top: 0,
    left: 0,
    timer: 0,
  });

  useEffect(() => {
    setSocket(io('http://127.0.0.1:5012'));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
    socket.on('error', (data) => {
      alert(data['msg']);
    });
    socket.on('login', (data) => {
      setOnlineUsers(data);
      setGameState(GS_LOBBY);
    });
    socket.on('play', (data) => {
      setGameState(GS_QUESTION);
    });
    socket.on('add_cover_card', (data) => {
      setCoverCard(data['num']);
    });
    socket.on('add_flash_card', (data) => {
      setFlashCard((flashCard) => {
        const questions = [...flashCard];
        questions[data['num']] = data['question'];
        return questions;
      });
    });
    socket.on('choose_player', (data) => {
      setPlayer(data);
    });
    socket.on('choose_target', (data) => {
      let name = data.name;
      let type = data.type;
      setPlayer(name);
      let delay = 80;
      let inc = 90;
      let state = 0;
      for (let i = 0; i <= 9; i++) {
        setTimeout(() => {
          state = 1 - state;
          setCardState(state);
        }, delay);
        delay += inc;
        inc += 10;
      }
      setTimeout(() => {
        if (type === 'target') setTarget(name);
        else setQuestioner(name);
        setChoosingText('');
      }, delay);
    });
    socket.on('choosing', (data) => {
      setChoosingText(data);
    });
  }, [socket]);

  const login = (name) => {
    socket.emit('login', { name: name });
  };

  const play = () => {
    socket.emit('play', {});
  };

  const handleChangeName = (e) => {
    setName(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') login(name);
  };

  const chooseQuestion = (i) => {
    const r = cardRefs.current[i].current;
    const top = r.offsetTop;
    const left = r.offsetLeft;
    console.log(top, left);
    setAnimation({ index: i, timer: 0, top, left });
    // socket.emit("choose_question", { name: i });
  };

  let visibles = [];
  for (let i = 0; i < coverCard; i++) visibles.push('visible');
  for (let i = coverCard; i < 7; i++) visibles.push('hidden');
  let Render = null;

  const cardStyle = {
    position: 'absolute',
    top: animation.top,
    left: animation.left,
  };

  if (gameState === GS_LOGIN) {
    Render = <Login onChange={handleChangeName} onKeyDown={handleKeyDown} />;
  } else if (gameState === GS_LOBBY) {
    Render = (
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            color: 'black',
          }}>
          <TargetCard text="Target" target={target} />
          <TargetCard text="Questioner" target={questioner} />
        </div>
        <div
          style={{
            display: 'flex',
            width: 300,
            height: 40,
            color: 'black',
            backgroundColor: '#eee',
            borderRadius: 20,
            margin: '10px auto',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
            visibility: choosingText !== '' ? 'visible' : 'hidden',
            boxShadow: '-4px 6px 12px #7e7e7e',
          }}
          onClick={() => play()}>
          {choosingText}
        </div>
        <FlipMove className="items" duration={350} staggerDurationBy={20} staggerDelayBy={20}>
          <FlipMove>
            {onlineUsers
              .filter((user) => user.name !== target && user.name !== questioner)
              .map((user) => (
                <div className="item" key={user.name}>
                  <UserCard name={user.name} active={user.name === player} cardState={cardState} />
                </div>
              ))}
          </FlipMove>
        </FlipMove>
        <div>
          <button className="material-btn" onClick={() => play()}>
            Play
          </button>
        </div>
      </div>
    );
  } else {
    Render = (
      <div>
        <div style={{ margin: '20px 0 10px 0', textAlign: 'center' }}>{questioner} is choosing the question</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '1200px',
          }}>
          {listColors.map((color, i) => (
            <CoverCard
              cardRef={cardRefs.current[i]}
              key={i}
              i={i}
              cardStyle={animation.index === i ? cardStyle : {}}
              // visible={visibles[i]}
              visible
              color={color}
              question={flashCard[i]}
              onClick={chooseQuestion}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        {gameState !== GS_LOGIN && <Menu />}
        {Render}
      </header>
    </div>
  );
}

export default App;
