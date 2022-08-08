import {useEffect, useState} from "react";

interface AudioAPI {
  audioCtx: AudioContext;
  filter: BiquadFilterNode;
  oscillatorNode: OscillatorNode;
  gainNode: GainNode;
}

export const useAudioContext = () => {
  const [audioAPI, setAudioAPI] = useState<AudioAPI | null>(null);
  const [volume, setVolume] = useState(0.3);
  const [attack, setAttack] = useState(0.5);
  const [cutoff, setCutoff] = useState(0.5);
  const [resonance, setResonance] = useState(0.5);
  const [sustain, setSustain] = useState(0.5);
  const [decay, setDecay] = useState(0.5);
  const [release, setRelease] = useState(0.5);

  useEffect(() => {
    if(audioAPI?.filter && cutoff) {
      audioAPI.filter.frequency.value = cutoff * 24000;
    }
  }, [cutoff, audioAPI]);

  useEffect(() => {
    if(audioAPI?.filter && resonance) {
      audioAPI.filter.Q.value = resonance * 30;
    }
  }, [resonance, audioAPI]);

  const initAudioApi = (): AudioAPI => {
    const audioCtx = new AudioContext();
    const oscillatorNode = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    oscillatorNode.connect(gainNode);

    gainNode.connect(filter);
    filter.connect(audioCtx.destination);

    filter.type = 'lowpass';
    filter.frequency.value = cutoff * (audioCtx.sampleRate / 2);
    filter.Q.value = 1;

    oscillatorNode.start();
    setAudioAPI({
      audioCtx,
      filter,
      oscillatorNode,
      gainNode,
    });
    return {
      audioCtx,
      filter,
      oscillatorNode,
      gainNode,
    }
  }

  const stop = () => {
    if(audioAPI) {
      const { audioCtx, gainNode } = audioAPI;
      const now = audioCtx.currentTime;
      const releaseDuration = release * 2;
      const releaseEnd = now + releaseDuration;

      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0, releaseEnd);
    }
  };

  return {
    play: (freq: number) => {
      const { audioCtx, gainNode, oscillatorNode } = audioAPI || initAudioApi();
      gainNode.gain.cancelScheduledValues(0);

      oscillatorNode.frequency.value = freq;
      oscillatorNode.type = 'sawtooth';

      const now = audioCtx.currentTime;
      const attackDuration = attack * 2;
      const attackEnd = now + attackDuration;
      const decayDuration = decay * 2;

      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, attackEnd);
      gainNode.gain.setTargetAtTime(sustain, attackEnd, decayDuration);
    },
    stop,
    setAttack,
    setCutoff,
    setResonance,
    setVolume,
    setSustain,
    setDecay,
    setRelease,
    cutoff,
    resonance,
    decay,
    sustain,
    volume,
    attack,
    release,
  }
}