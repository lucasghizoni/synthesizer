import React from 'react';

import styles from './App.module.css';
import { Keyboard } from "./features/keyboard/Keyboard";
import { Panel } from "./components/panel/Panel";
import { Envelope } from "./features/envelope/Envelope";
import { LowPassFilter } from "./features/low-pass-filter/LowPassFilter";
import { Master } from "./features/master/Master";
import { Oscillators } from "./features/oscillators/Oscillators";
import { Svg } from "./components/svg/Svg";
import { github } from "./svg/common";

function App() {
  return (
    <section className={styles.main}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={styles.githubIcon}
        href="https://github.com/lucasghizoni/synthesizer"
      >
        <Svg dimension="40" strokeColor="" fill="#753d7d" config={github}/>
      </a>
      <div>
        <h1>{`<ReactSynth>`}</h1>
        <div className={styles.synth}>
          <Panel className={styles.controllersPanel}>
            <Master/>
            <Oscillators/>
            <Envelope/>
            <LowPassFilter/>
          </Panel>
          <Panel>
            <Keyboard/>
          </Panel>
        </div>
        <h1>{`<ReactSynth/>`}</h1>
      </div>
    </section>
  );
}

export default App;
