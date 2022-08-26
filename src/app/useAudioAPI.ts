import { useEffect, useMemo, useRef, useState } from "react";

interface AudioAPI {
  audioCtx: AudioContext,
  filter: BiquadFilterNode;
  oscillatorNode: OscillatorNode;
  gainNode: GainNode;
}

const INITIAL_VOLUME_VALUE = 0.3;
const INITIAL_VALUE = 0.5;

const createGainNode = (audioCtx: AudioContext) => {
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = INITIAL_VOLUME_VALUE;
  return gainNode;
};

const createOscillatorNode = (audioCtx: AudioContext) => {
  const oscillatorNode = audioCtx.createOscillator();
  oscillatorNode.frequency.value = 0;
  oscillatorNode.type = 'sawtooth';
  oscillatorNode.start();
  return oscillatorNode;
}

const createFilterNode = (audioCtx: AudioContext) => {
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  return filter;
}

export const useAudioAPI = () => {
  const isPlaying = useRef(false);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [cutoff, setCutoff] = useState(INITIAL_VALUE);
  const [resonance, setResonance] = useState(INITIAL_VALUE);
  const [volume, setVolume] = useState(0);
  const [attack, setAttack] = useState(INITIAL_VALUE);
  const [sustain, setSustain] = useState(INITIAL_VALUE);
  const [decay, setDecay] = useState(INITIAL_VALUE);
  const [release, setRelease] = useState(INITIAL_VALUE);

  const { audioCtx, gainNode, oscillatorNode, filter } = useMemo((): AudioAPI => {
    const audioCtx = new AudioContext();
    const oscillatorNode = createOscillatorNode(audioCtx);
    const gainNode = createGainNode(audioCtx);
    const filter = createFilterNode(audioCtx);

    oscillatorNode.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(audioCtx.destination);

    setVolume(gainNode.gain.value);

    return {
      audioCtx,
      filter,
      oscillatorNode,
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
      oscillatorNode.frequency.value = frequency;

      gainNode.gain.linearRampToValueAtTime(volume, attackEnd);

      if(!isPlaying) {
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
  }, [audioCtx, frequency, attack, decay, sustain, release, volume, gainNode, oscillatorNode]);

  return {
    setFrequency,
    setCutoff,
    setResonance,
    setVolume,
    cutoff,
    resonance,
    setAttack,
    setSustain,
    setDecay,
    setRelease,
    decay,
    sustain,
    volume,
    attack,
    release,
  }
}