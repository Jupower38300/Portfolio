import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx"; // Import correct du composant Home

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} /> {/* Page d'accueil */}
      </Routes>
    </>
  );
}
