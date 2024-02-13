import React, { useState, useEffect } from 'react';
import InputElement from './components/InputElement';
import InputNumber from './components/InputNumber';
import InputList from './components/InputList';
import StatPoints from './components/StatPoints'; 
import Roller from './components/Roller'; 
import './App.css';

function App() {

  return (
    <div>
      {/* LINK DO INFORMACJI POMOCNICZYCH*/}
      <img src="image.jpg" alt="Description of the image"></img>
      <br/>
      <br/>
      <InputElement labelFor="name"/>
      <InputElement labelFor="description"/>
      <br/>
      <br/>
      <StatPoints />
      <br/>
      <InputList labelFor="ability" />
      <br/>
      <InputList labelFor="Items" />
      <br/>
      <Roller/>
    </div>
  );
}

export default App;
