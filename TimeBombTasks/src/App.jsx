import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import MissionControl from "./pages/MissionControl";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      
        <HomePage />
        <MissionControl />
      
    </div>
  );
}

export default App;
