import React from 'react';

import styles from './App.module.css';
import { Keys } from "./features/keys/Keys";
import {useAudioContext} from "./app/useAudioContext";
import { Knob } from "./features/knob/Knob";
import { Panel } from "./components/panel/Panel";
import {Box} from "./components/box/Box";

function App() {
  const {
    attack, setAttack,
    decay, setDecay,
    sustain, setSustain,
    volume, setVolume,
    release, setRelease,
    play, stop,
  } = useAudioContext();

  return (
    <section className={styles.main}>
      <div>
        <h1>{`<ReactSynth>`}</h1>
        <div className={styles.synth}>
          <Panel className={styles.controllersPanel}>
            <Box label="Master">
              <Knob initialValue={volume} onChange={setVolume} label="Vol"/>
            </Box>
            <Box label="ENVELOPE">
              <Knob initialValue={attack} onChange={setAttack} label="Atk"/>
              <Knob initialValue={decay} onChange={setDecay} label="Dec"/>
              <Knob initialValue={sustain} onChange={setSustain} label="Sus"/>
              <Knob initialValue={release} onChange={setRelease} label="Rel"/>
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
