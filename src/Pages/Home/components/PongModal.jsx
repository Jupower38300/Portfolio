// PongModal.js
import { useState } from "react";

export default function PongModal({ isOpen, closeModal }) {
  const [pongPosition, setpongPosition] = useState({ x: 200, y: 200 });
  const [draggingPong, setDraggingPong] = useState(false);
  const [initialPongPosition, setInitialPongPosition] = useState({ x: 0, y: 0 });

  const handleMouseDownPong = (e) => {
    setDraggingPong(true);
    setInitialPongPosition({
      x: e.clientX - pongPosition.x,
      y: e.clientY - pongPosition.y,
    });
  };

  const handleMouseMovePong = (e) => {
    if (draggingPong) {
      setpongPosition({
        x: e.clientX - initialPongPosition.x,
        y: e.clientY - initialPongPosition.y,
      });
    }
  };

  const handleMouseUpPong = () => {
    setDraggingPong(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-window"
      style={{
        top: `${pongPosition.y}px`,
        left: `${pongPosition.x}px`,
        position: "absolute",
      }}
      onMouseMove={handleMouseMovePong}
      onMouseUp={handleMouseUpPong}
    >
      <div className="modal-header" onMouseDown={handleMouseDownPong}>
        <span>🏓 Pong</span>
        <button className="close-btn" onClick={closeModal}>
          <strong>X</strong>
        </button>
      </div>
      <div className="modal-content">
        <iframe src="/pong" title="Pong" className="iframe-content"></iframe>
      </div>
    </div>
  );
}
