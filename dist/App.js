"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;
var _reactRouterDom = require("react-router-dom");
var _morpion = _interopRequireDefault(require("./Pages/Morpion/morpion.jsx"));
var _Home = _interopRequireDefault(require("./Pages/Home/Home.jsx"));
var _pong = _interopRequireDefault(require("./Pages/Pong/pong.jsx"));
var _demine = _interopRequireDefault(require("./Pages/D\xE9mineur/demine.jsx"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Import correct du composant Morpion
// Import correct du composant Home
// Assure-toi que Pong est bien importé
// Assurez-vous que le chemin est correct

function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    index: true,
    element: /*#__PURE__*/React.createElement(_Home.default, null)
  }), " ", /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/morpion",
    element: /*#__PURE__*/React.createElement(_morpion.default, null)
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/pong",
    element: /*#__PURE__*/React.createElement(_pong.default, null)
  }), " ", /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/demineur",
    element: /*#__PURE__*/React.createElement(_demine.default, null)
  })));
}