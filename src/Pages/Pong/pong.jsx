import React, { useEffect, useState, useRef } from "react";
import Ball from "./composants/balle.jsx";
import Paddle from "./composants/paddle.jsx";
import "./pong.css";

function Pong() {
  const [ballPosition, setBallPosition] = useState({ x: 250, y: 200 });
  const [ballSpeed, setBallSpeed] = useState({ dx: 10, dy: 6 });
  const [playerPaddleY, setPlayerPaddleY] = useState(125);
  const [botPaddleY, setBotPaddleY] = useState(125);
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const gameRef = useRef(null);

  const paddleHeight = 60;
  const playerPaddleSpeed = 10;
  const botPaddleSpeed = 5;
  const ballRadius = 12;
  const canvasWidth = 700;
  const canvasHeight = 300;

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      setPlayerPaddleY((prevY) => Math.max(prevY - playerPaddleSpeed, 0));
    } else if (e.key === "ArrowDown") {
      setPlayerPaddleY((prevY) =>
        Math.min(prevY + playerPaddleSpeed, canvasHeight - paddleHeight)
      );
    }
  };

  const getRandomSpeed = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const moveBall = () => {
    setBallPosition((prev) => {
      let newX = prev.x + ballSpeed.dx;
      let newY = prev.y + ballSpeed.dy;

      if (newY <= 0 || newY >= canvasHeight - ballRadius * 2) {
        setBallSpeed((prevSpeed) => ({ ...prevSpeed, dy: -prevSpeed.dy }));
        newY = newY <= 0 ? 0 : canvasHeight - ballRadius * 2;
      }

      if (
        newX <= 30 &&
        newY + ballRadius > playerPaddleY &&
        newY + ballRadius < playerPaddleY + paddleHeight
      ) {
        const newSpeedX = getRandomSpeed(8, 12); // Random speed between 8 and 12
        setBallSpeed((prevSpeed) => ({ dx: newSpeedX, dy: prevSpeed.dy }));
        newX = 30;
      }

      if (
        newX >= canvasWidth - 30 - ballRadius * 2 &&
        newY + ballRadius > botPaddleY &&
        newY + ballRadius < botPaddleY + paddleHeight
      ) {
        const newSpeedX = -getRandomSpeed(8, 12); // Random speed between -8 and -12
        setBallSpeed((prevSpeed) => ({ dx: newSpeedX, dy: prevSpeed.dy }));
        newX = canvasWidth - 30 - ballRadius * 2;
      }

      if (newX <= 0) {
        setBotScore((prev) => prev + 1);
        resetGame();
        return { x: 250, y: 200 };
      }
      if (newX >= canvasWidth - ballRadius * 2) {
        setPlayerScore((prev) => prev + 1);
        resetGame();
        return { x: 250, y: 200 };
      }

      return { x: newX, y: newY };
    });
  };

  const moveBotPaddle = () => {
    setBotPaddleY((prevY) => {
      if (ballPosition.y < prevY + paddleHeight / 2) {
        return Math.max(prevY - botPaddleSpeed, 0);
      } else if (ballPosition.y > prevY + paddleHeight / 2) {
        return Math.min(prevY + botPaddleSpeed, canvasHeight - paddleHeight);
      }
      return prevY;
    });
  };

  const resetGame = () => {
    setBallPosition({ x: 250, y: 200 });
    const initialSpeedX = Math.random() < 0.5 ? -10 : 10; // Randomly choose initial direction
    setBallSpeed({ dx: initialSpeedX, dy: getRandomSpeed(-6, 6) });
  };

  useEffect(() => {
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

  return (
    <div
      ref={gameRef}
      style={{
        position: "relative",
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        backgroundColor: "black",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* Player score */}
      <div
        className="scoring"
        style={{
          position: "absolute",
          left: "25%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "rgba(255, 255, 255, 0.2)", // Lighter color with more transparency
          fontSize: `${canvasHeight * 0.4}px`, // Increased size to 30% of canvas height
          fontWeight: "bold",
          zIndex: 0, // Changed from -1 to 0
        }}
      >
        {playerScore}
      </div>

      {/* Bot score */}
      <div
        className="scoring"
        style={{
          position: "absolute",
          right: "25%",
          top: "50%",
          transform: "translate(50%, -50%)",
          color: "rgba(255, 255, 255, 0.2)", // Lighter color with more transparency
          fontSize: `${canvasHeight * 0.4}px`, // Increased size to 30% of canvas height
          fontWeight: "bold",
          zIndex: 0, // Changed from -1 to 0
        }}
      >
        {botScore}
      </div>

      {/* Middle line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "0",
          bottom: "0",
          width: "2px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          zIndex: 1,
        }}
      ></div>

      <Ball position={ballPosition} radius={ballRadius} />

      <Paddle position={playerPaddleY} height={paddleHeight} isPlayer={true} />

      <Paddle position={botPaddleY} height={paddleHeight} isPlayer={false} />
    </div>
  );
}
export default Pong;
