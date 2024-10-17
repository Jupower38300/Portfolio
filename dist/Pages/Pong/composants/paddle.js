"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// composants/paddle.jsx

function Paddle(_ref) {
  let {
    position,
    height,
    isPlayer,
    right
  } = _ref;
  const style = {
    position: "absolute",
    width: "10px",
    height: `${height}px`,
    backgroundColor: "white",
    top: `${position}px`
  };
  if (isPlayer) {
    style.left = "10px";
  } else {
    style.right = `10px`;
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    style: style
  });
}
var _default = exports.default = Paddle;