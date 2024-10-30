import { useState, useEffect } from "react";
import "../styles.css";
import AstralImg from "../../../Image/Images_rea/Astral.png";
import WPFCImg from "../../../Image/Images_rea/WePlayForCharity.png"; 

const realisations = [
  {
    image: AstralImg,
    url: "https://mon-portfolio-juliens-projects-b205dd26.vercel.app/projets/astral_frontiers/",
  },
  {
    image: WPFCImg,
    url: "https://mon-portfolio-juliens-projects-b205dd26.vercel.app/projets/weplayforcharity/",
  },
];

export default function RealisationModal({ isOpen, closeModal }) {
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
    e.preventDefault(); // Empêche la sélection de texte lors du déplacement
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
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, realisations.length - 1));
    } else if (e.key === "Enter") {
      window.open(realisations[selectedIndex].url, "_blank");
    }
  };

  // Effect to manage modal visibility and event listeners
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Empêche le scroll de l'arrière-plan
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = 'auto'; // Réactive le scroll
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
          zIndex: 1000, // S'assure que la modale est au-dessus des autres éléments
          cursor: dragging ? 'grabbing' : 'default', // Change le curseur lors du déplacement
        }}
      >
        <div
          className="modal-header"
          onMouseDown={handleMouseDown}
          style={{ cursor: dragging ? 'grabbing' : 'grab' }} // Curseur main lors du drag
        >
          <span>🌐 Réalisations</span>
          <button className="close-btn" onClick={closeModal}>
            <strong>X</strong>
          </button>
        </div>

        {/* Arrière-plan semi-transparent pour la zone de l'image */}
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: '10px', borderRadius: '5px' }}>
          <h2 style={{ textAlign: "center", margin: "10px 0", color: "white" }}>Réalisations personnelles / d'études</h2>

          <div className="modal-content">
            {realisations.map((realisation, index) => (
              <div
                key={index}
                className="realisation-item"
                onClick={() => window.open(realisation.url, "_blank")} // Ouvre le lien dans un nouvel onglet
                onMouseEnter={() => handleMouseEnter(index)} // Définit l'index sélectionné au survol
                style={{
                  cursor: 'pointer', // Curseur pointeur pour les images
                  margin: '10px',
                  display: 'inline-block', // Aligne les éléments horizontalement
                  position: 'relative', // Requis pour le positionnement absolu de l'outline
                }}
              >
                <img
                  src={realisation.image}
                  alt={`Realisation ${index}`}
                  style={{
                    width: '100px',
                    height: 'auto',
                    borderRadius: '10px', // Ajoute un border-radius ici
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
