import React, { useState, useEffect } from 'react';
import InputNumber from './InputNumber';

function Roller() {
  const [value, setValue] = useState(0);

  function myFunction() {
    const max = parseInt(localStorage.getItem("Max")) || 0;
    document.getElementById("result").innerText = Math.floor(Math.random() * max) + 1;
  }

  return (
    <div>
      <InputNumber labelFor="Max"/>
      <button onClick={myFunction}>Roll</button>
      <label id="result">no roll so far</label>
    </div>
  );
}

export default Roller;
