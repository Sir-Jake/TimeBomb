import { useEffect, useState } from "react";

function BombTimer({ timeBudget = 300 }) {
  const [timeLeft, setTimeLeft] = useState(timeBudget);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const progressPercent = (timeLeft / timeBudget) * 100;

  return (
    <div className="bomb-timer-container">
      <div className="timer-circle">
        <div 
          className="timer-progress"
          style={{
            background: `conic-gradient(
              #ff006e 0deg,
              #ff006e ${(360 * progressPercent) / 100}deg,
              rgba(255, 0, 110, 0.2) ${(360 * progressPercent) / 100}deg
            )`
          }}
        ></div>
        <div className="timer-content">
          <div className="timer-display">{formattedTime}</div>
        </div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
}

export default BombTimer;
