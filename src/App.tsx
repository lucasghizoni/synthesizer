import React, {useState} from 'react';
import './App.css';
import { Keys } from "./features/keys/Keys";
import {useAudioContext} from "./app/useAudioContext";
import { Knob } from "./features/knob/Knob";
import { Panel } from "./components/panel/Panel";

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const { init, play, stop } = useAudioContext();

  return (
    <div className="App">
      <header className="App-header">
        {
          showKeyboard ?
            <div className="App-synth">
              <Panel className="App-knobsPanel">
                <Knob label="Volume"/>
                <Knob label="Filter"/>
              </Panel>
              <Panel>
                <Keys
                  onMouseLeave={() => {
                    stop();
                  }}
                  onMouseOver={freq => {
                    play(freq);
                  }}
                />
              </Panel>
            </div>
             :
            <button onClick={() => { setShowKeyboard(true); init(); }}>start</button>
        }
      </header>
    </div>
  );
}

export default App;
