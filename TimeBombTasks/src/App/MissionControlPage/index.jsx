import { useContext } from "react";
import { GameContext } from "../../Context/GameContext";
import HealthBar from "../HealthBar";

function MissionControlPage() {
  const { user } = useContext(GameContext);

  return (
    <div>
      <HealthBar currentHealth={user.health} />
      <h1>Mission Control Page coming soon</h1>
    </div>
  );
}

export default MissionControlPage;