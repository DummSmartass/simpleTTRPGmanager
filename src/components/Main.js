import React, { useState, useEffect } from 'react';
import InputElement from '../components/InputElement';
import InputNumber from '../components/InputNumber';
import InputList from '../components/InputList';
import StatPoints from '../components/StatPoints'; 
import Roller from '../components/Roller'; 
import '../App.css';

function App() {
  return (
    <div>
      {/* LINK DO INFORMACJI POMOCNICZYCH */}
      <a href="Info">
        <img src="https://ih0.redbubble.net/image.2765244619.7810/raf,360x360,075,t,fafafa:ca443f4786.jpg" style={{ position: 'absolute', top: 30, right: 30, width:"50px" }} alt="Helper Information" />
      </a>
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
