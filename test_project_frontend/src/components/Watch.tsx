import React, { useState, useEffect } from "react";
import { FaSyncAlt } from "react-icons/fa";

// Helper function to get current time
const getTime = () => {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    ampm: now.getHours() >= 12 ? "PM" : "AM",
  };
};

const Watch = () => {
  const [isAnalog, setIsAnalog] = useState(true);
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Analog Watch Styles
  const analogStyles = {
    transform: `rotate(${(time.hours % 12) * 30 + time.minutes / 2}deg)`, // Hour hand rotation
    transformMinute: `rotate(${time.minutes * 6}deg)`, // Minute hand rotation
    transformSecond: `rotate(${time.seconds * 6}deg)`, // Second hand rotation
  };

  // Digital Watch Display
  const digitalTime = `${time.hours % 12 || 12}:${String(time.minutes).padStart(
    2,
    "0"
  )}:${String(time.seconds).padStart(2, "0")} ${time.ampm}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6">
      {/* Toggle Button */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={() => setIsAnalog(!isAnalog)}
          className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition flex items-center"
        >
          <FaSyncAlt className="mr-2" />
          Toggle Watch
        </button>
      </div>

      {/* Analog or Digital Watch */}
      {isAnalog ? (
        <div className="relative w-72 h-72 rounded-full border-8 border-gray-300 bg-gray-900 shadow-lg">
          {/* Numbers on the Analog Watch */}
          <div className="absolute inset-0 flex justify-center items-center">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i + 1) * 30;
              const x = Math.cos((angle * Math.PI) / 180) * 26;
              const y = Math.sin((angle * Math.PI) / 180) * 26;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  }}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>

          {/* Analog Hands */}
          <div
            className="absolute w-1 bg-red-500 h-24 origin-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ transform: analogStyles.transformSecond }}
          />
          <div
            className="absolute w-2 bg-gray-400 h-24 origin-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ transform: analogStyles.transformMinute }}
          />
          <div
            className="absolute w-3 bg-gray-600 h-20 origin-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ transform: analogStyles.transform }}
          />

          {/* Center of the Analog Watch */}
          <div className="absolute w-4 h-4 bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      ) : (
        <div className="text-white text-4xl font-mono bg-gray-900 p-6 rounded-lg shadow-lg">
          {digitalTime}
        </div>
      )}
    </div>
  );
};

export default Watch;
