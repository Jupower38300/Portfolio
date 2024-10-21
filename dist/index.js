"use strict";

var _client = require("react-dom/client");
var _reactRouterDom = require("react-router-dom");
var _App = _interopRequireDefault(require("./App.jsx"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const rootElement = document.getElementById("root");
const root = (0, _client.createRoot)(rootElement);
root.render(/*#__PURE__*/React.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/React.createElement(_App.default, null)));