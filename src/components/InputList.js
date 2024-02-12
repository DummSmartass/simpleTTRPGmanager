import React, { useState, useEffect } from 'react';
import InputElement from './InputElement';

function InputList({ labelFor }) {
  const [inputs, setInputs] = useState([]);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    const storedLength = localStorage.getItem('inputListLength');
    if (storedLength) {
      const parsedLength = parseInt(storedLength);
      if (!isNaN(parsedLength)) {
        const initialInputs = [];
        for (let i = 1; i <= parsedLength; i++) {
          initialInputs.push({ id: i });
        }
        setInputs(initialInputs);
      }
    }
  }, []);

  const addInput = () => {
    const newInput = { id: inputs.length + 1 };
    setInputs([...inputs, newInput]);
    localStorage.setItem('inputListLength', inputs.length + 1);
  };

  const deleteInput = (id) => {
    const updatedInputs = inputs.filter(input => input.id !== id);
    setInputs(updatedInputs);
    localStorage.setItem('inputListLength', inputs.length - 1);
  };

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  return (
    <div>
      <button onClick={toggleInputs}>{showInputs ? 'Hide Inputs' : 'Show Inputs'}</button>
      {showInputs && (
        <div>
          {inputs.map(input => (
            <div key={labelFor + input.id} style={{ display: 'flex', alignItems: 'center' }}>
              <InputElement labelFor={labelFor + `${input.id}`} labelText={labelFor + `${input.id}`} />
              <button onClick={() => deleteInput(input.id)}>Delete</button>
            </div>
          ))}
          <button onClick={addInput}>Add Input</button>
        </div>
      )}
    </div>
  );
}

export default InputList;
