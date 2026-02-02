import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../Context/GameContext";
import "./MissionControl.css";

function MissionControlPage() {
  const { user, tasks, addTask } = useContext(GameContext);
  const navigate = useNavigate();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [duration, setDuration] = useState(45);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      addTask(newTaskName, "medium", duration * 60);
      setNewTaskName("");
    }
  };

  const handleLaunchMission = () => {
    if (selectedTask) {
      navigate("/countdown");
    }
  };

  const handleBackHome = () => {
    navigate("/");
  };

  // Calculate user level based on XP
  const calculateLevel = (xp) => {
    return Math.floor((xp || 0) / 500) + 1;
  };

  const userLevel = calculateLevel(user.xp);
  const xpForNextLevel = (userLevel * 500) - (user.xp || 0);
  const totalXpNeeded = 500;
  const xpProgress = ((totalXpNeeded - xpForNextLevel) / totalXpNeeded) * 100;

  const healthProgress = (user.health / 100) * 100;

  // Mock stats - you can replace with actual data
  const missionStats = {
    streak: 5,
    successRate: 85,
  };

  return (
    <div className="mission-control">
      {/* Back Button */}
      <button className="btn-back" onClick={handleBackHome}>
        ← BACK
      </button>

      {/* Header */}
      <header className="mission-header">
        <div className="header-title">
          <span className="trophy-icon">🏆</span>
          <h1>MISSION CONTROL</h1>
        </div>
      </header>

      {/* Stats Section */}
      <div className="stats-section">
        {/* Level Section */}
        <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">⚡</span>
            <span>Level {userLevel}</span>
          </div>
          <div className="xp-progress">
            <div className="progress-bar-container">
              <div 
                className="progress-fill xp-fill"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
            <span className="progress-text">{user.xp || 0} / {userLevel * 500} XP</span>
          </div>
        </div>

        {/* Health Section */}
        <div className="stat-item">
          <div className="stat-label">
            <span className="stat-icon">❤️</span>
            <span>Health Points</span>
          </div>
          <div className="health-progress">
            <div className="progress-bar-container">
              <div 
                className="progress-fill health-fill"
                style={{ width: `${healthProgress}%` }}
              ></div>
            </div>
            <span className="progress-text">{user.health || 100} / 100 HP</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mission-content">
        {/* Left Side - Task Payload */}
        <div className="task-payload">
          <h2 className="payload-title">TASK PAYLOAD</h2>
          <p className="payload-subtitle">Select Target & Payload</p>

          {/* Task Dropdown */}
          <div className="form-group">
            <select 
              className="task-select"
              value={selectedTaskId || ""}
              onChange={(e) => setSelectedTaskId(Number(e.target.value) || null)}
            >
              <option value="">-- Select a task --</option>
              {tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title} (Lvl {Math.floor(Math.random() * 5)})
                </option>
              ))}
            </select>
          </div>

          {/* New Task Input */}
          <div className="form-group new-task-group">
            <input
              type="text"
              className="task-input"
              placeholder="New Task Name..."
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <button 
              className="btn-add-task"
              onClick={handleAddTask}
              title="Add new task"
            >
              +
            </button>
          </div>

          {/* Duration Slider */}
          <div className="duration-section">
            <label className="duration-label">
              Duration
              <span className="duration-value">{duration} MIN</span>
            </label>
            <input
              type="range"
              className="duration-slider"
              min="2"
              max="120"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
            <div className="duration-labels">
              <span>10m</span>
              <span>120m</span>
            </div>
          </div>
        </div>

        {/* Right Side - Mission Stats */}
        <div className="mission-stats">
          {/* Reward Card */}
          <div className="stat-card reward-card">
            <div className="card-icon">🏆</div>
            <div className="card-label">Reward (XP)</div>
            <div className="card-value">+{selectedTask?.reward || 300}</div>
          </div>

          {/* Risk Card */}
          <div className="stat-card risk-card">
            <div className="card-icon">⚠️</div>
            <div className="card-label">Risk (HP)</div>
            <div className="card-value">-{selectedTask?.risk || 15}</div>
          </div>

          {/* Streak Card */}
          <div className="stat-card streak-card">
            <div className="card-icon">🔥</div>
            <div className="card-label">Streak</div>
            <div className="card-value">{missionStats.streak}</div>
          </div>

          {/* Success Rate Card */}
          <div className="stat-card success-card">
            <div className="card-icon">🥇</div>
            <div className="card-label">Success</div>
            <div className="card-value">{missionStats.successRate}%</div>
          </div>
        </div>
      </div>

      {/* Launch Button */}
      <button 
        className="btn-launch-mission"
        onClick={handleLaunchMission}
        disabled={!selectedTask}
      >
        LAUNCH MISSION
      </button>
    </div>
  );
}

export default MissionControlPage;