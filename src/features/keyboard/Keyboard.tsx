import React, {FC, useEffect, useRef} from 'react';

import { KeyboardSlice } from "./keyboard-slice/KeyboardSlice";
import styles from './Keyboard.module.css';
import { firstOctave, fourthOctave, secondOctave, thirdOctave } from "./octaves";
import { useInteractedNote } from "./useInteractedNote";
import { useSynthCore } from "../../hooks/useSynthCore";
import { useOscillators } from "../../hooks/useOscillators";
import {useEnvelope} from "../../hooks/useEnvelope";
import {useMaster} from "../../hooks/useMaster";

export const Keyboard: FC = () => {
  const isPlaying = useRef(false);

  const { audioCtx, frequency, setFrequency } = useSynthCore();
  const { firstOscillator, secondOscillator } = useOscillators();
  const {attack, release, decay, sustain} = useEnvelope();
  const { volume, masterGainNode } = useMaster();

  const { onMouseOverNote, ...rest } = useInteractedNote(setFrequency);

  useEffect(() => {
    if((!frequency && !isPlaying.current) || !masterGainNode || !firstOscillator.nodes.oscillator || !secondOscillator.nodes.oscillator) return;

    const now = audioCtx!.currentTime;

    masterGainNode.gain.cancelScheduledValues(0);
    if(frequency) {
      const attackDuration = attack * 2;
      const attackEnd = now + attackDuration;
      const decayDuration = decay * 2;

      firstOscillator.nodes.oscillator.frequency.value = frequency;
      secondOscillator.nodes.oscillator.frequency.value = frequency;

      masterGainNode.gain.linearRampToValueAtTime(volume, attackEnd);

      if(!isPlaying.current) {
        masterGainNode.gain.setValueAtTime(0, now);
        masterGainNode.gain.setTargetAtTime(sustain, attackEnd, decayDuration);
      }
      isPlaying.current = true;
    } else if(!frequency && isPlaying.current) {
      const releaseDuration = release * 2
      const releaseEnd = now + releaseDuration;
      masterGainNode.gain.setValueAtTime(masterGainNode.gain.value, now);
      masterGainNode.gain.linearRampToValueAtTime(0, releaseEnd);
      isPlaying.current = false;
    }
  }, [audioCtx, frequency, attack, decay, sustain, release, masterGainNode, firstOscillator, secondOscillator, volume]);

  return (
    <div
      className={styles.container}
      {...rest}
    >
      <KeyboardSlice
        onMouseOverNote={onMouseOverNote}
        keyNotes={firstOctave}
        playingFreq={frequency}
      />
      <KeyboardSlice
        onMouseOverNote={onMouseOverNote}
        keyNotes={secondOctave}
        playingFreq={frequency}
      />
      <KeyboardSlice
        onMouseOverNote={onMouseOverNote}
        keyNotes={thirdOctave}
        playingFreq={frequency}
      />
      <KeyboardSlice
        onMouseOverNote={onMouseOverNote}
        keyNotes={fourthOctave}
        playingFreq={frequency}
      />
    </div>
  )
}