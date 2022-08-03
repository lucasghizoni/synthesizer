import React from 'react';

import styles from './App.module.css';
import { Keys } from "./features/keys/Keys";
import {useAudioContext} from "./app/useAudioContext";
import { Knob } from "./features/knob/Knob";
import { Panel } from "./components/panel/Panel";

function App() {
  const { play, stop, gain } = useAudioContext();

  return (
    <div className={styles.container}>
      <header>
        <h1>{`<ReactSynth>`}</h1>
      </header>
      <section className={styles.main}>
        <div className={styles.synth}>
          <Panel className={styles.controllersPanel}>
            <Knob initialValue={20} onChange={value => gain(value/100)} label="Volume"/>
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
      </section>
      <footer>
        <h1>{`<ReactSynth/>`}</h1>
      </footer>
    </div>
  );
}

export default App;
