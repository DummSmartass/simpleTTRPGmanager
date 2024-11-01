import React, { useState, useEffect } from 'react';

function InputElement({ labelFor, hideLabel = false, small = false }) {
  const [value, setValue] = useState(localStorage.getItem(labelFor) || '');

  useEffect(() => {
    localStorage.setItem(labelFor, value);
  }, [labelFor, value]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    // Check if the input value is a number
    if (!isNaN(inputValue)) {
      setValue(inputValue);
    }
  };

  return (
      <div className={`input-element ${small ? 'small' : ''}`}>
        {!hideLabel && <label htmlFor={labelFor}>{labelFor}:</label>}
        <textarea
            id={labelFor}
            name={labelFor}
            value={value}
            onChange={handleChange}
        />
      </div>
  );
}

export default InputElement;
