import React, {createContext, FC, useCallback, useState} from "react";

interface OscillatorState {
  nodes: {
    oscillator?: OscillatorNode;
    gain?: GainNode;
  };
  volume: number;
  waveform: Omit<OscillatorType, 'custom'>;
}

interface OscillatorContextState {
  firstOscillator: OscillatorState;
  secondOscillator: OscillatorState;
  setOscillatorNodes: (first: { oscillator: OscillatorNode, gain: GainNode }, second: { oscillator: OscillatorNode, gain: GainNode }) => void;
  setWaveform: (waveform: Omit<OscillatorType, 'custom'>, oscillator: 'first' | 'second') => void;
  setVolume: (volume: number, oscillator: 'first' | 'second') => void;
}

export const OscillatorsContext  = createContext({} as OscillatorContextState);

const oscillatorInitialState = {
  nodes: {},
  volume: 0.3,
  waveform: 'sine'
}

export const OscillatorsProvider: FC<{ children: JSX.Element }> = ({ children}) => {
  const [firstOscillator, setFirstOscillator] = useState<OscillatorState>(oscillatorInitialState);
  const [secondOscillator, setSecondOscillator] = useState<OscillatorState>(oscillatorInitialState);

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
    setFirstOscillator({
      volume: first.gain.gain.value,
      waveform: first.oscillator.type,
      nodes: first,
    });
    setSecondOscillator({
      volume: second.gain.gain.value,
      waveform: second.oscillator.type,
      nodes: second,
    });
  }, []);

  return <OscillatorsContext.Provider
    value={{
      firstOscillator,
      secondOscillator,
      setWaveform,
      setVolume,
      setOscillatorNodes,
    }}
  >
    {children}
  </OscillatorsContext.Provider>;
}