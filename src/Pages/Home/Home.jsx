import "./styles.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PongModal from "./components/PongModal";
import MorpionModal from "./components/MorpionModal";
import DemineurModal from "./components/DemineurModale";
import SitesModal from './components/SitesModal'; 
import GodotModal from "./components/Godot"; // Import the new Godot modal// Adjust the import path as necessary

export default function Home() {
  const [userInput, setUserInput] = useState([]);
  const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyQ", "NumpadAdd"];

  const [isDemineurModalOpen, setIsDemineurModalOpen] = useState(false);
  const [isMorpionModalOpen, setIsMorpionModalOpen] = useState(false);
  const [isPongModalOpen, setIsPongModalOpen] = useState(false);
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);
  const [isGodotModalOpen, setIsGodotModalOpen] = useState(false);

  // Code for the password
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (userInput.length < code.length) {
        setUserInput((prev) => [...prev, e.code]);
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

  function Buttonbar({ image }) {
    return (
      <div>
        <button className="button-desk">
          <img src={image} alt="app Barre" />
        </button>
      </div>
    );
  }

  function Apps({ nom, image, path, onClick }) {
    return (
      <div className="app-docs" onClick={onClick}>
        <Link to={path}>
          <img src={image} alt="Application" />
          <h2>{nom}</h2>
        </Link>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="Main">
        <div className="Apps">
          <div className="column">
            <Apps
              nom="Réalisations"
              image="https://img.icons8.com/?size=512&id=dINnkNb1FBl4&format=png"
              path="/realisations"
            />

            <Apps
              nom="Jeux Godot"
              image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.diginoodles.com%2Fuser%2Fpages%2F04.projects%2F04.godot-game-engine%2FGodot_icon.svg.png&f=1&nofb=1&ipt=2cb73b023ca56610dbe9b70cf2f10c7d1c700a191d315e10789a93d07ba98d99&ipo=images"
              path="#"
              onClick={() => setIsGodotModalOpen(true)} // Open Sites modal on click
            />

            <GodotModal 
                isOpen = {isGodotModalOpen}
                closeModal={() => setIsGodotModalOpen(false)}
            />

            <Apps
              nom="Sites"
              image="https://img.icons8.com/?size=512&id=dINnkNb1FBl4&format=png"
              path="#"
              onClick={() => setIsSiteModalOpen(true)} // Open Sites modal on click
            />

            <SitesModal 
              isOpen={isSiteModalOpen}
              closeModal={() => setIsSiteModalOpen(false)}
            />
          </div>

          <div className="column">
            <Apps
              nom="Démineur"
              image="https://static-00.iconduck.com/assets.00/minesweeper-icon-1935x2048-kwrajscs.png"
              path="#"
              onClick={() => setIsDemineurModalOpen(true)} // Open Démineur modal on click
            />            
            
            <DemineurModal 
              isOpen={isDemineurModalOpen}
              closeModal={() => setIsDemineurModalOpen(false)}
            />

            <Apps
              nom="Morpion"
              image="https://cdn-icons-png.flaticon.com/512/2162/2162800.png"
              path="#"
              onClick={() => setIsMorpionModalOpen(true)} // Open Morpion modal on click
            />

            <MorpionModal 
              isOpen={isMorpionModalOpen}
              closeModal={() => setIsMorpionModalOpen(false)}
            />

            <Apps
              nom="Pong"
              image="https://i.ibb.co/SQvDf36/Pong.png"
              path="#"
              onClick={() => setIsPongModalOpen(true)} // Open Pong modal on click
            />

            <PongModal
              isOpen={isPongModalOpen}
              closeModal={() => setIsPongModalOpen(false)} // Close Pong modal
            />
          </div>
        </div>
      </div>

      <div className="barre">
        <div className="apps-button">
          <Buttonbar image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2%2FWindows-Logo.png&f=1&nofb=1&ipt=138b43d7e04eae45170bacc5c0bfb5b0d3c40acdcd1212049e89421467301df2&ipo=images" />
          <Buttonbar image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Windows_Settings_icon.svg/1092px-Windows_Settings_icon.svg.png" />
          <Buttonbar image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogospng.org%2Fdownload%2Fgoogle-chrome%2Flogo-google-chrome-1024.png&f=1&nofb=1&ipt=98244d1cacda3b3a33635266b0c7fa54abde0644c824fc65f87c3e918d948864&ipo=images" />
          <Buttonbar image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkit.com%2Fpng%2Ffull%2F479-4799678_telephone-icon-in-white.png&f=1&nofb=1&ipt=c8d9401bdb3b38d160a8a93ad778e43dcc0f71bab48eac4b11cf278d0b74cffc&ipo=images" />
          <Buttonbar image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/ce572dc7-f6bc-4d9f-a140-fd183b1c15b7/dcl8rf1-76485ebc-d5dd-4c48-9880-dbe70ce58a53.png" />
        </div>
      </div>
    </div>
  );
}
