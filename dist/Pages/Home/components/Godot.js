"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GodotModal;
var _react = require("react");
require("../styles.css");
var _Borderline = _interopRequireDefault(require("../../../Image/Images_rea/Borderline.png"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Make sure to include your styles for the modal

const godotGames = [{
  image: _Borderline.default,
  url: "https://jupower38.itch.io/borderline"
}];
function GodotModal(_ref) {
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
    setDragging(true);
    setInitialPosition({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y
    });
    e.preventDefault(); // Prevent text selection during drag
  };
  const handleMouseMove = e => {
    if (dragging) {
      setModalPosition({
        x: e.clientX - initialPosition.x,
        y: e.clientY - initialPosition.y
      });
    }
  };
  const handleMouseUp = () => {
    setDragging(false);
  };
  const handleKeyDown = e => {
    if (e.key === "ArrowLeft") {
      setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (e.key === "ArrowRight") {
      setSelectedIndex(prevIndex => Math.min(prevIndex + 1, godotGames.length - 1));
    } else if (e.key === "Enter") {
      window.open(godotGames[selectedIndex].url, "_blank");
    }
  };
  (0, _react.useEffect)(() => {
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
      cursor: dragging ? 'grabbing' : 'default'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header",
    onMouseDown: handleMouseDown,
    style: {
      cursor: dragging ? 'grabbing' : 'grab'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFAE Jeux Godot"), /*#__PURE__*/React.createElement("button", {
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
  }, "Jeux cr\xE9\xE9s avec Godot"), /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, godotGames.map((game, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "site-item",
    onClick: () => window.open(game.url, "_blank"),
    onMouseEnter: () => handleMouseEnter(index),
    style: {
      cursor: 'pointer',
      margin: '10px',
      display: 'inline-block',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: game.image,
    alt: `Godot Game ${index}`,
    style: {
      width: '100px',
      height: 'auto',
      borderRadius: '10px'
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