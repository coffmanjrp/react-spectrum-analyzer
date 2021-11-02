import { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const audioRef = useRef(null);
  const timePositionRef = useRef(null);
  const spectrumRef = useRef(null);

  const audioCtxRef = useRef(null);
  const [source, setSource] = useState(null);
  const [analyzerNode, setAnalyzerNode] = useState(null);

  const [playState, setPlayState] = useState('stop');
  const [duration, setDuration] = useState(0);
  const [timePosition, setTimePosition] = useState(0);

  useEffect(() => {
    audioCtxRef.current = new AudioContext();
    const elementSource = audioCtxRef.current.createMediaElementSource(
      audioRef.current
    );
    const analyzer = audioCtxRef.current.createAnalyser();

    elementSource.connect(analyzer).connect(audioCtxRef.current.destination);
    setSource(elementSource);
    setAnalyzerNode(analyzer);
  }, []);

  const handleTogglePlay = () => {
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
      setPlayState('play');
    }

    if (playState === 'stop') {
      audioRef.current.play();
      setPlayState('play');
    }

    if (playState === 'play') {
      audioRef.current.pause();
      setPlayState('stop');
    }
  };

  const handleTimeUpdate = () => {
    setTimePosition(audioRef.current.currentTime);
  };

  const handleChangeTimePosition = (e) => {
    const position = parseInt(e.target.value);

    setTimePosition(position);
    audioRef.current.currentTime = position;
  };

  const handleEnded = () => {
    setTimePosition(0);
    setPlayState('stop');
  };

  const handleLoadedMetadata = () => {
    const duration = audioRef.current.duration;

    setDuration(duration);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button type="button" onClick={handleTogglePlay}>
          {playState === 'stop' && 'play'}
          {playState === 'play' && 'stop'}
        </button>

        <input
          type="range"
          ref={timePositionRef}
          min={0}
          max={duration}
          value={timePosition}
          onInput={handleChangeTimePosition}
        />

        <audio
          src="./audio/audio.m4a"
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />

        <canvas className="spectrums" ref={spectrumRef} />
      </header>
    </div>
  );
}

export default App;
