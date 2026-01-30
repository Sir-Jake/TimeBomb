import { createContext, useState, useEffect } from "react";


const calculateXP = (minutes) => {
  return minutes * 20;
};

const calculateDamage = (minutes) => {
  return minutes * 5;
};

const handleExplosion = (activeTaskId, minutes) => {
  // Reduce health
  setUser((prev) => ({
    ...prev,
    health: Math.max(prev.health - calculateDamage(minutes), 0),
  }));
    // Reduce time budgets of other tasks
  setTasks((prevTasks) =>
    prevTasks.map((task) => {
      if (task.id !== activeTaskId) {
        return {
          ...task,
          timeBudget: Math.max(task.timeBudget * 0.95, 1),
        };
      }
      return task;
    })
  );
};

export const GameContext = createContext();
