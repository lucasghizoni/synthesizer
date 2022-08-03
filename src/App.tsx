import React from 'react';

import styles from './App.module.css';
import { Keys } from "./features/keys/Keys";
import {useAudioContext} from "./app/useAudioContext";
import { Knob } from "./features/knob/Knob";
import { Panel } from "./components/panel/Panel";
import {Box} from "./components/box/Box";

function App() {
  const { play, stop, gain } = useAudioContext();

  return (
    <section className={styles.main}>
      <div>
        <h1>{`<ReactSynth>`}</h1>
        <div className={styles.synth}>
          <Panel className={styles.controllersPanel}>
            <Box label="Master">
              <Knob initialValue={20} onChange={value => gain(value/100)} label="Vol"/>
            </Box>
            <Box label="ENVELOPE">
              <Knob label="Sus"/>
              <Knob label="Rel"/>
              <Knob label="Dec"/>
              <Knob label="Atk"/>
            </Box>
            <Box label="Filter">
              <Knob label="Sustain"/>
              <Knob label="Release"/>
            </Box>
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
        <h1>{`<ReactSynth/>`}</h1>
      </div>
    </section>
  );
}

export default App;
