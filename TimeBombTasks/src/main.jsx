//import { jsxDEV } from "react/jsx-dev-runtime";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameProvider } from "./Context/GameContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);