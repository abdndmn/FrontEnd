import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StarshipDetail from "./pages/StarShipDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/starship/:id" element={<StarshipDetail />} />
      </Routes>
    </Router>
  );
}

export default App;