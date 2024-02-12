import React from 'react';
import InputElement from './components/InputElement';
import InputNumber from './components/InputNumber';

function App() {
  return (
    <div>
      <InputElement labelFor="name" labelText="Name" />
      <InputElement labelFor="email" labelText="Email" />
      <InputNumber labelFor="age" labelText="Age" />
      <InputNumber labelFor="quantity" labelText="Quantity" />
    </div>
  );
}

export default App;
