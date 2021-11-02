import { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const audioRef = useRef(null);
  const timePositionRef = useRef(null);
  const spectrumRef = useRef(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button type="button">Stop</button>
        <input type="range" ref={timePositionRef} />

        <audio src="./audio/audio.m4a" ref={audioRef} />

        <canvas className="spectrums" ref={spectrumRef} />
      </header>
    </div>
  );
}

export default App;
