import { Routes, Route } from "react-router-dom";
import Morpion from "./Pages/Morpion/morpion.jsx"; // Import correct du composant Morpion
import Home from "./Pages/Home/Home.jsx"; // Import correct du composant Home
import Pong from "./Pages/Pong/pong.jsx"; // Assure-toi que Pong est bien importé
import Demine from "./Pages/Démineur/demine.jsx"; // Assurez-vous que le chemin est correct
import Bbwrap from "./Pages/BubbleWrap/bbwrap.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} /> {/* Page d'accueil */}
        <Route path="/morpion" element={<Morpion />} />{/* Route vers Morpion */}
        <Route path="/pong" element={<Pong />} /> {/* Route vers Pong */}
        <Route path="/demineur" element={<Demine />} />
        <Route path="/bbwrap" element={<Bbwrap />}/>
      </Routes>
    </>
  );
}
