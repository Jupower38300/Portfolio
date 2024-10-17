"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MorpionModal;
var _react = require("react");
function MorpionModal(_ref) {
  let {
    isOpen,
    closeModal
  } = _ref;
  const [morpionPosition, setMorpionPosition] = (0, _react.useState)({
    x: 150,
    y: 150
  });
  const [draggingMorpion, setDraggingMorpion] = (0, _react.useState)(false);
  const [initialMorpionPosition, setInitialMorpionPosition] = (0, _react.useState)({
    x: 0,
    y: 0
  });
  const handleMouseDownMorpion = e => {
    setDraggingMorpion(true);
    setInitialMorpionPosition({
      x: e.clientX - morpionPosition.x,
      y: e.clientY - morpionPosition.y
    });
  };
  const handleMouseMoveMorpion = e => {
    if (draggingMorpion) {
      setMorpionPosition({
        x: e.clientX - initialMorpionPosition.x,
        y: e.clientY - initialMorpionPosition.y
      });
    }
  };
  const handleMouseUpMorpion = () => {
    setDraggingMorpion(false);
  };

  // Use the same approach to listen for mouse events at the document level
  (0, _react.useEffect)(() => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-window",
    style: {
      top: `${morpionPosition.y}px`,
      left: `${morpionPosition.x}px`,
      position: "absolute"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header",
    onMouseDown: handleMouseDownMorpion
  }, /*#__PURE__*/React.createElement("span", null, "\u274C Morpion"), /*#__PURE__*/React.createElement("button", {
    className: "close-btn",
    onClick: closeModal
  }, /*#__PURE__*/React.createElement("strong", null, "X"))), /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("iframe", {
    src: "/morpion",
    title: "Morpion",
    className: "iframe-content"
  })));
}