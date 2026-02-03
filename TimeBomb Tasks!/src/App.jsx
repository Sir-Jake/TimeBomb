import React, { useState, useEffect, useRef } from 'react';
import './timeBombTasks.css';

function TimeBombTasks() {
  const [task, setTask] = useState('');
  const [isArmed, setIsArmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2 * 60); // 2 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [xp, setXp] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hp, setHp] = useState(100);
  const timerRef = useRef(null);

  // Timer countdown effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      // Bomb explodes if timer hits zero and task not defused
      alert('BOOM! The bomb exploded!');
      setHp(hp - 10);
      setIsRunning(false);
      setIsArmed(false);
      setTimeLeft(2 * 60);  // reset to 2 minutes
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, timeLeft, hp]);

  // Handle task setup
  const handleTaskSetup = (e) => setTask(e.target.value);

  // Start 2-minute session
  const startSession = () => {
    if (!task) {
      alert('Please enter a task.');
      return;
    }
    setIsArmed(true);
    setTimeLeft(2 * 60);  // set to 2 minutes
    setIsRunning(true);
  };

  // Defuse bomb (complete task)
  const defuseBomb = () => {
    setIsRunning(false);
    setIsArmed(false);
    setXp(xp + 10); // example XP gain
    setProgress(progress + 1); // increment progress bar
    setTimeLeft(2 * 60);  // reset to 2 minutes
    alert('Bomb defused! Task progress increased.');
  };

  // Give up
  const giveUp = () => {
    setIsRunning(false);
    setIsArmed(false);
    setHp(hp - 10);
    setTimeLeft(2 * 60);  // reset to 2 minutes
    alert('Bomb exploded because you gave up!');
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h2>TimeBomb Tasks</h2>

      {!isArmed && (
        <div>
          <input
            type="text"
            placeholder="Enter your big task"
            value={task}
            onChange={handleTaskSetup}
          />
          <button onClick={startSession}>Start 2m Session</button>
        </div>
      )}

      {isArmed && (
        <div>
          <h3>Task: {task}</h3>
          <h1>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </h1>
          <button onClick={defuseBomb}>Defuse / Complete</button>
          <button onClick={giveUp}>Give Up</button>
        </div>
      )}

      <div>
        <p>XP: {xp}</p>
        <p>Progress: {progress}</p>
        <p>Health (HP): {hp}</p>
      </div>
    </div>
  );
}

export default TimeBombTasks;
