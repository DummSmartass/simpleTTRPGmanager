import React, { useState, useEffect } from 'react';
import InputElement from './InputElement';
import { useLanguage } from './LanguageContext';

const translations = {
  en: {
    addInput: "Add Input",
    delete: "Delete",
    show: "Show",
    hide: "Hide",
  },
  pl: {
    addInput: "Dodaj Wpis",
    delete: "Usuń",
    show: "Pokaż",
    hide: "Ukryj",
  }
};

function InputList({ labelFor }) {
  const [inputs, setInputs] = useState([]);
  const [showInputs, setShowInputs] = useState(() => {
    return localStorage.getItem(`${labelFor}_showInputs`) === "true";
  });
  const { language } = useLanguage();
  const t = translations[language];

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
  }, [labelFor, language]);

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

  const toggleInputs = () => {
    setShowInputs(prevState => {
      const newState = !prevState;
      localStorage.setItem(`${labelFor}_showInputs`, newState);
      return newState;
    });
  };

  return (
      <div className="data-table">
        <label htmlFor={labelFor}>{labelFor}:</label>
        <button onClick={toggleInputs}>{showInputs ? t.hide : t.show}</button>
        {showInputs && (
            <table>
              <tbody>
              {inputs.map((input) => (
                  <tr key={input.name}>
                    <td>
                      <button onClick={() => deleteInput(input.name)}>{t.delete}</button>
                    </td>
                    <td>
                      <InputElement labelFor={input.name} />
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
        <button onClick={addInput}>{t.addInput}</button>
      </div>
  );
}

export default InputList;
