import React from 'react';


const HealthBar = ({ currentHealth }) => {
  let color = "bg-green-500";
  if (currentHealth <= 60) color = "bg-yellow-400";
  if (currentHealth <= 30) color = "bg-red-600";

  return (
    <div className="w-full bg-gray-700 h-4 rounded-full">
        <div    
            className={`${color} h-4 rounded-full transition-all`}
            style={{ width: `${currentHealth}%` }}
        ></div>
    </div>
  );
}


export default HealthBar;