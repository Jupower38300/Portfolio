// composants/paddle.jsx
import React from "react";

function Paddle({ position, height, isPlayer, right }) {
  const style = {
    position: "absolute",
    width: "10px",
    height: `${height}px`,
    backgroundColor: "white",
    top: `${position}px`,
  };

  if (isPlayer) {
    style.left = "10px";
  } else {
    style.right = `10px`;
  }

  return <div style={style}></div>;
}

export default Paddle;
