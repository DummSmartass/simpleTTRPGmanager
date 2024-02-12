import React, { useState, useEffect } from 'react';
import InputElement from './components/InputElement';
import InputNumber from './components/InputNumber';
import InputList from './components/InputList';

function calculateHP(attributes) {
  const hp = Math.pow(attributes.life, 2);
  return hp;
}

function App() {
  const [hp, setHP] = useState(0);
  const [attributes, setAttributes] = useState({
    strength: 0,
    speed: 0,
    coordination: 0,
    endurance: 0,
    perception: 0,
    will: 0,
    charisma: 0,
    life: 0
  });

  useEffect(() => {
    const calculatedHP = calculateHP(attributes);
    setHP(calculatedHP);
  }, [attributes]);

  const handleAttributeChange = (name, value) => {
    setAttributes(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <InputElement labelFor="name"/>
      <InputElement labelFor="description"/>

      <InputNumber labelFor="strength" onChange={value => handleAttributeChange('strength', value)} />
      <InputNumber labelFor="speed" onChange={value => handleAttributeChange('speed', value)} />
      <InputNumber labelFor="coordination" onChange={value => handleAttributeChange('coordination', value)} />
      <InputNumber labelFor="endurance" onChange={value => handleAttributeChange('endurance', value)} />
      <InputNumber labelFor="perception" onChange={value => handleAttributeChange('perception', value)} />
      <InputNumber labelFor="will" onChange={value => handleAttributeChange('will', value)} />
      <InputNumber labelFor="charisma" onChange={value => handleAttributeChange('charisma', value)} />
      <InputNumber labelFor="life" onChange={value => handleAttributeChange('life', value)} />
      <p>HP: {hp}</p>
      
      <InputList labelFor="ability" />
    </div>
  );
}

export default App;
