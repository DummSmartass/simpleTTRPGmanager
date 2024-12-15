import React, { useState, useEffect } from 'react';
import InputElement from './InputElement';
import { useLanguage } from './LanguageContext';

const translations = {
  en: {
    addInput: "Add Input",
    delete: "Delete",
    show: "Show",
    hide: "Hide",
    name: "Name:",
    description: "Description:",
  },
  pl: {
    addInput: "Dodaj Wpis",
    delete: "Usuń",
    show: "Pokaż",
    hide: "Ukryj",
    name: "Nazwa:",
    description: "Opis:",
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
    const storedInputs = JSON.parse(localStorage.getItem(`${labelFor}_inputs`)) || [];
    setInputs(storedInputs);
  }, [labelFor]);

  const saveInputsToLocalStorage = (newInputs) => {
    localStorage.setItem(`${labelFor}_inputs`, JSON.stringify(newInputs));
  };

  const addInput = () => {
    const newInput = {
      id: `${labelFor}_${Date.now()}`, // Unique ID
      name: "",
      description: "",
    };
    const updatedInputs = [...inputs, newInput];
    setInputs(updatedInputs);
    saveInputsToLocalStorage(updatedInputs);
  };

  const deleteInput = (id) => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedInputs);
    saveInputsToLocalStorage(updatedInputs);
    localStorage.removeItem(`${id}_name`);
    localStorage.removeItem(`${id}_description`);
  };

  const toggleInputs = () => {
    setShowInputs((prevState) => {
      const newState = !prevState;
      localStorage.setItem(`${labelFor}_showInputs`, newState);
      return newState;
    });
  };

  return (
      <div className="data-table">
        <button onClick={toggleInputs}>{showInputs ? t.hide : t.show}</button>
        {showInputs && (
            <table>
              <tbody>
              {inputs.map((input) => (
                  <tr key={input.id}>
                    <td>
                      <button onClick={() => deleteInput(input.id)}>{t.delete}</button>
                    </td>
                    <td>
                      <div className="input-container">
                        <label className="input-label">{t.name}</label>
                        <InputElement labelFor={`${input.id}_name`} className="name-input" />
                        <label className="input-label">{t.description}</label>
                        <InputElement labelFor={`${input.id}_description`} className="description-input" />
                      </div>
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
