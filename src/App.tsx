import React, {useState} from 'react';
import './App.css';
import { Keys } from "./features/keys/Keys";
import {useAudioContext} from "./app/useAudioContext";

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const { init, play, stop } = useAudioContext();

  return (
    <div className="App">
      <header className="App-header">
        {
          showKeyboard ?
            <Keys
              onMouseLeave={() => {
                stop();
              }}
              onMouseOver={freq => {
                play(freq);
              }}
            /> :
            <button onClick={() => { setShowKeyboard(true); init(); }}>start</button>
        }
      </header>
    </div>
  );
}

export default App;
