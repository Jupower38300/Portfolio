"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Ball = _ref => {
  let {
    position,
    radius
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      left: position.x,
      top: position.y,
      width: radius * 2,
      height: radius * 2,
      borderRadius: "50%",
      backgroundColor: "white"
    }
  });
};
var _default = exports.default = Ball;