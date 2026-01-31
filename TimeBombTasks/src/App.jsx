import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./App/HomePage";
import MissionControlPage from "./App/MissionControlPage";
import CountdownPage from "./App/CountdownPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mission-control" element={<MissionControlPage />} />
      <Route path="/countdown" element={<CountdownPage />} />
    </Routes>
  );
}

export default App;
