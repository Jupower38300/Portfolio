import { useState, useEffect } from "react";
import "../styles.css"; // Ensure to include your modal styles

export default function PongModal({ isOpen, closeModal }) {
  const [pongPosition, setPongPosition] = useState({ x: 200, y: 200 });
  const [draggingPong, setDraggingPong] = useState(false);
  const [initialPongPosition, setInitialPongPosition] = useState({ x: 0, y: 0 });

  // Mouse down event to start dragging
  const handleMouseDownPong = (e) => {
    setDraggingPong(true);
    setInitialPongPosition({
      x: e.clientX - pongPosition.x,
      y: e.clientY - pongPosition.y,
    });
  };

  // Mouse move event to handle dragging
  const handleMouseMovePong = (e) => {
    if (draggingPong) {
      // Calculate new position for smooth dragging
      const newX = e.clientX - initialPongPosition.x;
      const newY = e.clientY - initialPongPosition.y;

      // Update position state with new coordinates
      setPongPosition({ x: newX, y: newY });
    }
  };

  // Mouse up event to stop dragging
  const handleMouseUpPong = () => {
    setDraggingPong(false);
  };

  // Effect to manage dragging and body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      window.addEventListener("mousemove", handleMouseMovePong);
      window.addEventListener("mouseup", handleMouseUpPong);
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scroll
      window.removeEventListener("mousemove", handleMouseMovePong);
      window.removeEventListener("mouseup", handleMouseUpPong);
    }

    // Cleanup function to reset overflow style and remove event listeners
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener("mousemove", handleMouseMovePong);
      window.removeEventListener("mouseup", handleMouseUpPong);
    };
  }, [isOpen, draggingPong]); // Added draggingPong to dependency array

  if (!isOpen) return null;

  return (
    <div className="modal-overlay"> {/* Optional: to add a backdrop */}
      <div
        className="modal-window"
        style={{
          top: `${pongPosition.y}px`,
          left: `${pongPosition.x}px`,
          position: "absolute",
          cursor: draggingPong ? 'grabbing' : 'grab', // Change cursor when dragging
        }}
        onMouseDown={handleMouseDownPong} // Set mouse down event on the entire modal
      >
        <div className="modal-header">
          <span>🏓 Pong</span>
          <button className="close-btn" onClick={closeModal}>
            <strong>X</strong>
          </button>
        </div>
        <div className="modal-content">
          <iframe src="/pong" title="Pong" className="iframe-content" sandbox="allow-scripts allow-same-origin"></iframe>
        </div>
      </div>
    </div>
  );
}
