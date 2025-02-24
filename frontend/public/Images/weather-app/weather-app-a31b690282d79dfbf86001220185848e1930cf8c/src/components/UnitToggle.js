import React from 'react';
import '../styles/UnitToggle.css'
const UnitToggle = ({ isCelsius, setUnit }) => {
  return (
    <div className="unit-toggle">
      <button onClick={() => setUnit(true)} disabled={isCelsius}>Celsius</button>
      <button onClick={() => setUnit(false)} disabled={!isCelsius}>Fahrenheit</button>
    </div>
  );
};

export default UnitToggle;
