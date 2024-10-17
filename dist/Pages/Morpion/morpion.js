"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Game;
var _react = require("react");
require("./morpion.css");
function Square(_ref) {
  let {
    value,
    onSquareClick
  } = _ref;
  const className = value ? `square ${value}` : "square"; // Add class for X or O
  return /*#__PURE__*/React.createElement("button", {
    className: className,
    onClick: onSquareClick,
    "data-tilt": true
  }, value);
}
function Board(_ref2) {
  let {
    squares,
    onPlay,
    winner
  } = _ref2;
  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = "X"; // Player's move
    onPlay(nextSquares);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "Morpion"
  }, /*#__PURE__*/React.createElement("div", {
    className: "board-row"
  }, /*#__PURE__*/React.createElement(Square, {
    value: squares[0],
    onSquareClick: () => handleClick(0)
  }), /*#__PURE__*/React.createElement(Square, {
    value: squares[1],
    onSquareClick: () => handleClick(1)
  }), /*#__PURE__*/React.createElement(Square, {
    value: squares[2],
    onSquareClick: () => handleClick(2)
  })), /*#__PURE__*/React.createElement("div", {
    className: "board-row"
  }, /*#__PURE__*/React.createElement(Square, {
    value: squares[3],
    onSquareClick: () => handleClick(3)
  }), /*#__PURE__*/React.createElement(Square, {
    value: squares[4],
    onSquareClick: () => handleClick(4)
  }), /*#__PURE__*/React.createElement(Square, {
    value: squares[5],
    onSquareClick: () => handleClick(5)
  })), /*#__PURE__*/React.createElement("div", {
    className: "board-row"
  }, /*#__PURE__*/React.createElement(Square, {
    value: squares[6],
    onSquareClick: () => handleClick(6)
  }), /*#__PURE__*/React.createElement(Square, {
    value: squares[7],
    onSquareClick: () => handleClick(7)
  }), /*#__PURE__*/React.createElement(Square, {
    value: squares[8],
    onSquareClick: () => handleClick(8)
  })));
}
function Game() {
  const [history, setHistory] = (0, _react.useState)([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = (0, _react.useState)(0);
  const [playerScore, setPlayerScore] = (0, _react.useState)(0);
  const [botScore, setBotScore] = (0, _react.useState)(0);
  const [gameOver, setGameOver] = (0, _react.useState)(false);
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  (0, _react.useEffect)(() => {
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
      setPlayerScore(prev => prev + 1);
    } else if (winner === "O") {
      setBotScore(prev => prev + 1);
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
  return /*#__PURE__*/React.createElement("div", {
    className: "game"
  }, /*#__PURE__*/React.createElement("div", {
    className: "game_info"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "title-Morpion"
  }, "Morpion"), /*#__PURE__*/React.createElement("div", {
    className: "status"
  }, status), /*#__PURE__*/React.createElement("div", {
    className: "scoreboard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "score_joueurs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "signe"
  }, "\u274C"), " ", /*#__PURE__*/React.createElement("span", {
    className: "score"
  }, playerScore)), /*#__PURE__*/React.createElement("div", {
    className: "score_joueurs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "signe"
  }, "\u2B55"), " ", /*#__PURE__*/React.createElement("span", {
    className: "score"
  }, botScore)))), /*#__PURE__*/React.createElement("div", {
    className: "game-board"
  }, /*#__PURE__*/React.createElement(Board, {
    squares: currentSquares,
    onPlay: handlePlay,
    winner: winner
  })));
}
function calculateWinner(squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
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
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
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
  const availableMoves = squares.map((value, index) => value === null ? index : null).filter(value => value !== null);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}