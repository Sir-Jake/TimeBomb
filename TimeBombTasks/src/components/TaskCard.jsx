function TaskCard({ task, onDefuse, onAbort }) {
  return (
    <div className="task-card">
      <div className="task-info">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-details">
          <span className="reward">Reward: +{task.reward || 100} XP</span>
          <span className="risk">Risk: -{task.risk || 5} HP</span>
        </p>
      </div>
      <div className="task-actions">
        <button className="btn-defuse" onClick={() => onDefuse(task.id)}>
          💣 DEFUSE BOMB
        </button>
        <button className="btn-abort" onClick={() => onAbort(task.id)}>
          ABORT MISSION
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
