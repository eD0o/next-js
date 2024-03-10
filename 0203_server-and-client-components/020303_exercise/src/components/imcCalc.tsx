'use client';

import { useState } from 'react';

export default function ImcCalc() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [imc, setImc] = useState('');

  const handleClick = () => {
    const heightMeter = Number(height) / 100;
    const total = (Number(weight) / (heightMeter * heightMeter)).toFixed(2);
    setImc(total);
  };

  return (
    <>
      <label htmlFor="height">Height (cm):</label>
      <input
        type="text"
        id="height"
        name="height"
        placeholder="ex: 180"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <label htmlFor="weight">Weight (kg):</label>
      <input
        type="text"
        id="weight"
        name="weight"
        placeholder="ex: 70"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <button onClick={handleClick}>Calculate</button>

      {imc ? <p>Your IMC is: {imc}</p> : ''}
    </>
  );
}
