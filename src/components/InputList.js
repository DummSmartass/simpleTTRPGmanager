import React, { useState, useEffect } from 'react';
import InputElement from './InputElement';

function InputList({ labelFor }) {
  const [inputs, setInputs] = useState([]);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    const storedLength = parseInt(localStorage.getItem(`${labelFor}ListLength`)) || 0;
    const initialInputs = [];
    for (let i = 1; i <= storedLength; i++) {
      const name = `${labelFor}${i}`;
      const storedValue = localStorage.getItem(name);
      if (storedValue !== null) {
        initialInputs.push({ name, editableName: name });
      }
    }
    setInputs(initialInputs);
  }, [labelFor]);

  const findNextAvailableName = () => {
    let index = 1;
    while (inputs.some(input => input.name === `${labelFor}${index}`)) {
      index++;
    }
    return `${labelFor}${index}`;
  };

  const addInput = () => {
    const newName = findNextAvailableName();
    const updatedInputs = [...inputs, { name: newName, editableName: newName }];
    setInputs(updatedInputs);
    localStorage.setItem(newName, '');
    localStorage.setItem(`${labelFor}ListLength`, updatedInputs.length);
  };

  const deleteInput = (name) => {
    const updatedInputs = inputs.filter(input => input.name !== name);
    setInputs(updatedInputs);
    localStorage.removeItem(name);
    localStorage.setItem(`${labelFor}ListLength`, updatedInputs.length);
  };

  const handleNameChange = (index, newName) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].editableName = newName;
    setInputs(updatedInputs);
  };

  const handleNameSave = (index) => {
    const updatedInputs = [...inputs];
    const newName = updatedInputs[index].editableName.trim();

    if (newName && !inputs.some((input, i) => input.name === newName && i !== index) && newName !== "name" && newName !== "description") {
      localStorage.removeItem(updatedInputs[index].name);
      updatedInputs[index].name = newName;
      localStorage.setItem(newName, localStorage.getItem(updatedInputs[index].name) || '');
      setInputs(updatedInputs);
    } else {
      alert("Name must be unique and cannot be 'name' or 'description'");
    }
  };

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  return (
      <div className="data-table">
        <label htmlFor={labelFor}>{labelFor}:</label>
        <button onClick={toggleInputs}>{showInputs ? 'Hide' : 'Show'}</button>
        {showInputs && (
            <table>
              <tbody>
              {inputs.map((input, index) => (
                  <tr key={input.name}>
                    <td>
                      <button onClick={() => deleteInput(input.name)}>Delete</button>
                    </td>
                    <td>
                      <InputElement labelFor={input.name} />
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
        <button onClick={addInput}>Add Input</button>
      </div>
  );
}

export default InputList;
