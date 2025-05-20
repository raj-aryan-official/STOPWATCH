import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!isRunning && elapsedTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, elapsedTime]);

  const formatTime = (time) => {
    const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };
  const handleLap = () => setLaps([...laps, formatTime(elapsedTime)]);

  return (
    <>
      <div className="stopwatch-container">
        <h1 className="stopwatch-title">Stopwatch</h1>
        <div className="stopwatch-timer">{formatTime(elapsedTime)}</div>
        <div className="stopwatch-buttons">
          <button onClick={handleStart} disabled={isRunning} className="sw-btn start">Start</button>
          <button onClick={handleStop} disabled={!isRunning} className="sw-btn stop">Stop</button>
          <button onClick={handleReset} disabled={isRunning && elapsedTime === 0} className="sw-btn reset">Reset</button>
          <button onClick={handleLap} disabled={!isRunning} className="sw-btn lap">Lap</button>
        </div>
        <div className="stopwatch-laps">
          <h2>Laps</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {laps.length === 0 ? (
              <li className="no-laps">No laps yet</li>
            ) : (
              laps.map((lap, index) => (
                <li key={index} className="lap-item">Lap {index + 1}: {lap}</li>
              ))
            )}
          </ul>
          
        </div>
        <footer className="stopwatch-footer">
        Made with <span className="heart">♥</span> by raj aryan
      </footer>
      </div>
      
    </>
  );
};

export default Stopwatch;
