import React, { useState, useEffect } from 'react';

function InputElement({ labelFor }) {
  const [value, setValue] = useState(localStorage.getItem(labelFor) || '');

  useEffect(() => {
    localStorage.setItem(labelFor, value);
  }, [labelFor, value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor={labelFor}>{labelFor}:</label>
      <textarea
        id={labelFor}
        name={labelFor}
        value={value}
        onChange={handleChange}
        className="input-element"
      />
    </div>
  );
}

export default InputElement;
