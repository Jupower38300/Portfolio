"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PongModal;
var _react = require("react");
require("../styles.css");
// Ensure to include your modal styles

function PongModal(_ref) {
  let {
    isOpen,
    closeModal
  } = _ref;
  const [pongPosition, setPongPosition] = (0, _react.useState)({
    x: 200,
    y: 200
  });
  const [draggingPong, setDraggingPong] = (0, _react.useState)(false);
  const [initialPongPosition, setInitialPongPosition] = (0, _react.useState)({
    x: 0,
    y: 0
  });

  // Mouse down event to start dragging
  const handleMouseDownPong = e => {
    setDraggingPong(true);
    setInitialPongPosition({
      x: e.clientX - pongPosition.x,
      y: e.clientY - pongPosition.y
    });
  };

  // Mouse move event to handle dragging
  const handleMouseMovePong = e => {
    if (draggingPong) {
      // Calculate new position for smooth dragging
      const newX = e.clientX - initialPongPosition.x;
      const newY = e.clientY - initialPongPosition.y;

      // Update position state with new coordinates
      setPongPosition({
        x: newX,
        y: newY
      });
    }
  };

  // Mouse up event to stop dragging
  const handleMouseUpPong = () => {
    setDraggingPong(false);
  };

  // Effect to manage dragging and body overflow
  (0, _react.useEffect)(() => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay"
  }, " ", /*#__PURE__*/React.createElement("div", {
    className: "modal-window",
    style: {
      top: `${pongPosition.y}px`,
      left: `${pongPosition.x}px`,
      position: "absolute",
      cursor: draggingPong ? 'grabbing' : 'grab' // Change cursor when dragging
    },
    onMouseDown: handleMouseDownPong // Set mouse down event on the entire modal
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFD3 Pong"), /*#__PURE__*/React.createElement("button", {
    className: "close-btn",
    onClick: closeModal
  }, /*#__PURE__*/React.createElement("strong", null, "X"))), /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("iframe", {
    src: "/pong",
    title: "Pong",
    className: "iframe-content"
  }))));
}