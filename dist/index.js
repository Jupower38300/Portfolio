"use strict";
import _client from "react-dom/client";
import _reactRouterDom from "react-dom/client";


var _App = _interopRequireDefault(require("./App"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const rootElement = document.getElementById("root");
const root = (0, _client.createRoot)(rootElement);
root.render(/*#__PURE__*/React.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/React.createElement(_App.default, null)));