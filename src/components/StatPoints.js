import React, { useState, useEffect } from 'react';
import InputNumber from './InputNumber';

function StatPoints() {
  const [pointsLeft, setPointsLeft] = useState(0); // Initialize pointsLeft state
  const [HP, setHP] = useState(0); // Initialize HP state
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      const updatedPointsLeft = calculatePointsLeft();
      setPointsLeft(updatedPointsLeft);
      const updatedHP = calculateHP(); // Recalculate HP every second
      setHP(updatedHP);
    }, 1000); // Refresh every second

    return () => clearInterval(refreshInterval);
  }, []);

  const calculatePointsSpent = () => {
    return ['strength', 'speed', 'coordination', 'endurance', 'perception', 'will', 'charisma', 'life']
      .reduce((acc, labelFor) => {
        const value = parseInt(localStorage.getItem(labelFor)) || 0;
        return acc + value;
      }, 0);
  };

  const calculatePointsLeft = () => {
    const statPointsAvailable = parseInt(localStorage.getItem("Stat points")) || 0;
    const pointsSpent = calculatePointsSpent();
    return statPointsAvailable - pointsSpent;
  };

  const calculateHP = () => {
    const life = parseInt(localStorage.getItem("life")) || 0; // Fetch "life" from localStorage
    return life * life; // Calculate HP based on life
  };

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  return (
    <div>
      <label htmlFor="Stats">Stats:</label>
      <button onClick={toggleInputs}>{showInputs ? 'Hide' : 'Show'}</button>
      {showInputs && (
        <div>
          <InputNumber labelFor="Stat points"/>
          <label>Points left:</label>
          <label id="pointsLeft">{pointsLeft}:</label>
          <br/>
          <InputNumber labelFor="strength"/>
          <InputNumber labelFor="speed"/>
          <InputNumber labelFor="coordination"/>
          <InputNumber labelFor="endurance"/>
          <InputNumber labelFor="perception"/>
          <InputNumber labelFor="will"/>
          <InputNumber labelFor="charisma"/>
          <InputNumber labelFor="life"/>
          <label>HP: {HP}</label>
        </div>
      )}
    <br/>
    </div>
    
  );
}

export default StatPoints;
