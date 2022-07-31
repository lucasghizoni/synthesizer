import React, {useState} from 'react';

import styles from './App.module.css';
import { Keys } from "./features/keys/Keys";
import {useAudioContext} from "./app/useAudioContext";
import { Knob } from "./features/knob/Knob";
import { Panel } from "./components/panel/Panel";

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const { init, play, stop } = useAudioContext();

  return (
    <section className={styles.main}>
      {
        showKeyboard ?
          <div className={styles.synth}>
            <Panel className={styles.controllersPanel}>
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
    </section>
  );
}

export default App;
