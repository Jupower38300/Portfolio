import { useState, useEffect } from "react";

export default function MorpionModal({ isOpen, closeModal }) {
  const [morpionPosition, setMorpionPosition] = useState({ x: 150, y: 150 });
  const [draggingMorpion, setDraggingMorpion] = useState(false);
  const [initialMorpionPosition, setInitialMorpionPosition] = useState({ x: 0, y: 0 });

  const handleMouseDownMorpion = (e) => {
    setDraggingMorpion(true);
    setInitialMorpionPosition({
      x: e.clientX - morpionPosition.x,
      y: e.clientY - morpionPosition.y,
    });
  };

  const handleMouseMoveMorpion = (e) => {
    if (draggingMorpion) {
      setMorpionPosition({
        x: e.clientX - initialMorpionPosition.x,
        y: e.clientY - initialMorpionPosition.y,
      });
    }
  };

  const handleMouseUpMorpion = () => {
    setDraggingMorpion(false);
  };

  // Use the same approach to listen for mouse events at the document level
  useEffect(() => {
    if (draggingMorpion) {
      document.addEventListener("mousemove", handleMouseMoveMorpion);
      document.addEventListener("mouseup", handleMouseUpMorpion);
    } else {
      document.removeEventListener("mousemove", handleMouseMoveMorpion);
      document.removeEventListener("mouseup", handleMouseUpMorpion);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveMorpion);
      document.removeEventListener("mouseup", handleMouseUpMorpion);
    };
  }, [draggingMorpion]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-window"
      style={{
        top: `${morpionPosition.y}px`,
        left: `${morpionPosition.x}px`,
        position: "absolute",
      }}
    >
      <div className="modal-header" onMouseDown={handleMouseDownMorpion}>
        <span>❌ Morpion</span>
        <button className="close-btn" onClick={closeModal}>
          <strong>X</strong>
        </button>
      </div>
      <div className="modal-content">
        <iframe
          src="/morpion"
          title="Morpion"
          className="iframe-content"
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </div>
    </div>
  );
}
