import React, {createContext, FC, useCallback, useState} from "react";

interface OscillatorState {
  nodes: {
    oscillator?: OscillatorNode;
    gain?: GainNode;
  };
  volume: number;
  detune: number;
  waveform: Omit<OscillatorType, 'custom'>;
}

interface OscillatorContextState {
  firstOscillator: OscillatorState;
  secondOscillator: OscillatorState;
  setOscillatorNodes: (first: { oscillator: OscillatorNode, gain: GainNode }, second: { oscillator: OscillatorNode, gain: GainNode }) => void;
  setWaveform: (waveform: Omit<OscillatorType, 'custom'>, oscillator: 'first' | 'second') => void;
  setDetune: (value: number, oscillator: 'first' | 'second') => void;
  setVolume: (value: number, oscillator: 'first' | 'second') => void;
}

export const OscillatorsContext  = createContext({} as OscillatorContextState);

const firstOscInitialState = {
  nodes: {},
  volume: 0.7,
  detune: 90,
  waveform: 'triangle'
};

const secondOscInitialState = {
  nodes: {},
  volume: 0.5,
  detune: 60,
  waveform: 'sine'
};

const calcDetune = (value: number) => value * 10;

export const OscillatorsProvider: FC<{ children: JSX.Element }> = ({ children}) => {
  const [firstOscillator, setFirstOscillator] = useState<OscillatorState>(firstOscInitialState);
  const [secondOscillator, setSecondOscillator] = useState<OscillatorState>(secondOscInitialState);

  const setWaveform: OscillatorContextState['setWaveform'] = (waveform, oscillator) => {
    const setFunction = oscillator === 'first' ? setFirstOscillator : setSecondOscillator;
    setFunction(state => {
      const oscNode = state.nodes.oscillator;
      if(!oscNode) return state;

      oscNode.type = waveform as OscillatorType;

      return {
        ...state,
        waveform,
      }
    });
  };

  const setDetune: OscillatorContextState['setDetune'] = (value, oscillator) => {
    const setFunction = oscillator === 'first' ? setFirstOscillator : setSecondOscillator;
    setFunction(state => {
      const oscNode = state.nodes.oscillator;
      if(!oscNode) return state;

      oscNode.detune.value = calcDetune(value);

      return {
        ...state,
        detune: value,
      }
    });
  };

  const setVolume: OscillatorContextState['setVolume'] = (volume, oscillator) => {
    const setFunction = oscillator === 'first' ? setFirstOscillator : setSecondOscillator;
    setFunction(state => {
      const gainNode = state.nodes.gain;
      if(!gainNode) return state;

      gainNode.gain.value = volume;

      return {
        ...state,
        volume,
      }
    });
  };

  const setOscillatorNodes: OscillatorContextState['setOscillatorNodes'] = useCallback((first, second) => {
    first.oscillator.type = firstOscillator.waveform as OscillatorType;
    first.oscillator.detune.value = calcDetune(firstOscillator.detune);
    first.gain.gain.value = firstOscillator.volume;

    second.oscillator.type = secondOscillator.waveform as OscillatorType;
    second.oscillator.detune.value = calcDetune(secondOscillator.detune);
    second.gain.gain.value = secondOscillator.volume;

    setFirstOscillator(state => ({
      ...state,
      nodes: first,
    }));
    setSecondOscillator(state => ({
      ...state,
      nodes: second,
    }));
  }, [firstOscillator, secondOscillator]);

  return <OscillatorsContext.Provider
    value={{
      firstOscillator,
      secondOscillator,
      setWaveform,
      setVolume,
      setDetune,
      setOscillatorNodes,
    }}
  >
    {children}
  </OscillatorsContext.Provider>;
}