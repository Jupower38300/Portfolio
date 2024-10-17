"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Home;
require("./styles.css");
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _PongModal = _interopRequireDefault(require("./components/PongModal"));
var _MorpionModal = _interopRequireDefault(require("./components/MorpionModal"));
var _DemineurModale = _interopRequireDefault(require("./components/DemineurModale"));
var _SitesModal = _interopRequireDefault(require("./components/SitesModal"));
var _Godot = _interopRequireDefault(require("./components/Godot"));
var _Realisation = _interopRequireDefault(require("./components/Realisation"));
var _CV = _interopRequireDefault(require("../../PDFs/CV.pdf"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Import the Realisation modal

function Home() {
  const [userInput, setUserInput] = (0, _react.useState)([]);
  const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowLeft", "ArrowRight", "ArrowRight", "KeyB", "KeyQ", "NumpadAdd"];
  const [isDemineurModalOpen, setIsDemineurModalOpen] = (0, _react.useState)(false);
  const [isMorpionModalOpen, setIsMorpionModalOpen] = (0, _react.useState)(false);
  const [isPongModalOpen, setIsPongModalOpen] = (0, _react.useState)(false);
  const [isSiteModalOpen, setIsSiteModalOpen] = (0, _react.useState)(false);
  const [isGodotModalOpen, setIsGodotModalOpen] = (0, _react.useState)(false);
  const [isRealisationModalOpen, setIsRealisationModalOpen] = (0, _react.useState)(false); // State for Realisation modal

  // Code for the password
  (0, _react.useEffect)(() => {
    const handleKeyPress = e => {
      if (userInput.length < code.length) {
        setUserInput(prev => [...prev, e.code]);
      }
      if (userInput.length + 1 === code.length) {
        if (JSON.stringify([...userInput, e.code]) === JSON.stringify(code)) {
          alert("Secret"); // Trigger your secret action here
        }
        // Reset the input
        setUserInput([]);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [userInput]);
  function Buttonbar(_ref) {
    let {
      image,
      href
    } = _ref;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      className: "button-desk"
    }, /*#__PURE__*/React.createElement("a", {
      href: href
    }, /*#__PURE__*/React.createElement("img", {
      src: image,
      alt: "app Barre"
    }))));
  }
  function Apps(_ref2) {
    let {
      nom,
      image,
      path,
      onClick
    } = _ref2;
    return /*#__PURE__*/React.createElement("div", {
      className: "app-docs",
      onClick: onClick
    }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
      to: path
    }, /*#__PURE__*/React.createElement("img", {
      src: image,
      alt: "Application"
    }), /*#__PURE__*/React.createElement("h2", null, nom)));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("div", {
    className: "Main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "Apps"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column"
  }, /*#__PURE__*/React.createElement(Apps, {
    nom: "R\xE9alisations",
    image: "https://img.icons8.com/?size=512&id=dINnkNb1FBl4&format=png",
    path: "#",
    onClick: () => setIsRealisationModalOpen(true) // Open Realisation modal on click
  }), /*#__PURE__*/React.createElement(_Realisation.default, {
    isOpen: isRealisationModalOpen,
    closeModal: () => setIsRealisationModalOpen(false)
  }), /*#__PURE__*/React.createElement(Apps, {
    nom: "Jeux Godot",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.diginoodles.com%2Fuser%2Fpages%2F04.projects%2F04.godot-game-engine%2FGodot_icon.svg.png&f=1&nofb=1&ipt=2cb73b023ca56610dbe9b70cf2f10c7d1c700a191d315e10789a93d07ba98d99&ipo=images",
    path: "#",
    onClick: () => setIsGodotModalOpen(true) // Open Godot modal on click
  }), /*#__PURE__*/React.createElement(_Godot.default, {
    isOpen: isGodotModalOpen,
    closeModal: () => setIsGodotModalOpen(false)
  }), /*#__PURE__*/React.createElement(Apps, {
    nom: "Sites",
    image: "https://img.icons8.com/?size=512&id=dINnkNb1FBl4&format=png",
    path: "#",
    onClick: () => setIsSiteModalOpen(true) // Open Sites modal on click
  }), /*#__PURE__*/React.createElement(_SitesModal.default, {
    isOpen: isSiteModalOpen,
    closeModal: () => setIsSiteModalOpen(false)
  })), /*#__PURE__*/React.createElement("div", {
    className: "column"
  }, /*#__PURE__*/React.createElement(Apps, {
    nom: "D\xE9mineur",
    image: "https://static-00.iconduck.com/assets.00/minesweeper-icon-1935x2048-kwrajscs.png",
    path: "#",
    onClick: () => setIsDemineurModalOpen(true) // Open Démineur modal on click
  }), /*#__PURE__*/React.createElement(_DemineurModale.default, {
    isOpen: isDemineurModalOpen,
    closeModal: () => setIsDemineurModalOpen(false)
  }), /*#__PURE__*/React.createElement(Apps, {
    nom: "Morpion",
    image: "https://cdn-icons-png.flaticon.com/512/2162/2162800.png",
    path: "#",
    onClick: () => setIsMorpionModalOpen(true) // Open Morpion modal on click
  }), /*#__PURE__*/React.createElement(_MorpionModal.default, {
    isOpen: isMorpionModalOpen,
    closeModal: () => setIsMorpionModalOpen(false)
  }), /*#__PURE__*/React.createElement(Apps, {
    nom: "Pong",
    image: "https://i.ibb.co/SQvDf36/Pong.png",
    path: "#",
    onClick: () => setIsPongModalOpen(true) // Open Pong modal on click
  }), /*#__PURE__*/React.createElement(_PongModal.default, {
    isOpen: isPongModalOpen,
    closeModal: () => setIsPongModalOpen(false) // Close Pong modal
  })))), /*#__PURE__*/React.createElement("div", {
    className: "barre"
  }, /*#__PURE__*/React.createElement("div", {
    className: "apps-button"
  }, /*#__PURE__*/React.createElement(Buttonbar, {
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2%2FWindows-Logo.png&f=1&nofb=1&ipt=138b43d7e04eae45170bacc5c0bfb5b0d3c40acdcd1212049e89421467301df2&ipo=images"
  }), /*#__PURE__*/React.createElement(Buttonbar, {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Windows_Settings_icon.svg/1092px-Windows_Settings_icon.svg.png"
  }), /*#__PURE__*/React.createElement(Buttonbar, {
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogospng.org%2Fdownload%2Fgoogle-chrome%2Flogo-google-chrome-1024.png&f=1&nofb=1&ipt=98244d1cacda3b3a33635266b0c7fa54abde0644c824fc65f87c3e918d948864&ipo=images"
  }), /*#__PURE__*/React.createElement(Buttonbar, {
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkit.com%2Fpng%2Ffull%2F479-4799678_telephone-icon-in-white.png&f=1&nofb=1&ipt=c8d9401bdb3b38d160a8a93ad778e43dcc0f71bab48eac4b11cf278d0b74cffc&ipo=images"
  }), /*#__PURE__*/React.createElement(Buttonbar, {
    href: _CV.default,
    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/ce572dc7-f6bc-4d9f-a140-fd183b1c15b7/dcl8rf1-76485ebc-d5dd-4c48-9880-dbe70ce58a53.png"
  }))));
}