import React from 'react';

import styles from './App.module.css';
import { Keyboard } from "./features/keyboard/Keyboard";
import { useAudioAPI } from "./app/useAudioAPI";
import { Knob } from "./features/knob/Knob";
import { Panel } from "./components/panel/Panel";
import { Box } from "./components/box/Box";

function App() {
  const {
    attack,
    release,
    decay,
    sustain,
    volume,
    setAttack,
    setDecay,
    setSustain,
    setVolume,
    setRelease,
    cutoff, setCutoff,
    resonance, setResonance,
    setFrequency,
  } = useAudioAPI();

  return (
    <section className={styles.main}>
      <div>
        <h1>{`<ReactSynth>`}</h1>
        <div className={styles.synth}>
          <Panel className={styles.controllersPanel}>
            <Box label="Master">
              <Knob value={volume} onChange={setVolume} label="Vol"/>
            </Box>
            <Box label="Envelope">
              <Knob value={attack} onChange={setAttack} label="Atk"/>
              <Knob value={decay} onChange={setDecay} label="Dec"/>
              <Knob value={sustain} onChange={setSustain} label="Sus"/>
              <Knob value={release} onChange={setRelease} label="Rel"/>
            </Box>
            <Box label="Lowpass filter">
              <Knob value={cutoff} onChange={setCutoff} label="Cutoff"/>
              <Knob value={resonance} onChange={setResonance} label="Res"/>
            </Box>
          </Panel>
          <Panel>
            <Keyboard onPlay={setFrequency} />
          </Panel>
        </div>
        <h1>{`<ReactSynth/>`}</h1>
      </div>
    </section>
  );
}

export default App;
