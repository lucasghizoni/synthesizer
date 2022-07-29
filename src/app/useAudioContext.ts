import { useState } from "react";

export const useAudioContext = () => {
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  return {
    init: () => {
      setAudioCtx(new AudioContext());
    },
    play: (frequency: number) => {
      setOscillator(() => {
        const osc = (audioCtx as AudioContext).createOscillator();

        osc.type = 'sawtooth';
        osc.frequency.value = frequency;
        osc.connect((audioCtx as AudioContext).destination);
        osc.start();
        return osc;
      });
    },
    stop: () => {
      oscillator?.stop()
    }
  }
}