import { useState, useEffect } from "react";
import "../styles.css"; // Make sure to include your styles for the modal
import Godotimg from "../../../Image/Images_rea/Borderline.png";

const godotGames = [
  {
    image: Godotimg,
    url: "https://jupower38.itch.io/borderline",
  },
];

export default function GodotModal({ isOpen, closeModal }) {
  const [modalPosition, setModalPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMouseDown = (e) => {
    setDragging(true);
    setInitialPosition({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y,
    });
    e.preventDefault(); // Prevent text selection during drag
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

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "ArrowRight") {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, godotGames.length - 1));
    } else if (e.key === "Enter") {
      window.open(godotGames[selectedIndex].url, "_blank");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, dragging]);

  const handleMouseEnter = (index) => {
    setSelectedIndex(index);
  };

  if (!isOpen) return null;

  return (
    <div>
      <div
        className="modal-window"
        style={{
          top: `${modalPosition.y}px`,
          left: `${modalPosition.x}px`,
          position: "absolute",
          zIndex: 1000,
          cursor: dragging ? 'grabbing' : 'default',
        }}
      >
        <div
          className="modal-header"
          onMouseDown={handleMouseDown}
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        >
          <span>🎮 Jeux Godot</span>
          <button className="close-btn" onClick={closeModal}>
            <strong>X</strong>
          </button>
        </div>

        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: '10px', borderRadius: '5px' }}>
          <h2 style={{ textAlign: "center", margin: "10px 0", color: "white" }}>Jeux créés avec Godot</h2>

          <div className="modal-content">
            {godotGames.map((game, index) => (
              <div
                key={index}
                className="site-item"
                onClick={() => window.open(game.url, "_blank")}
                onMouseEnter={() => handleMouseEnter(index)}
                style={{
                  cursor: 'pointer',
                  margin: '10px',
                  display: 'inline-block',
                  position: 'relative',
                }}
              >
                <img
                  src={game.image}
                  alt={`Godot Game ${index}`}
                  style={{
                    width: '100px',
                    height: 'auto',
                    borderRadius: '10px',
                  }}
                />
                {selectedIndex === index && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      left: '-8px',
                      right: '-8px',
                      bottom: '-8px',
                      border: '4px solid red',
                      borderRadius: '10px',
                      pointerEvents: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
