function HealthBar({ current = 100, max = 100 }) {
  const healthPercent = (current / max) * 100;

  const getHealthColor = () => {
    if (healthPercent > 50) return "#00ff00";
    if (healthPercent > 20) return "#ffaa00";
    return "#ff0000";
  };

  return (
    <div className="health-bar-container">
      <div className="health-label">
        <span className="health-icon">❤️ HP</span>
        <span className="health-value">{current}/{max}</span>
      </div>
      <div className="health-bar">
        <div 
          className="health-fill"
          style={{ 
            width: `${healthPercent}%`,
            backgroundColor: getHealthColor()
          }}
        ></div>
      </div>
    </div>
  );
}

export default HealthBar;
