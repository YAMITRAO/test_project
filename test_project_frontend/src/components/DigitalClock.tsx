import React, { useState, useEffect } from "react";

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="text-center p-5 border-4 border-green-500 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-110">
        <h1 className="text-white text-5xl font-bold">
          {time.toLocaleTimeString()}
        </h1>
        <p className="text-green-400 text-xl mt-2">Digital Clock</p>
      </div>
    </div>
  );
};

export default Clock;
