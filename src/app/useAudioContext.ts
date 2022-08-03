import {useEffect, useState} from "react";

export const useAudioContext = () => {
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [gain, setGain] = useState(0.8);

  useEffect(() => {
    if(frequency && audioCtx) {
      setOscillator(() => {
        const osc = (audioCtx as AudioContext).createOscillator();
        const gainNode = (audioCtx as AudioContext).createGain();
        osc.frequency.value = frequency;
        osc.type = 'square';
        osc.onended = () => {
          setFrequency(null);
        }

        gainNode.gain.value = gain;

        osc.connect(gainNode);

        gainNode.connect((audioCtx as AudioContext).destination)
        osc.start();
        return osc;
      });
    }
  }, [frequency, audioCtx]);

  return {
    play: (frequency: number) => {
      if(!audioCtx) {
        setAudioCtx(new AudioContext());
      }
      setFrequency(frequency);
    },
    gain: (value: number) => {
      setGain(value);
    },
    stop: () => {
      oscillator?.stop(0.2);
    }
  }
}