import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    health: 100,
    xp: 0,
  });

  const [tasks, setTasks] = useState([]);

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

  //Deleting tasks
  const deleteTask = (taskID) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(updatedTasks);
  };

  //Updating tasks
  const updateTask = (taskID) => {
    const updatedTasks = tasks.map((task) => (task.id === taskID ? updatedTask : task));
    setTasks(updatedTasks);
  };

  //Toggle task completion
  const toggleTaskCompletion = (taskID) => {
    const updatedTasks = tasks.map((task) => (task.id === taskID ? {...task, isCompleted: !task.isCompleted} : task));
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
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  ); 
};
