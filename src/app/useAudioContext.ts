import {useEffect, useState} from "react";

export const useAudioContext = () => {
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [volume, setVolume] = useState(0.3);
  const [attack, setAttack] = useState(0.5);
  const [sustain, setSustain] = useState(0.5);
  const [decay, setDecay] = useState(0.5);
  const [release, setRelease] = useState(0.5);

  useEffect(() => {
    if(frequency && audioCtx && gainNode) {
        const now = audioCtx.currentTime;
        oscillator?.stop();
        gainNode.gain.cancelScheduledValues(now);

        const oscillatorNode = audioCtx.createOscillator();
        oscillatorNode.frequency.value = frequency;
        oscillatorNode.type = 'sawtooth';
        oscillatorNode.onended = () => {
          setFrequency(null);
        }

        const attackDuration = attack * 2;
        const attackEnd = (now + attackDuration);
        const decayDuration = decay * 2;

        oscillatorNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, attackEnd);
        gainNode.gain.setTargetAtTime(sustain, attackEnd, decayDuration);

        oscillatorNode.start();
        setOscillator(oscillatorNode);
    }
  }, [frequency, audioCtx, gainNode, volume]);

  return {
    play: (freq: number) => {
      if(!audioCtx) {
        const newAudioCtx = new AudioContext();
        setAudioCtx(newAudioCtx);
        setGainNode(newAudioCtx.createGain());
      }
      setFrequency(freq);
    },
    stop: () => {
      if(audioCtx && gainNode) {
        const now = audioCtx.currentTime;
        oscillator?.stop();
        gainNode.gain.cancelScheduledValues(0);
        const releaseDuration = release * 2;
        const releaseEnd = now + releaseDuration;

        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, releaseEnd);
        oscillator?.stop(releaseEnd);
      }
    },
    setAttack,
    setVolume,
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