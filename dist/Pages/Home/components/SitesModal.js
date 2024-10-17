"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SitesModal;
var _react = require("react");
require("../styles.css");
var _MakeMake = _interopRequireDefault(require("../../../Image/Images_rea/MakeMake.png"));
var _Obstinato = _interopRequireDefault(require("../../../Image/Images_rea/Obstinato.png"));
var _OeufBigBand = _interopRequireDefault(require("../../../Image/Images_rea/OeufBigBand.png"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Assurez-vous d'inclure vos styles pour la modale

const sites = [{
  image: _MakeMake.default,
  url: "https://www.makemake.studio/"
}, {
  image: _Obstinato.default,
  url: "https://obstinato.fr/"
}, {
  image: _OeufBigBand.default,
  url: "https://loeufbigband.fr/"
}];
function SitesModal(_ref) {
  let {
    isOpen,
    closeModal
  } = _ref;
  const [modalPosition, setModalPosition] = (0, _react.useState)({
    x: 100,
    y: 100
  });
  const [dragging, setDragging] = (0, _react.useState)(false);
  const [initialPosition, setInitialPosition] = (0, _react.useState)({
    x: 0,
    y: 0
  });
  const [selectedIndex, setSelectedIndex] = (0, _react.useState)(0);
  const handleMouseDown = e => {
    console.log("Mouse down:", e.clientX, e.clientY); // Log de la position de la souris
    setDragging(true);
    setInitialPosition({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y
    });
    e.preventDefault(); // Empêche la sélection de texte lors du déplacement
  };
  const handleMouseMove = e => {
    if (dragging) {
      console.log("Mouse move:", e.clientX, e.clientY); // Log de la position de la souris pendant le déplacement
      setModalPosition({
        x: e.clientX - initialPosition.x,
        y: e.clientY - initialPosition.y
      });
    }
  };
  const handleMouseUp = () => {
    console.log("Mouse up");
    setDragging(false);
  };
  const handleKeyDown = e => {
    if (e.key === "ArrowLeft") {
      setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (e.key === "ArrowRight") {
      setSelectedIndex(prevIndex => Math.min(prevIndex + 1, sites.length - 1));
    } else if (e.key === "Enter") {
      window.open(sites[selectedIndex].url, "_blank");
    }
  };

  // Effect to manage modal visibility and event listeners
  (0, _react.useEffect)(() => {
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
  const handleMouseEnter = index => {
    setSelectedIndex(index);
  };
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "modal-window",
    style: {
      top: `${modalPosition.y}px`,
      left: `${modalPosition.x}px`,
      position: "absolute",
      zIndex: 1000,
      // S'assure que la modale est au-dessus des autres éléments
      cursor: dragging ? 'grabbing' : 'default' // Change le curseur lors du déplacement
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header",
    onMouseDown: handleMouseDown,
    style: {
      cursor: dragging ? 'grabbing' : 'grab'
    } // Curseur main lors du drag
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF10 Sites"), /*#__PURE__*/React.createElement("button", {
    className: "close-btn",
    onClick: closeModal
  }, /*#__PURE__*/React.createElement("strong", null, "X"))), /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: '10px',
      borderRadius: '5px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: "center",
      margin: "10px 0",
      color: "white"
    }
  }, "Sites clients / stages"), /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, sites.map((site, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "site-item",
    onClick: () => window.open(site.url, "_blank") // Ouvre le lien dans un nouvel onglet
    ,
    onMouseEnter: () => handleMouseEnter(index) // Définit l'index sélectionné au survol
    ,
    style: {
      cursor: 'pointer',
      // Curseur pointeur pour les images
      margin: '10px',
      display: 'inline-block',
      // Aligne les éléments horizontalement
      position: 'relative' // Requis pour le positionnement absolu de l'outline
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: site.image,
    alt: `Site ${index}`,
    style: {
      width: '100px',
      height: 'auto',
      borderRadius: '10px' // Ajoute un border-radius ici
    }
  }), selectedIndex === index && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-8px',
      left: '-8px',
      right: '-8px',
      bottom: '-8px',
      border: '4px solid red',
      borderRadius: '10px',
      pointerEvents: 'none',
      transition: 'all 0.3s ease'
    }
  })))))));
}