import React, { useState, useEffect } from 'react';

function InputNumber({ labelFor, labelText }) {
  const [value, setValue] = useState(parseInt(localStorage.getItem(labelFor)) || '');

  useEffect(() => {
    localStorage.setItem(labelFor, value);
  }, [labelFor, value]);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      setValue(newValue);
    }
  };

  return (
    <div>
      <label htmlFor={labelFor}>{labelText}:</label>
      <input
        type="number"
        id={labelFor}
        name={labelFor}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputNumber;
