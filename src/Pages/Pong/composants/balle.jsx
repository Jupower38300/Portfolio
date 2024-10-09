import React from "react";

const Ball = ({ position, radius }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        backgroundColor: "white",
      }}
    />
  );
};

export default Ball;
