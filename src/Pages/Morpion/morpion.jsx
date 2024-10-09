import { useState, useEffect } from "react";
import "./morpion.css";

function Square({ value, onSquareClick }) {
  const className = value ? `square ${value}` : "square"; // Add class for X or O
  return (
    <button className={className} onClick={onSquareClick} data-tilt>
      {value}
    </button>
  );
}

function Board({ squares, onPlay, winner }) {
  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = "X"; // Player's move
    onPlay(nextSquares);
  }

  return (
    <div className="Morpion">
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);

  useEffect(() => {
    if (!winner && !gameOver && currentMove % 2 !== 0) {
      const botMove = makeBotMove(currentSquares);
      const nextSquares = currentSquares.slice();
      nextSquares[botMove] = "O"; // Bot's move
      handlePlay(nextSquares);
    }
    if (winner) {
      setGameOver(true);
      updateScore(winner); // Update the score for the winner
    } else if (!winner && !currentSquares.includes(null)) {
      setGameOver(true); // It's a draw
    }
  }, [currentSquares, winner]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function updateScore(winner) {
    if (winner === "X") {
      setPlayerScore((prev) => prev + 1);
    } else if (winner === "O") {
      setBotScore((prev) => prev + 1);
    }
    setTimeout(resetBoard, 1000); // Automatically reset the board after 1 second
  }

  function resetBoard() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setGameOver(false);
  }

  let status;
  if (winner) {
    status = winner + " a gagné!";
  } else if (gameOver && !winner) {
    status = "Match nul!";
    setTimeout(resetBoard, 1000); // Automatically reset after a draw
  } else {
    status = ""; // No message during gameplay
  }

  return (
    <div className="game">
      <div className="game_info">
        <h1 className="title-Morpion">Morpion</h1>
        <div className="status">{status}</div>
        <div className="scoreboard">
          <div className="score_joueurs">
            <span className="signe">❌</span>{" "}
            <span className="score">{playerScore}</span>
          </div>
          <div className="score_joueurs">
            <span className="signe">⭕</span>{" "}
            <span className="score">{botScore}</span>
          </div>
        </div>
      </div>
      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} winner={winner} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function makeBotMove(squares) {
  const bestMove = getBestMove(squares, "O") || getBestMove(squares, "X");
  if (bestMove !== null) {
    return bestMove;
  }
  return getRandomMove(squares);
}

function getBestMove(squares, player) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === player && squares[b] === player && !squares[c]) {
      return c;
    } else if (squares[a] === player && !squares[b] && squares[c] === player) {
      return b;
    } else if (!squares[a] && squares[b] === player && squares[c] === player) {
      return a;
    }
  }
  return null;
}

function getRandomMove(squares) {
  const availableMoves = squares
    .map((value, index) => (value === null ? index : null))
    .filter((value) => value !== null);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}
