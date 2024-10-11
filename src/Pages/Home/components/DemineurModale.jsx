import { useState } from "react";

export default function DemineurModal({ isOpen, closeModal }) {
  const [modalPosition, setModalPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setInitialPosition({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setModalPosition({
        x: e.clientX - initialPosition.x,
        y: e.clientY - initialPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-window"
      style={{
        top: `${modalPosition.y}px`,
        left: `${modalPosition.x}px`,
        position: "absolute",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="modal-header" onMouseDown={handleMouseDown}>
        <span>💣 Démineur</span>
        <button className="close-btn" onClick={closeModal}>
          <strong>X</strong>
        </button>
      </div>
      <div className="modal-content">
        <iframe
          src="/demineur"
          title="Démineur"
          className="iframe-content"
        ></iframe>
      </div>
    </div>
  );
}
