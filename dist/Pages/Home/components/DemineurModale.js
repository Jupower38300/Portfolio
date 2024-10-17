"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DemineurModal;
var _react = require("react");
function DemineurModal(_ref) {
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
  const handleMouseDown = e => {
    setDragging(true);
    setInitialPosition({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y
    });
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

  // Use the same approach to listen for mouse events at the document level
  (0, _react.useEffect)(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-window",
    style: {
      top: `${modalPosition.y}px`,
      left: `${modalPosition.x}px`,
      position: "absolute"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header",
    onMouseDown: handleMouseDown
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA3 D\xE9mineur"), /*#__PURE__*/React.createElement("button", {
    className: "close-btn",
    onClick: closeModal
  }, /*#__PURE__*/React.createElement("strong", null, "X"))), /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("iframe", {
    src: "/demineur",
    title: "D\xE9mineur",
    className: "iframe-content"
  })));
}