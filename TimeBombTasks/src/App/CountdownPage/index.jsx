import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../Context/GameContext";
import BombTimer from "../../components/BombTimer";
import HealthBar from "../../components/HealthBar";
import TaskCard from "../../components/TaskCard";
import "./CountdownPage.css";

function CountdownPage() {
  const { user, tasks, toggleTaskCompletion, setUser } = useContext(GameContext);
  const navigate = useNavigate();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeBudget, setTimeBudget] = useState(240); // 4 minutes

  const currentTask = tasks[currentTaskIndex];

  const handleDefuseBomb = () => {
    if (currentTask) {
      // Award XP and toggle completion
      setUser((prev) => ({
        ...prev,
        xp: (prev.xp || 0) + (currentTask.reward || 100),
      }));
      toggleTaskCompletion(currentTask.id);
      
      // Move to next task or end game
      if (currentTaskIndex < tasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setTimeBudget(240);
      } else {
        setGameOver(true);
      }
    }
  };

  const handleAbortMission = () => {
    if (currentTask) {
      // Reduce health
      setUser((prev) => ({
        ...prev,
        health: Math.max(0, (prev.health || 100) - (currentTask.risk || 5)),
      }));
      
      // Move to next task
      if (currentTaskIndex < tasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setTimeBudget(240);
      } else {
        setGameOver(true);
      }
    }
  };

  const handleBackToMissionControl = () => {
    navigate("/mission-control");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (gameOver || user.health <= 0) {
    return (
      <div className="countdown-page game-over">
        <h1>{user.health <= 0 ? "GAME OVER" : "MISSION COMPLETE"}</h1>
        <div className="final-stats">
          <p>Final XP: {user.xp || 0}</p>
          <p>Health: {user.health || 0}</p>
        </div>
        <div className="game-over-buttons">
          <button className="btn-retry" onClick={handleBackToMissionControl}>
            NEXT MISSION
          </button>
          <button className="btn-home" onClick={handleBackToHome}>
            BACK TO HOME
          </button>
        </div>
      </div>
    );
  }

  if (!currentTask) {
    return (
      <div className="countdown-page no-tasks">
        <h1>No tasks available</h1>
        <button className="btn-home" onClick={handleBackToMissionControl}>
          BACK TO MISSION CONTROL
        </button>
      </div>
    );
  }

  return (
    <div className="countdown-page">
      {/* Back Button */}
      <button className="btn-back" onClick={handleBackToMissionControl}>
        ← BACK
      </button>

      {/* Header with stats */}
      <header className="countdown-header">
        <div className="stat-box">
          <span className="stat-label">❤️ HP</span>
          <span className="stat-value">{user.health}/100</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">XP 💎</span>
          <span className="stat-value">{user.xp || 0}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">LVL</span>
          <span className="stat-value">{Math.floor((user.xp || 0) / 500) + 1}</span>
        </div>
      </header>

      {/* Health Bar */}
      <div className="health-bar-section">
        <HealthBar current={user.health} max={100} />
      </div>

      {/* Main Countdown Section */}
      <div className="countdown-main">
        <BombTimer timeBudget={timeBudget} />
      </div>

      {/* Task Card */}
      <div className="task-section">
        <TaskCard 
          task={currentTask}
          onDefuse={handleDefuseBomb}
          onAbort={handleAbortMission}
        />
      </div>

      {/* Task Progress */}
      <div className="task-progress">
        <span>Task {currentTaskIndex + 1} of {tasks.length}</span>
      </div>
    </div>
  );
}

export default CountdownPage;
