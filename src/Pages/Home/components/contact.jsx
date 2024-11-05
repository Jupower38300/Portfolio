import { useState, useEffect } from "react";
import "../styles.css";
import Email from "../../../Image/Images_contact/Email.png";
import Phone from "../../../Image/Images_contact/Phone.png"; 
import LinkedIn from "../../../Image/Images_contact/LinkedIn.png"


const contacts = [
    {
      image: Email,
      text: <a style={{ color: "white", margin: 0 }} href="mailto:julien.legrand038@gmail.com">julien.legrand038@gmail.com</a>,
    },
    {
      image: Phone,
      text: <a style={{ color: "white", margin: 0 }} href="tel:+33689545285">06 89 54 52 85</a>,
    },
    {
      image: LinkedIn,
      text: <a style={{ color: "white", margin: 0 }} href="https://www.linkedin.com/in/julien-legrand2/" target="_blank" rel="noopener noreferrer">Profil LinkedIn</a>,
    },
  ];

export default function ContactModal({ isOpen, closeModal }) {
  const [modalPosition, setModalPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isOpen, dragging]);

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
          <span>🌐 Contact</span>
          <button className="close-btn" onClick={closeModal}>
            <strong>X</strong>
          </button>
        </div>

        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: '10px', borderRadius: '5px' }}>
          <h2 style={{ textAlign: "center", margin: "10px 0", color: "white" }}>Mes Contacts</h2>

          <div className="modal-content">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="contact-item"
                style={{
                  display: 'flex', 
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: index !== contacts.length - 1 ? '1px solid #ccc' : 'none',
                }}
              >
                <img
                  src={contact.image}
                  alt={`Contact ${index}`}
                  style={{
                    width: '100px',
                    height: 'auto',
                    borderRadius: '10px',
                    marginRight: '15px', 
                  }}
                />
                <p style={{ color: "white", margin: 0 }}>{contact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}