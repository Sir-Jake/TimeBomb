import { useState } from "react";
import "./App.css";
import { GameContext } from "./Context/GameContext";
import HomePage from "./App/HomePage";
import MissionControlPage from "./App/MissionControlPage";
import CountdownPage from "./App/CountdownPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <GameContext.Provider value={{ count, setCount }}>
        <HomePage />
        <MissionControlPage />
        <CountdownPage />
      </GameContext.Provider>
      <p className="read-the-docs"></p>
    </div>
  );
}

export default App;
