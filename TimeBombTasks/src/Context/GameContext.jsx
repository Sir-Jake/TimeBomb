import { createContext, useState, useEffect } from "react";

const calculateXP = (minutes) => {
  return minutes * 20;
};

const calculateDamage = (minutes) => {
  return minutes * 5;
};

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  // Initialize user state from localStorage or default
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { health: 100, xp: 0 };
  });

  // Initialize tasks state from localStorage or empty array
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Save user to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
      }),
    );
  };

  //Adding tasks
  const addTask = (title, priority, timeBudget) => {
    const newTask = {
      id: Date.now(), //uses curent timestamp as ID for tasks
      title,
      priority,
      timeBudget,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  //Deleting the tasks
  const deleteTask = (taskID) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(updatedTasks);
  };

  //Updating tasks
  const updateTask = (taskID, newDetails) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskID ? { ...task, ...newDetails } : task,
    );
    setTasks(updatedTasks);
  };

  //Toggle task completion
  const toggleTaskCompletion = (taskID) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskID ? { ...task, isCompleted: !task.isCompleted } : task,
    );
    setTasks(updatedTasks);
  };

  //const value = {}
  const value = {
    user,
    setUser,
    tasks,
    setTasks,
    addTask,
    deleteTask,
    updateTask,
    toggleTaskCompletion,
    handleExplosion,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
