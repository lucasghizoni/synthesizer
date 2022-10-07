import React, {useEffect, useMemo} from 'react';

import styles from './App.module.css';
import { Keyboard } from "./features/keyboard/Keyboard";
import { Panel } from "./components/panel/Panel";
import { Envelope } from "./features/envelope/Envelope";
import { LowPassFilter } from "./features/low-pass-filter/LowPassFilter";
import { Master } from "./features/master/Master";
import { Oscillators } from "./features/oscillators/Oscillators";
import { useOscillators } from "./hooks/useOscillators";
import { useSynthCore } from "./hooks/useSynthCore";
import { useMaster } from "./hooks/useMaster";
import { useLowPassFilter } from "./hooks/useLowPassFilter";
import {calculateCutoff, calculateResonance} from "./context/filter";

const createGainNode = (audioCtx: AudioContext, initialValue: number) => {
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = initialValue;
  return gainNode;
};

const createOscillatorNode = (audioCtx: AudioContext, waveform: Omit<OscillatorType, 'custom'>) => {
  const oscillator = audioCtx.createOscillator();
  oscillator.frequency.value = 0;
  oscillator.type = waveform as OscillatorType;
  oscillator.start();
  return oscillator;
}

const createFilterNode = (audioCtx: AudioContext) => {
  const filter = audioCtx.createBiquadFilter();
  filter.Q.value = calculateResonance(0.5);
  filter.frequency.value = calculateCutoff(0.5, audioCtx.sampleRate)
  filter.type = 'lowpass';
  return filter;
};

function App() {
  const { audioCtx, setAudioCtx, frequency } = useSynthCore();
  const { setOscillatorNodes } = useOscillators();
  const { setMasterNode } = useMaster();
  const { setFilterNode } = useLowPassFilter();

  useEffect(function initSynth() {
    if(!audioCtx && frequency) {
      const newAudioCtx = new AudioContext();

      const masterGainNode = createGainNode(newAudioCtx, 0.5);

      const firstOscNodes = {
        oscillator: createOscillatorNode(newAudioCtx, 'sine'),
        gain: createGainNode(newAudioCtx, 0.5),
      };
      const secondOscNodes = {
        oscillator: createOscillatorNode(newAudioCtx, 'triangle'),
        gain: createGainNode(newAudioCtx, 0.5),
      };

      firstOscNodes.oscillator.connect(firstOscNodes.gain);
      secondOscNodes.oscillator.connect(secondOscNodes.gain);

      firstOscNodes.gain.connect(masterGainNode);
      secondOscNodes.gain.connect(masterGainNode);

      const filterNode = createFilterNode(newAudioCtx);

      masterGainNode.connect(filterNode);
      filterNode.connect(newAudioCtx.destination);

      setMasterNode(masterGainNode);
      setOscillatorNodes(firstOscNodes, secondOscNodes);
      setFilterNode(filterNode);
      setAudioCtx(newAudioCtx);
    }
  }, [audioCtx, setFilterNode, setMasterNode, setOscillatorNodes, frequency, setAudioCtx]);

  return useMemo(() => // avoids unnecessary re renders caused by React.context
    <section className={styles.main}>
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
    , []);
}

export default App;
