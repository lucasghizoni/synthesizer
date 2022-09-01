import React, {useEffect, useMemo, useRef, useState, createContext, FC, ReactNode} from "react";

interface ContextState {
  frequency: number | null;
  setFrequency: (value: number | null) => void;
  master: {
    volume: number;
    setVolume: (value: number) => void;
  };
  envelope: {
    attack: number;
    sustain: number;
    decay: number;
    release: number;
    setAttack: (value: number) => void;
    setSustain: (value: number) => void;
    setDecay: (value: number) => void;
    setRelease: (value: number) => void;
  };
  lowPassFilter: {
    resonance: number;
    cutoff: number;
    setResonance: (value: number) => void;
    setCutoff: (value: number) => void;
  };
}

export const AudioAPIContext = createContext<ContextState>({} as ContextState);

interface AudioAPI {
  audioCtx: AudioContext,
  filter: BiquadFilterNode;
  oscillators: OscillatorNode[];
  gainNode: GainNode;
}

const INITIAL_VOLUME_VALUE = 0.3;
const INITIAL_VALUE = 0.5;

const createGainNode = (audioCtx: AudioContext) => {
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = INITIAL_VOLUME_VALUE;
  return gainNode;
};

const createOscillatorNode = (audioCtx: AudioContext, detune: number) => {
  const oscillator = audioCtx.createOscillator();
  oscillator.frequency.value = 0;
  oscillator.detune.value = detune;
  oscillator.type = 'sawtooth';
  oscillator.start();
  return oscillator;
}

const createFilterNode = (audioCtx: AudioContext) => {
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  return filter;
}

export const AudioApiProvider: FC<{ children: ReactNode }> = ({ children}) => {
  const isPlaying = useRef(false);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [cutoff, setCutoff] = useState(INITIAL_VALUE);
  const [resonance, setResonance] = useState(INITIAL_VALUE);
  const [volume, setVolume] = useState(0);
  const [attack, setAttack] = useState(INITIAL_VALUE);
  const [sustain, setSustain] = useState(INITIAL_VALUE);
  const [decay, setDecay] = useState(INITIAL_VALUE);
  const [release, setRelease] = useState(INITIAL_VALUE);

  const { audioCtx, gainNode, oscillators, filter } = useMemo((): AudioAPI => {
    const audioCtx = new AudioContext();
    const oscillators = [
      createOscillatorNode(audioCtx, -10),
      createOscillatorNode(audioCtx, 10),
    ];
    const gainNode = createGainNode(audioCtx);
    const filter = createFilterNode(audioCtx);

    oscillators.forEach(osc => osc.connect(gainNode));

    gainNode.connect(filter);
    filter.connect(audioCtx.destination);

    setVolume(gainNode.gain.value);

    return {
      audioCtx,
      filter,
      oscillators,
      gainNode,
    }
  }, [setVolume]);

  const maxFrequencyValue = useMemo(() => audioCtx.sampleRate / 2, [audioCtx]);

  useEffect(() => {
    filter.frequency.value = cutoff * maxFrequencyValue;
  }, [cutoff, filter, maxFrequencyValue]);

  useEffect(() => {
    filter.Q.value = resonance * 30;
  }, [resonance, filter]);

  useEffect(() => {
    if(!frequency && !isPlaying.current) return;

    const now = audioCtx.currentTime;

    gainNode.gain.cancelScheduledValues(0);
    if(frequency) {
      const attackDuration = attack * 2;
      const attackEnd = now + attackDuration;
      const decayDuration = decay * 2;

      oscillators.forEach(osc => osc.frequency.value = frequency);

      gainNode.gain.linearRampToValueAtTime(volume, attackEnd);

      if(!isPlaying.current) {
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.setTargetAtTime(sustain, attackEnd, decayDuration);
      }
      isPlaying.current = true;
    } else if(!frequency && isPlaying.current) {
      const releaseDuration = release * 2
      const releaseEnd = now + releaseDuration;
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0, releaseEnd);
      isPlaying.current = false;
    }
  }, [audioCtx, frequency, attack, decay, sustain, release, volume, gainNode, oscillators]);

  return <AudioAPIContext.Provider
    value={{
      frequency,
      setFrequency,
      master: {
        volume,
        setVolume,
      },
      envelope: {
        attack, decay, sustain, release,
        setAttack, setSustain, setDecay, setRelease
      },
      lowPassFilter: {
        cutoff, resonance,
        setCutoff, setResonance
      },
    }}
  >
    {children}
  </AudioAPIContext.Provider>;
}