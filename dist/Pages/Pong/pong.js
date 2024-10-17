"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _balle = _interopRequireDefault(require("./composants/balle.jsx"));
var _paddle = _interopRequireDefault(require("./composants/paddle.jsx"));
require("./pong.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Pong() {
  const [ballPosition, setBallPosition] = (0, _react.useState)({
    x: 250,
    y: 200
  });
  const [ballSpeed, setBallSpeed] = (0, _react.useState)({
    dx: 10,
    dy: 6
  });
  const [playerPaddleY, setPlayerPaddleY] = (0, _react.useState)(125);
  const [botPaddleY, setBotPaddleY] = (0, _react.useState)(125);
  const [playerScore, setPlayerScore] = (0, _react.useState)(0);
  const [botScore, setBotScore] = (0, _react.useState)(0);
  const gameRef = (0, _react.useRef)(null);
  const paddleHeight = 60;
  const playerPaddleSpeed = 10;
  const botPaddleSpeed = 5;
  const ballRadius = 12;
  const canvasWidth = 600;
  const canvasHeight = 300;
  const handleKeyDown = e => {
    if (e.key === "ArrowUp") {
      setPlayerPaddleY(prevY => Math.max(prevY - playerPaddleSpeed, 0));
    } else if (e.key === "ArrowDown") {
      setPlayerPaddleY(prevY => Math.min(prevY + playerPaddleSpeed, canvasHeight - paddleHeight));
    }
  };
  const getRandomSpeed = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  const moveBall = () => {
    setBallPosition(prev => {
      let newX = prev.x + ballSpeed.dx;
      let newY = prev.y + ballSpeed.dy;
      if (newY <= 0 || newY >= canvasHeight - ballRadius * 2) {
        setBallSpeed(prevSpeed => ({
          ...prevSpeed,
          dy: -prevSpeed.dy
        }));
        newY = newY <= 0 ? 0 : canvasHeight - ballRadius * 2;
      }
      if (newX <= 30 && newY + ballRadius > playerPaddleY && newY + ballRadius < playerPaddleY + paddleHeight) {
        const newSpeedX = getRandomSpeed(8, 12); // Random speed between 8 and 12
        setBallSpeed(prevSpeed => ({
          dx: newSpeedX,
          dy: prevSpeed.dy
        }));
        newX = 30;
      }
      if (newX >= canvasWidth - 30 - ballRadius * 2 && newY + ballRadius > botPaddleY && newY + ballRadius < botPaddleY + paddleHeight) {
        const newSpeedX = -getRandomSpeed(8, 12); // Random speed between -8 and -12
        setBallSpeed(prevSpeed => ({
          dx: newSpeedX,
          dy: prevSpeed.dy
        }));
        newX = canvasWidth - 30 - ballRadius * 2;
      }
      if (newX <= 0) {
        setBotScore(prev => prev + 1);
        resetGame();
        return {
          x: 250,
          y: 200
        };
      }
      if (newX >= canvasWidth - ballRadius * 2) {
        setPlayerScore(prev => prev + 1);
        resetGame();
        return {
          x: 250,
          y: 200
        };
      }
      return {
        x: newX,
        y: newY
      };
    });
  };
  const moveBotPaddle = () => {
    setBotPaddleY(prevY => {
      if (ballPosition.y < prevY + paddleHeight / 2) {
        return Math.max(prevY - botPaddleSpeed, 0);
      } else if (ballPosition.y > prevY + paddleHeight / 2) {
        return Math.min(prevY + botPaddleSpeed, canvasHeight - paddleHeight);
      }
      return prevY;
    });
  };
  const resetGame = () => {
    setBallPosition({
      x: 250,
      y: 200
    });
    const initialSpeedX = Math.random() < 0.5 ? -10 : 10; // Randomly choose initial direction
    setBallSpeed({
      dx: initialSpeedX,
      dy: getRandomSpeed(-6, 6)
    });
  };
  (0, _react.useEffect)(() => {
    const gameLoop = setInterval(() => {
      moveBall();
      moveBotPaddle();
    }, 1000 / 60);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(gameLoop);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ballPosition, playerPaddleY]);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: gameRef,
    style: {
      position: "relative",
      width: `${canvasWidth}px`,
      height: `${canvasHeight}px`,
      backgroundColor: "black",
      margin: "0 auto",
      overflow: "hidden"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "scoring",
    style: {
      position: "absolute",
      left: "25%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      color: "rgba(255, 255, 255, 0.2)",
      // Lighter color with more transparency
      fontSize: `${canvasHeight * 0.4}px`,
      // Increased size to 30% of canvas height
      fontWeight: "bold",
      zIndex: 0 // Changed from -1 to 0
    }
  }, playerScore), /*#__PURE__*/_react.default.createElement("div", {
    className: "scoring",
    style: {
      position: "absolute",
      right: "25%",
      top: "50%",
      transform: "translate(50%, -50%)",
      color: "rgba(255, 255, 255, 0.2)",
      // Lighter color with more transparency
      fontSize: `${canvasHeight * 0.4}px`,
      // Increased size to 30% of canvas height
      fontWeight: "bold",
      zIndex: 0 // Changed from -1 to 0
    }
  }, botScore), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "0",
      bottom: "0",
      width: "2px",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      zIndex: 1
    }
  }), /*#__PURE__*/_react.default.createElement(_balle.default, {
    position: ballPosition,
    radius: ballRadius
  }), /*#__PURE__*/_react.default.createElement(_paddle.default, {
    position: playerPaddleY,
    height: paddleHeight,
    isPlayer: true
  }), /*#__PURE__*/_react.default.createElement(_paddle.default, {
    position: botPaddleY,
    height: paddleHeight,
    isPlayer: false
  }));
}
var _default = exports.default = Pong;