import React, { useState, useEffect } from 'react';
import './App.css';

const GRID_SIZE = 4;

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const SYMBOLS = [
  '🍎', '🍌', '🍇', '🍒',
  '🍉', '🍋', '🍓', '🥝',
  '🍑', '🥥', '🍍', '🥭',
  '🍊', '🍐', '🍈', '🥑'
];

function generateTiles() {
  // Use only as many pairs as needed for the grid size
  const needed = (GRID_SIZE * GRID_SIZE) / 2;
  const chosen = SYMBOLS.slice(0, needed);
  const values = [];
  for (let i = 0; i < needed; i++) {
    values.push(chosen[i]);
    values.push(chosen[i]);
  }
  return shuffleArray(values);
}

function Tile({ value, revealed, matched, onClick }) {
  return (
    <button className={`tile${revealed || matched ? ' revealed' : ''}`} onClick={onClick} disabled={matched || revealed}>
      {revealed || matched ? value : ''}
    </button>
  );
}

function App() {
  const [tiles, setTiles] = useState(generateTiles());
  const [revealed, setRevealed] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(true);
  const [win, setWin] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [scores, setScores] = useState([]);

  useEffect(() => {
    let interval;
    if (running && !win) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running, win]);

  useEffect(() => {
    fetch(`${BASE_URL}/scores`)
      .then(res => res.json())
      .then(setScores);
  }, []);

  useEffect(() => {
    if (matched.length === tiles.length) {
      setRunning(false);
      setWin(true);
    }
  }, [matched, tiles.length]);

  useEffect(() => {
    if (win) {
      fetch(`${BASE_URL}/scores`)
        .then(res => res.json())
        .then(setScores);
    }
  }, [win]);

  const handleTileClick = idx => {
    if (revealed.length === 2 || revealed.includes(idx) || matched.includes(idx)) return;
    const newRevealed = [...revealed, idx];
    setRevealed(newRevealed);
    if (newRevealed.length === 2) {
      setMoves(m => m + 1);
      const [i1, i2] = newRevealed;
      if (tiles[i1] === tiles[i2]) {
        setTimeout(() => {
          setMatched([...matched, i1, i2]);
          setRevealed([]);
        }, 500);
      } else {
        setTimeout(() => setRevealed([]), 800);
      }
    }
  };

  const handleRestart = () => {
    setTiles(generateTiles());
    setRevealed([]);
    setMatched([]);
    setMoves(0);
    setTimer(0);
    setRunning(true);
    setWin(false);
    setPlayerName('');
  };

  const [scoreSubmitted, setScoreSubmitted] = useState(false);

// Set your backend API URL here
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://YOUR-BACKEND-DEPLOYMENT-URL' // e.g., https://flipping-tiles-backend.onrender.com
  : 'http://localhost:8080';

const handleSubmitScore = () => {
    fetch(`${BASE_URL}/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName, moves, timeSeconds: timer })
    })
      .then(() => fetch(`${BASE_URL}/scores`))
      .then(res => res.json())
      .then(scores => {
        setScores(scores);
        setScoreSubmitted(true);
      });
  };

const handleStartNewGame = () => {
    setTiles(generateTiles());
    setRevealed([]);
    setMatched([]);
    setMoves(0);
    setTimer(0);
    setRunning(true);
    setWin(false);
    setPlayerName('');
    setScoreSubmitted(false);
};


  return (
    <div className="app">
      <h1>Flipping Tiles</h1>
      <div className="stats">
        <span>Moves: {moves}</span>
        <span>Time: {timer}s</span>
        <button onClick={handleRestart}>Restart</button>
      </div>
      <div className="board" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 60px)` }}>
        {tiles.map((value, idx) => (
          <Tile
            key={idx}
            value={value}
            revealed={revealed.includes(idx)}
            matched={matched.includes(idx)}
            onClick={() => handleTileClick(idx)}
          />
        ))}
      </div>
      {win && (
        <div className="score-section">
          {!scoreSubmitted ? (
            <>
              <h2>Congratulations!</h2>
              <p>You won in {moves} moves and {timer} seconds.</p>
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                disabled={scores.some(s => s.playerName === playerName)}
              />
              <button onClick={handleSubmitScore} disabled={!playerName || scores.some(s => s.playerName === playerName)}>
                Submit Score
              </button>
              <h3>Top Scores</h3>
              <ul>
                {scores.map((score, i) => (
                  <li key={i}>{score.playerName} - Moves: {score.moves}, Time: {score.timeSeconds}s</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2>Score submitted!</h2>
              <button onClick={handleStartNewGame}>Start New Game</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
